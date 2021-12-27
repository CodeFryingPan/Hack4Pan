import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import DiscordProvider from "next-auth/providers/discord"

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
            // 
            // IF USER EXISTS:
            // CONTINUE
            // ELSE: ADD USER HERE

            // const userExists = await client.db("Panathon").collection("Users").findOne({"uid": user.id});
            

            return true
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
