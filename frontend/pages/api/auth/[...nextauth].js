import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import DiscordProvider from "next-auth/providers/discord"
import clientPromise from '../../../src/util/mongodb'
import axios from "axios";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: { params: { scope: 'identify email guilds.join' } },
    }),
  ],
  callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            

             // ADD USER TO SERVER AND GIVE ROLE
             const SERVER_ID = process.env.DISCORD_SERVER;
             const ROLE_ID = process.env.ROLE_TO_GIVE;
                    
             const body = {
                 "access_token": account.access_token,
             }

             const config = {
                 headers: {
                    "Authorization" :'Bot ' + process.env.DISCORD_BOT_TOKEN,
                    "Content-Type" : "application/json"
                 }
             }

             const uri = `https://discord.com/api/v9/guilds/${SERVER_ID}/members/${profile.id}`;
             axios.put(uri, body, config)
                 .then((r) => {
                     console.log(r.status);
                     const role_uri = `https://discord.com/api/v9/guilds/${SERVER_ID}/members/${profile.id}/roles/${ROLE_ID}`;
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

            //  Add USER TO DATABASE
            const client = await clientPromise
            await client.connect()

            try {
                const usersCollection = await client.db("Panathon").collection("Users")
                const userExists = await usersCollection.findOne({"uid": user.id})
                
                if (!userExists) {                  
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
            return baseUrl
        },
        async session({ session, user, token }) {
            if (session?.user) {
                session.user.id = token.uid;
            }
            
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.uid = user.id;
            }
            return token;
        }
    }
});
