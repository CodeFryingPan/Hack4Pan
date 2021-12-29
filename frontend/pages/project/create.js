import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from "../../styles/SelectionPage.module.css";
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import clientPromise from '../../src/util/mongodb'
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

    const usersCollection = await client.db("Panathon").collection("Users")
    const user = await usersCollection.findOne({"uid": session.user.id})

    if (user.project) {
        return {
            redirect: {
              destination: '/user/home',
              permanent: false,
            },
        }
    } 

    return {
        props: { user: JSON.parse(JSON.stringify(user)) }
    }
}

export default function CreateTeam( {user} ) {
    const [projectName, setProjectName] = useState("");
    const [password, setPassword] = useState("");

    const handleCreate = async (userId, pname, password) => {
        const project = {
            leader: userId,
            projectName: pname,
            password: password,
        }

        console.log(project)

        await axios.post('http://localhost:3000/api/project', project )
        .then(function (response) {
            console.log(response)
            Router.push("/user/home");
        })
        .catch(function (error) {
            console.log(error);
        });        
    }

    return(
        <div className={styles.joincontainer}>
            <h1>Create a team!</h1>
            <TextField
                required
                id="outlined-required"
                label="Project Name"
                className={styles.create}
                onChange={e => setProjectName(e.target.value)}
            />
            <TextField
                required
                id="outlined-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={e => setPassword(e.target.value)}
            />
            <Button 
                variant="contained" 
                className={styles.button}
                onClick={() => handleCreate(user.uid, projectName, password)}>
                Create
            </Button>
        </div>
    )
}