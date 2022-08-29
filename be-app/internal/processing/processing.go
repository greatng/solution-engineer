package processing

import (
	"encoding/csv"
	"io"
	"log"
	"net/http"
	"net/url"
	"sync"
	"time"
)

var ( wg sync.WaitGroup )

func subProcessor(url string, checked map[string](chan int)) {
	defer wg.Done()

	client := http.Client{
		Timeout: 30 * time.Second,
	}
	res, err := client.Get(url)
	if err != nil {
		log.Println("err: ", err)
		checked["down"] <- 1
		checked["up"] <- 0
	} else {
		log.Println(url, res.StatusCode)
		checked["up"] <- 1
		checked["down"] <- 0
	}
}

func Processor(result []string) (int, int) {
	checked := make(map[string](chan int))
	checked["up"] = make(chan int, 2)
	checked["down"] = make(chan int, 2)

	numberDown, numberUp := 0, 0

	for i := 0; i < len(result); i++ {
		wg.Add(1)
		go subProcessor(result[i], checked)
	}

	for i := 0; i < len(result); i++ {
		numberUp += <-checked["up"]
		numberDown += <-checked["down"]
	}

	close(checked["up"])
	close(checked["down"])
	return numberUp, numberDown
}

func IsUrl(str string) bool {
	u, err := url.Parse(str)
	return err == nil && u.Host != ""
}

func ReadCSVFromHttpReq(body io.ReadCloser) []string {
	reader := csv.NewReader(body)
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
			if IsUrl(buff[i]) {
				results = append(results, buff[i])
			}
		}
	}
	return results
}
