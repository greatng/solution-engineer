package main

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"testing"
)

type TestJson struct {
	Message string `json:"message"`
}

func TestWebChecker(t *testing.T) {
	var resJson TestJson
	
	t.Run("test GET method", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/webcheck", nil)
		w := httptest.NewRecorder()
		webChecker(w, req)
		res := w.Result()
		defer res.Body.Close()
		if res.StatusCode != 200 {
			t.Error("Test 1 : FAILED")
		} else {
			t.Log("Test 1 : PASS")
		}

		data, _ := io.ReadAll(res.Body)
		json.Unmarshal(data, &resJson)
		if resJson.Message != "get successfully" {
			t.Error("Test 2 : Failed")
		} else {
			t.Log("Test 2 : PASS")
		}
	})

	t.Run("test POST method", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodPost, "/webcheck", nil)
		w := httptest.NewRecorder()
		webChecker(w, req)
		res := w.Result()
		defer res.Body.Close()
		if res.StatusCode != 200 {
			t.Error("Test 3 : FAILED")
		} else {
			t.Log("Test 3 : PASS")
		}

		data, _ := io.ReadAll(res.Body)
		json.Unmarshal(data, &resJson)
		if resJson.Message != "post successfully" {
			t.Error("Test 4 : Failed")
		} else {
			t.Log("Test 4 : PASS")
		}
	})
}
