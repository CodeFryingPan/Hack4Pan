import axios from "axios";

export async function  addUserToServer(access_token, serverID, userID, roleID, defaultRole) {
        if (serverID && userID) {
            if (access_token) {
                const body = {
                    "access_token": access_token,
                    "roles": [roleID, defaultRole]
                }

                const config = {
                    headers: {
                    "Authorization" :'Bot ' + process.env.DISCORD_BOT_TOKEN,
                    "Content-Type" : "application/json"
                    }
                }

                const uri = `https://discord.com/api/v9/guilds/${serverID}/members/${userID}`;
                axios.put(uri, body, config)
                    .then((r) => {
                        console.log(r.status);
                        if (roleID == null) {
                            return;
                        } 
                        const role_uri = `https://discord.com/api/v9/guilds/${serverID}/members/${userID}/roles/${roleID}`;
                        axios.put(role_uri, body, config)
                            .then((r) => {
                                console.log(r.status);
                            })
                            .catch((err) => {
                                console.log(err.response);
                            })        
                    })
                    .catch((err) => {
                        console.log(err.response);
                    })
            } else {
                console.log("FAILED TO GET ACCESS_TOKEN");
            }
        } else {
            console.log("FAILED TO GET SERVERID OR USERID");
        }
    }

export async function giveRoleToUser(serverID, userID, roleID) {
    if (serverID && userID && roleID) {
            const config = {
                headers: {
                "Authorization" :'Bot ' + process.env.DISCORD_BOT_TOKEN,
                "Content-Type" : "application/json"
                }
            }
        
            const role_uri = `https://discord.com/api/v9/guilds/${serverID}/members/${userID}/roles/${roleID}`;
            axios.put(role_uri, {},  config)
                .then((r) => {
                    console.log(r.status);
                })
                .catch((err) => {
                    console.log(err.response);
            })      
    } else {
        console.log("FAILED TO GET SERVERID OR USERID");
    }
}

export async function  getDiscordUser(userID, serverID) {
        const config = {
            headers: {
            "Authorization" :'Bot ' + process.env.DISCORD_BOT_TOKEN,
            "Content-Type" : "application/json"
            }
        }

        const uri = `https://discord.com/api/v9/guilds/${serverID}/members/${userID}`;
        try {
            const response = await axios.get(uri, config)

            console.log(`DISCORD DATA ${JSON.stringify(response.data)}`);
            
            const data = response.data.user;

            data.roles = response.data.roles

            return data;
        } catch(e) {
            console.log("DISCORD ERROR: " + e);
            return null;
        }
}
