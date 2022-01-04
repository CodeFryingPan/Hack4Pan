import axios from "axios";

export async function  addUserToServer(access_token, serverID, userID, roleID = null) {
        if (serverID && userID) {
            if (access_token) {
                const body = {
                    "access_token": access_token,
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
            console.log();
            const data = response.data.user;

            return data;
        } catch(e) {
            console.log("DISCORD ERROR: " + e);
            return null;
        }
}
