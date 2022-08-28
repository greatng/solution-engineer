package processing

import (
	"fmt"
	"log"
	"net/http"
	"sync"
	"time"
)

func subProcessing(url string, checked chan<- [2]int, status [2]int, onExit func()) {
	defer onExit()

	client := http.Client{
		Timeout: 30 * time.Second,
	}
	res, err := client.Get(url)
	if err != nil {
		log.Println("err: ", err)
		status[1]++
	} else {
		log.Println(url, res.StatusCode)
		status[0]++
	}
	checked <- status
}

func Processing(result []string) (string, string) {
	const max = 3
	var wg sync.WaitGroup

	checked := make(chan [2]int, max)
	var status [2]int
	var returnResult [2]int

	status[0], status[1] = 0, 0

	for i := 0; i < len(result); i++ {
		wg.Add(1)
		go subProcessing(result[i], checked, status, func() { wg.Done() })
	}

	for i := 0; i < len(result); i++ {
		returnResult = <-checked
		status[0] += returnResult[0]
		status[1] += returnResult[1]
	}

	return fmt.Sprint(status[0]), fmt.Sprint(status[1])
}
