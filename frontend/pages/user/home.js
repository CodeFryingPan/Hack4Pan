import Head from "next/head";
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import clientPromise from '../../src/util/mongodb';
import DiscordClient from "../../src/util/discordClient";
import Home from "../../src/components/home";
import { getDiscordUser } from "../../src/util/discordClient";
import { handleEditUser } from "../../src/util/apiclient";

import axios from "axios";

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

    // TODO: CHANGE THESE TO API AFTER SO WE DONT DO THESE DATABASE OPERATIONS HERE
    const client = await clientPromise
    await client.connect()

    const database = await client.db("Panathon");
    const usersCollection = await database.collection("Users")
    const projectsCollection = await database.collection("Projects")

    const user = await usersCollection.findOne({"uid": session.user.id})
    const members = await usersCollection.find({"project": user.project}).toArray();
    const project = await projectsCollection.findOne({"_id": user.project})

    // Get Discord User and change tag only in props (NO UPDATES)
    const SERVER_ID = process.env.DISCORD_SERVER;
    const discordUser = await getDiscordUser(user.uid, SERVER_ID);

    if(discordUser) {
      const tag = discordUser.username+"#"+discordUser.discriminator;
     
      return {
        props: { 
            discordTag: tag,
            user: JSON.parse(JSON.stringify(user)), 
            members: JSON.parse(JSON.stringify(members)),
            project: JSON.parse(JSON.stringify(project)),
        }
      }
    } else {
        return {
          props: { 
              user: JSON.parse(JSON.stringify(user)), 
              members: JSON.parse(JSON.stringify(members)),
              project: JSON.parse(JSON.stringify(project)),
          }
        }
    }
}


export default function UserHomePage({ user, members, project, discordTag }) {

  // If the discord tag is not the same in user/home then update it for other users!
  if(user.tag !== discordTag) {
      handleEditUser(user.uid, discordTag);
  }

  return (
      <div>
         <Head>
          <title> Hack4Pan | {discordTag ? discordTag : user.tag} </title>
          <meta name="description" content="Hack4Pan hackathon" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Home user={user} members={members} project={project} />
      </div>
      
    )
}