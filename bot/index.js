
// 378225757200
require('dotenv').config()
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Guild } = require('discord.js');
const bodyParser = require('body-parser'); 

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_BOT_TOKEN);

const { Client, Intents } = require('discord.js');
const allIntents = new Intents(32767);
const client = new Client({ intents: [ allIntents ]});

var express = require('express')
var app = express()

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json()); 

app.get('/', function (req, res) {
    console.log("===================================");
    res.status(200).send("helloworld");
})


app.post('/adduser', async function  (req, res) {
    // 0 - Get the access_token, uid from the body
    // 1- Find Guild from Client
    // MAKE SURE USER IS MEMBER OF GUILD -> Add them to Server
    // 2- FIND THE MEMBER => through the UID
    // 3- Guild Add Role to Member
    // 4- Done
    // console.log(client)
    const userID = req.body.userID;
    const serverID = '858440479469469716';
    const hack4pan2022Role = '926967736209379328';    

    // Accesstoken from the request & UID

    const user = new Discord.User(client, data);

    const guild = await client.guilds.cache.get(serverID);
    let role = await guild.roles.cache.find(r => r.id === hack4pan2022Role);

    const options = {
        accessToken: "",
        roles = [role]
    }

    await guild.addMember(user);
    
    

    let member = await guild.members.cache.get(userID);

    member.roles.add(role);
    
    return res.status(201).send({data: "Role added"});
})

client.login(process.env.DISCORD_BOT_TOKEN);
app.listen(8081)

console.log("RUNNING ON 8081")