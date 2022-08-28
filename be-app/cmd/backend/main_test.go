package main

import (
	"net/http"
	"testing"
)

func TestWebChecker(t *testing.T) {
	res, err := http.Get("http://localhost:3100/webchecker")
	if err != nil {
		t.Error(err)
	}
	t.Log(res)
	t.Log("main test completed")
}
