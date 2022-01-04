import Head from "next/head";
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import clientPromise from '../../src/util/mongodb';
import DiscordClient from "../../src/util/discordClient";
import Home from "../../src/components/home";
import { getDiscordUser } from "../../src/util/discordClient";

export async function getServerSideProps(context) {

    const session = await getSession(context)

    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }  

    const host =  context.req.headers.host;

    // TODO: CHANGE THESE TO API AFTER SO WE DONT DO THESE DATABASE OPERATIONS HERE
    const client = await clientPromise
    await client.connect()

    const database = await client.db("Panathon");
    const usersCollection = await database.collection("Users")
    const projectsCollection = await database.collection("Projects")

    const user = await usersCollection.findOne({"uid": session.user.id})
    var members = await usersCollection.find({"project": user.project}).toArray();
    const project = await projectsCollection.findOne({"_id": user.project})

    // Get Discord User and change tag only in props (NO UPDATES)
    const SERVER_ID = process.env.DISCORD_SERVER;
    const discordUser = await getDiscordUser(user.uid, SERVER_ID);

    if(discordUser) {
      const image = `https://cdn.discordapp.com/avatars/${user.uid}/${discordUser.avatar}.png`
      const tag = discordUser.username+"#"+discordUser.discriminator;

      // If the discord tag is not the same in user/home then update it for other users!
      if(user.tag !== tag || user.image !== image) {
        // Change for user on the frontend with new updated look
        user.tag = tag;    
        user.image = image;
        if(user.project) {
          members = members.map((member) => {
            if(member.uid == user.uid) {
                member.tag = tag
                member.image = image
            } 
            return member
          })
        }
        
        // Edit DB for other members
        const userFilter = {uid: user.uid};
        const updateUser = { $set:
            {
                tag: tag,
                image: image
            }
        };
        const userUpdateResult = await client.db("Panathon").collection("Users").updateOne(userFilter, updateUser);
        
        console.log(`User document updated: ${userUpdateResult.modifiedCount}`);
      }

      return {
        props: { 
            host: host,
            discordTag: tag,
            user: JSON.parse(JSON.stringify(user)), 
            members: JSON.parse(JSON.stringify(members)),
            project: JSON.parse(JSON.stringify(project)),
        }
      }
    } else {
        return {
          props: { 
              host: host,
              user: JSON.parse(JSON.stringify(user)), 
              members: JSON.parse(JSON.stringify(members)),
              project: JSON.parse(JSON.stringify(project)),
          }
        }
    }
}


export default function UserHomePage({ host, user, members, project, discordTag}) {

  return (
      <div>
         <Head>
          <title> Hack4Pan | {discordTag ? discordTag : user.tag} </title>
          <meta name="description" content="Hack4Pan hackathon" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Home host={host} user={user} members={members} project={project}/>
      </div>
      
    )
}