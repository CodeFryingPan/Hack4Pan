import Head from "next/head";
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import clientPromise from '../../src/util/mongodb';

import Home from "../../src/components/home";

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

    console.log("TEAM MEMBERS", members);

    return {
        props: { 
            user: JSON.parse(JSON.stringify(user)), 
            members: JSON.parse(JSON.stringify(members)),
            project: JSON.parse(JSON.stringify(project)),
        }
    }
}


export default function UserHomePage({ user, members, project }) {
    return (
      <div>
         <Head>
          <title> Hack4Pan | {user.tag} </title>
          <meta name="description" content="Hack4Pan hackathon" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Home user={user} members={members} project={project} />
      </div>
      
    )
}