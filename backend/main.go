package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// "go.mongodb.org/mongo-driver/bson"
// "go.mongodb.org/mongo-driver/mongo"
// "go.mongodb.org/mongo-driver/mongo/options"
// "go.mongodb.org/mongo-driver/mongo/readpref"

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

	value := os.Getenv("ATLAS_URI")
	clientOptions := options.Client().ApplyURI(value)
	client, err := mongo.Connect(context.TODO(), clientOptions)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("CONNECTION INITIALIZED")

	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal("error ", err)
	}

	collection := client.Database("Panathon").Collection("Users")

	fmt.Println("Collection Found")

	ctx, _ := context.WithTimeout(context.Background(), 100*time.Second)
	insertResult, err := collection.InsertOne(ctx, user)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Inserted a single document: ", insertResult.InsertedID)

	err = client.Disconnect(context.TODO())

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Connection to MongoDB closed.")

	json.NewEncoder(w).Encode(user)
}

func handleRequest() {
	http.HandleFunc("/", homePage)
	http.HandleFunc("/user", handleUser)
	http.HandleFunc("/authenticate", authenticate())
	log.Fatal(http.ListenAndServe(":8081", nil))
	// THis is where it is started
}

func setupResponse(w *http.ResponseWriter, req *http.Request) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
	(*w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(*w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

func authenticate() {
	applicationID := os.Getenv("APPLICATION_ID")
	CLIENT_ID := os.Getenv("CLIENT_ID")
	publicKey := os.Getenv("PUBLIC_KEY")
	clientSecret := os.Getenv("CLIENT_SECRET")
	ENDPOINT := "https://discord.com/api/oauth2/authorize"
	SCOPE := "email"

	api := ENDPOINT + "?" + "response_type=code" + "&client_id=" + CLIENT_ID + "&scope=" + SCOPE + "+"
	test := "https://discord.com/api/oauth2/authorize?response_type=code&client_id=" + CLIENT_ID + "&scope=" + SCOPE + "&redirect_uri=http://localhost:3000/&prompt=none"
	// data := {
	// 	"clientId": clientID,
	// 	"clientSecret": clientSecret,
	// 	"grantType": "authorization_code",
	// 	"redirect_uri": "localhost:3000"
	// }
}

func main() {
	// fmt.Println(Users)
	// value := os.Getenv("ATLAS_URI")

	// client, err := mongo.NewClient(options.Client().ApplyURI(value))
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	// err = client.Connect(ctx)
	// if err != nil {
	// 	log.Fatal(err)
	// }

	fmt.Print("DB connection setup to Atlas")
	handleRequest()
	fmt.Print("Server running on 8081")

	// defer client.Disconnect(ctx)
	// mt.Print("Disconnected Database.")
}
