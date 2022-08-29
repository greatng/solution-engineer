package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"be-app/internal/processing"
)

type Resp struct {
	Message string `json:"message"`
	Total   int   `json:"totalwebsite"`
	Up      int   `json:"up"`
	Down    int   `json:"down"`
	Elapsed int64 `json:"timeelapsed"`
}

func webChecker(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "GET" {
		jsonResp, err := json.Marshal(Resp{Message: "get successfully"})
		if err != nil {
			log.Fatalf("Error happened in JSON marshal. Err: %s", err)
			w.WriteHeader(500)
		}
		w.Write(jsonResp)
	}
	if r.Method == "POST" {
		start := time.Now()
		results := processing.ReadCSVFromHttpReq(r.Body)
		var resp Resp
		up, down := processing.Processor(results)
		resp = Resp{
			Message: "post successfully",
			Total:   len(results),
			Up:      up,
			Down:    down,
			Elapsed: int64(time.Since(start).Milliseconds()),
		}
		jsonResp, err := json.Marshal(resp)
		if err != nil {
			log.Fatalf("Error happened in JSON marshal. Err: %s", err)
			w.WriteHeader(http.StatusInternalServerError)
		}
		w.Write(jsonResp)
	}
	return
}

func main() {
	m := http.NewServeMux()
	s := http.Server{Addr: ":3100", Handler: m}
	m.HandleFunc("/webcheck", webChecker)

	done := make(chan os.Signal, 1)
	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		if err := s.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("listen: %s\n", err)
		}
	}()
	log.Println("Server Started")
	<-done
	log.Println("Server Stopped")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)

	defer cancel()

	if err := s.Shutdown(ctx); err != nil {
		log.Fatalf("Server Shutdown Failed:%+v", err)
	}
	log.Println("Server Exited Properly")
}
