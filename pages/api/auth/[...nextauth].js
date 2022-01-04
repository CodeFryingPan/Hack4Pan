import NextAuth from "next-auth"
import DiscordProvider from "next-auth/providers/discord"
import clientPromise from '../../../src/util/mongodb'
import { addUserToServer } from "../../../src/util/discordClient";

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

            addUserToServer(account.access_token, SERVER_ID, profile.id, ROLE_ID);

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
            if (user) {
                token.uid = user.id;
            }
            return token;
        }
    }
});
