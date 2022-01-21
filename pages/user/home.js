import Head from "next/head";
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import clientPromise from '../../src/util/mongodb';

import Home from "../../src/components/home";
import Error from "../../src/components/shared/error";

import { getDiscordUser, giveRoleToUser } from "../../src/util/discordClient";

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

    console.log(user);

    if(user == null || user == undefined) {
      return {
        props: { 
            host: host,
            user: null, 
            project: null
        }
      }
    }

    var members = await usersCollection.find({"project": user.project}).toArray();
    const project = await projectsCollection.findOne({"_id": user.project})

    // Get Discord User and change tag only in props (NO UPDATES)
    const SERVER_ID = process.env.DISCORD_SERVER;
    const discordUser = await getDiscordUser(user.uid, SERVER_ID);

    if(discordUser) {
      const image = `https://cdn.discordapp.com/avatars/${user.uid}/${discordUser.avatar}.png`
      const tag = discordUser.username+"#"+discordUser.discriminator;
      
      const SERVER_ID = process.env.DISCORD_SERVER;
      const ROLE_ID = process.env.ROLE_TO_GIVE;

      if (!discordUser.roles.includes(ROLE_ID.toString())) {
          giveRoleToUser(SERVER_ID, discordUser.id, ROLE_ID);
      }

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

  if ((user == null || (user != null && project == null && user.project != null))) {
      return <Error />
  }

  return (
      <div>
         <Head>
          <title> Hack4Pan | { user && (discordTag ? discordTag : user.tag)} </title>
          <meta name="description" content="Hack4Pan hackathon" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {
          <Home host={host} user={user} members={members} project={project}/>
        }
        
      </div>
      
    )
}