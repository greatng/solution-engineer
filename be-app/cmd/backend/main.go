package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"net/url"
	"runtime"
	"time"

	DataProcess "cmd/backend/lib"
)

func timeElapsed(start time.Time) string {
	var elapsed string
	second := time.Since(start).Truncate(time.Second).Seconds()
	if int(second) > 60 {
		elapsed = fmt.Sprintf("%d minute %d second",
			int(second)/60, int(second)%60)
	} else {
		elapsed = fmt.Sprintf("%d second", int(second))
	}
	return elapsed
}

func isUrl(str string) bool {
	u, err := url.Parse(str)
	return err == nil && u.Host != ""
}

func ReadCSVFromHttpReq(r *http.Request) []string {
	reader := csv.NewReader(r.Body)
	reader.FieldsPerRecord = -1
	var results []string
	for {
		buff, err := reader.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Println("Error :", err)
			continue
		}
		for i := 0; i < len(buff); i++ {
			if isUrl(buff[i]) {
				results = append(results, buff[i])
			}
		}
	}
	return results
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func webChecker(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	if r.Method == "GET" {
		fmt.Fprint(w, "WebChecker Test")
		return
	}
	if r.Method == "POST" {
		start := time.Now()
		results := ReadCSVFromHttpReq(r)
		w.WriteHeader(http.StatusCreated)
		w.Header().Set("Content-Type", "application/json")
		resp := make(map[string]string)
		resp["totalwebsite"] = fmt.Sprint((len(results)))
		resp["up"], resp["down"] = DataProcess.Processing(results)
		resp["timeelapsed"] = timeElapsed(start)
		jsonResp, err := json.Marshal(resp)
		if err != nil {
			log.Fatalf("Error happened in JSON marshal. Err: %s", err)
		}
		w.Write(jsonResp)
		log.Println("sent response")
		return
	}
}

func handleRequests() {
	http.HandleFunc("/webcheck", webChecker)
	log.Println("http server started on [::]:3100")
	log.Fatal(http.ListenAndServe(":3100", nil))
}

func initialize() {
	numcpu := runtime.NumCPU()
	runtime.GOMAXPROCS(numcpu)
}

func main() {
	initialize()
	handleRequests()
}
