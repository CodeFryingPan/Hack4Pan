import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import DiscordProvider from "next-auth/providers/discord"
import clientPromise from '../../../src/util/mongodb'

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
            const client = await clientPromise
            await client.connect()

            console.log(profile);

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
