import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import clientPromise from '../../../src/util/mongodb'
import { addUserToServer, giveRoleToUser } from "../../../src/util/discordClient";


async function refreshAccessToken(token) {
    console.log(token);
    try {
      const url = "https://discord.com/api/v8/oauth2/token"
            
        var params = {
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: token.refreshToken,
            scope: 'identify email guilds.join' 
            
        }

      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(params),
        method: "POST",
      })
  
      const refreshedTokens = await response.json()

      if (!response.ok) {
        throw refreshedTokens
      }

      return {
        ...token,
        accessToken: refreshedTokens.access_token,
        accessTokenExpires: Date.now() + refreshedTokens.exp * 1000,
        refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
      }
    } catch (error) {
      console.log(error)
  
      return {
        ...token,
        error: "RefreshAccessTokenError",
      }
    }
  }

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: 'identify email guilds.join' } },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            
            // ADD USER TO SERVER AND GIVE ROLE
            const SERVER_ID = process.env.DISCORD_SERVER;
            const ROLE_ID = process.env.ROLE_TO_GIVE;
            const DEFAULT = process.env.ROLE_DEFAULT

            addUserToServer(account.access_token, SERVER_ID, profile.id, ROLE_ID, DEFAULT);
            giveRoleToUser(SERVER_ID, profile.id, ROLE_ID);
            
            //  Add USER TO DATABASE
            const client = await clientPromise
            await client.connect()

            try {
                const usersCollection = await client.db("Panathon").collection("Users")
                const userExists = await usersCollection.findOne({"uid": user.id})
                
                if (userExists) {                  
                    const userFilter = {uid: profile.id};
                    const updateUser = { $set:
                        {
                            tag: profile.username + "#" + profile.discriminator,
                            image: profile.image_url
                        }
                    };
                    const userUpdateResult = await client.db("Panathon").collection("Users").updateOne(userFilter, updateUser);
                    
                    console.log(`User document updated: ${userUpdateResult.modifiedCount}`);
                } else {
                    const userDoc = {
                        uid: profile.id,
                        tag: profile.username + "#" + profile.discriminator,
                        project: null,
                        image: profile.image_url
                    }   
                    const result = await usersCollection.insertOne(userDoc)
                    console.log(`A document was inserted with the _id: ${result.insertedId}`);
                }
            } catch (e) {
                console.log(e);
            } finally {
                return true
            }
        },
        async redirect({ url, baseUrl }) {
            return url
        },
        async session({ session, user, token }) {
            if (session?.user) {
                session.user.id = token.uid;
            }
            
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if(account && user) {
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                token.expiration = account.expires_at * 1000

                token.uid = user.id
                return token
            }

            // Return previous token if the access token has not expired yet
            if (Date.now() < token.expiration) {
                return token
            }

            // Access token has expired, try to update it
            return refreshAccessToken(token)
        }
    }
});

