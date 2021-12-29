import Selection from "../../src/components/selection.js";
import Project from "../../src/components/project.js";
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { Typography } from "@mui/material";
import clientPromise from '../../src/util/mongodb';
import Button from '@mui/material/Button';
import styles from "../../styles/UserHome.module.css"
import axios from "axios";
import Router from "next/router";

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


export default function Home({ user, members, project }) {
    const { data: session } = useSession()
    
    return(
        <div className={styles.container}>
            {
            user.project ?
            (<Project user={user} project={project} members={members}></Project>)
            : <Selection></Selection>
            }
            <Button className={styles.button} color="error" variant="outlined" onClick={() => signOut()}> Sign Out </Button>
        </div>   
    )
}