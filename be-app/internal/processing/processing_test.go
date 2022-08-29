package processing

import (
	"bytes"
	"io"
	"testing"
)
var (
	testUrl = []string{
		"http://mockingurl",
		"http://fakehost",
		"https://www.google.com",
		"www.google.com",
	}
)

func TestProcessor(t *testing.T) {
	up, down := Processor(testUrl)

	if up == 1 && down == 3 {
		t.Log("Test 1 : PASS")
	} else {
		t.Log("Test 1 : FAILED")
	}

	emptyURL := []string{}
	up, down = Processor(emptyURL)

	if up == 0 && down == 0 {
		t.Log("Test 2 : PASS")
	} else {
		t.Log("Test 2 : FAILED")
	}
}

func TestReadCSVFromHttpReq (t *testing.T) {
	resBody := `"lorem","ipsum","dolor","sit","amet"`
	r := io.NopCloser(bytes.NewReader([]byte(resBody)))

	results := ReadCSVFromHttpReq(r)
	if len(results) == 0 {
		t.Log("Test 1 : PASS")
	} else {
		t.Error("test 1 : FAILED")
	}

	resBody = "http://localhost:3101,http://fakehost" + "\n" + "http://localhost:3101,http://fakehost"
	r = io.NopCloser(bytes.NewReader([]byte(resBody)))

	results = ReadCSVFromHttpReq(r)
	if len(results) == 4 {
		t.Log("Test 2 : PASS")
	} else {
		t.Error("test 2 : FAILED")
	}
}

func TestIsUrl(t* testing.T) {
	url:= "http://mockingurl"
	result := IsUrl(url)
	if result == true {
		t.Log("Test 1 : PASS")
	} else {
		t.Error("Test 1 : FAILED")
	}

	url= "https://mockingurl"
	result = IsUrl(url)
	if result == true {
		t.Log("Test 2 : PASS")
	} else {
		t.Error("Test 2 : FAILED")
	}

	url= "mockingurl"
	result = IsUrl(url)
	if result == false {
		t.Log("Test 3 : PASS")
	} else {
		t.Error("Test 3 : FAILED")
	}
}
