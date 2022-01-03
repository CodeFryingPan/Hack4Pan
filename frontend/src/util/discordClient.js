import axios from "axios";
import { logger } from "./logger";

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
                        logger(r.status);
                        if (roleID == null) {
                            return;
                        } 
                        const role_uri = `https://discord.com/api/v9/guilds/${serverID}/members/${userID}/roles/${roleID}`;
                        axios.put(role_uri, body, config)
                            .then((r) => {
                                logger(r.status);
                            })
                            .catch((err) => {
                                logger(err.response);
                            })        
                    })
                    .catch((err) => {
                        logger(err.response);
                    })
            } else {
                logger("FAILED TO GET ACCESS_TOKEN");
            }
        } else {
            logger("FAILED TO GET SERVERID OR USERID");
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

            logger(response.data);

            const data = response.data.user;

            return data;
        } catch(e) {
            logger(e);
            return null;
        }
}
