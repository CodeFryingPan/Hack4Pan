import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import styles from "../../styles/SelectionPage.module.css";
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';

export default function JoinTeam() {
    const [projectName, setProjectName] = useState("");
    const [password, setPassword] = useState("");

    const handleJoin = () => {
        // server side props to make api to db to join team
    }

    return(
        <div className={styles.joincontainer}>
            <h1>Join a team!</h1>
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
                onClick={handleJoin}>
                Join
            </Button>
        </div>
    )
}