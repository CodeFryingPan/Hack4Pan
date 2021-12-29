import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from "../../styles/SelectionPage.module.css";
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import Router from 'next/router';

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

    console.log(session)

    return { props: {user: session.user}}
}

export default function JoinTeam({ user }) {
    const [projectName, setProjectName] = useState("");
    const [password, setPassword] = useState("");

    const handleJoin = async (user) => {
        console.log(user);

        const userid = user.id
        
        let body = {
            projectName: projectName,
            password: password
        }

        await axios.put(`http://localhost:3000/api/project/${userid}`, body)
        .then(function (response) {
            console.log(response);
            Router.push("/user/home");
        })
        .catch(function (error) {
            console.log(error);
        }); 
    }

    return(
        <div className={styles.joincontainer}>
            <h1>Join a Project!</h1>
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
                onClick={() => handleJoin(user)}>
                Join
            </Button>
        </div>
    )
}