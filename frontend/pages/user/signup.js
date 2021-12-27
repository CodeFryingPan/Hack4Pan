import React, { useState } from 'react';
import Link from 'next/link';
import styles from "../../styles/Form.module.css";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from "@mui/material/colors";
import axios from 'axios';
const DiscordOauth2 = require("discord-oauth2");
const oauth = new DiscordOauth2();

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900]
    },
    secondary: {
      main: grey[100]
    }
  }
});

export default function Form() {

  const [pseudoname, setPseudoname] = useState("");
  const [email, setEmail] = useState("");
  const [discordTag, setDiscordTag] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    const body = {
      "Pseudoname": pseudoname,
      "DiscordTag": discordTag,
      "Email": email,
      "Password": password
    }

    axios.post('http://localhost:8081/user', body)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  
  return (
    <div className={styles.container}>
      <ThemeProvider theme={theme}>
        <div className={styles.header}>
            <div className={styles.backbutton}>
              <Link href="/">
                <IconButton aria-label="home" size="large" color="primary">
                  <ArrowBackIcon fontSize="inherit" />
                </IconButton>
              </Link>
            </div>
            <div className={styles.title}>
              <h1>Signup</h1>
            </div>
        </div> 
        <main className={styles.main}> 
            <form className={styles.form}>
              
              <label className={styles.label}>
                <TextField required placeholder="John Doe" onChange={(e) => setPseudoname(e.target.value)} name="pseudoname" label="Pseudoname" fullWidth variant="filled"/>
              </label> 
              <label className={styles.label}>
                <TextField required placeholder="JohnDoe#1234" onChange={(e) => setDiscordTag(e.target.value)} name="discordtag" label="Discord Tag" fullWidth variant="filled"/>
              </label>
              <label className={styles.label}>
              <TextField required placeholder="john.doe@email.com" onChange={(e) => setEmail(e.target.value)} name="email" label="Email" fullWidth variant="filled"/>
              </label>
              <label className={styles.label}>
              <TextField required placeholder="******" onChange={(e) => setPassword(e.target.value)} name="password" label="Password" fullWidth variant="filled"/>
              </label>

              <label className={styles.signup}>
                <Button type="submit" size="large" variant="outlined" onClick={((e) => handleSignUp(e))}> Sign up</Button>
              </label>
            </form>
        </main>
      </ThemeProvider>  
    </div>
  )
}