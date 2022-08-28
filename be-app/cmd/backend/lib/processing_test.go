package processing

import (
	"fmt"
	"testing"
)

func TestProcessing(t *testing.T) {
	testUrl := []string{
		"http://localhost:3101",
		"http://fakehost",
		"https://www.google.com",
		"www.google.com",
	}
	expected := []string{"2", "2"}

	s1, s2 := Processing(testUrl)
	fmt.Println(expected[0], expected[1], s1, s2)
	if expected[0] != s1 || expected[0] != s2 {
		t.Error("result ", s1, s2, "should equal expected value",
			expected[0], expected[1])
	}
	t.Log("test completed")
}
