package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

type User struct {
	Pseudoname  string `json:"pseudoname"`
	DiscordTag  string `json:"discordtag"`
	Email       string `json:"email"`
	ProjectName string `json:"projectname"`
	ProjectLink string `json:"projectlink"`
}

var Users []User = []User{
	User{Pseudoname: "Test1", DiscordTag: "Test1", Email: "Test1", ProjectName: "Test1", ProjectLink: "Test1"},
	User{Pseudoname: "Test2", DiscordTag: "Test2", Email: "Test2", ProjectName: "Test2", ProjectLink: "Test2"},
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Homepage Endpoint Hit")
}

func handleUser(w http.ResponseWriter, r *http.Request) {
	// if r.URL.Path != "/" {
	// 	http.Error(w, "404 not found.", http.StatusNotFound)
	// 	return
	// }
	setupResponse(&w, r)

	switch r.Method {
	case "GET":
		getUser(w, r)
	case "POST":
		createUser(w, r)
	case "OPTIONS":
		return
	default:
		fmt.Fprintf(w, "Sorry, only GET and POST methods are supported.")
	}
}

func getUser(w http.ResponseWriter, r *http.Request) {
	user := User{Pseudoname: "Test", DiscordTag: "Test", Email: "Test", ProjectName: "Test", ProjectLink: "Test"}
	fmt.Println("Endpoint Hit: One User Endpoint")
	json.NewEncoder(w).Encode(user)
}

func createUser(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
	fmt.Fprintf(w, "%+v", string(reqBody))

	var user User
	json.Unmarshal(reqBody, &user)

	Users = append(Users, user)
	json.NewEncoder(w).Encode(user)
	fmt.Println(Users)
}

func handleRequest() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/user", handleUser)
	log.Fatal(http.ListenAndServe(":8081", nil))
	// THis is where it is started
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func main() {
	fmt.Println(Users)
	handleRequest()
	fmt.Print("Server running on 8081")
}
