import * as React from 'react';

import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import withStyles from '@mui/styles/withStyles';

import { handleCreateProject } from '../../../util/apiclient';
import Router from "next/router";
import dynamic from 'next/dynamic'

import styles from "./CreateProject.module.css";

import RetroTextField from '../../shared/textfield/RetroTextField';
import { border } from '@mui/system';

export default function CreateProject( {host, user} ) {
    
    const [projectName, setProjectName] = useState("");
    const [projectNameError, setProjectNameError] = useState(true);

    const ButtonTypography = withStyles({
        root: {
            color: "#FFFFFF",
            fontFamily: '"Press Start 2P", cursive',
            textDecoration: "underline"
        }
    })(Typography);   
    
    const WhiteTextTypography = withStyles({
        root: {
            color: "#FFFFFF",
            fontFamily: '"Press Start 2P", cursive',
        }
    })(Typography);   

    const TitleTypography = withStyles({
        root: {
            color: "#FFFF00",
            fontFamily: '"Press Start 2P", cursive'
        }
    })(Typography);   

    const validateName = () => {
        if (/^[A-Za-z0-9 ]*$/.test(projectName)){
            setProjectNameError(false);
        }
        else {
            setProjectNameError(true);
        }
    }
    
    useEffect(() => {
        validateName();}
    , [projectName])

    return(
        <div className={styles.container}>
            <div className={styles.back}>
                <Button
                    variant="standard"
                    className={styles.backButton}
                    disableRipple
                    onClick={(e) => {
                        e.preventDefault();
                        Router.push("/user/home");
                    }}>
                    <ButtonTypography>
                        BACK
                    </ButtonTypography>
                </Button>
            </div>
           
            <div variant="h1" className={styles.title}>
                Create a 
            </div>
            <div variant="h1"  className={styles.title}>
                Project/Team!
            </div>
                

            <div className={styles.textfieldContainer}>
                <WhiteTextTypography>
                    Project Name: 
                </WhiteTextTypography>
                <RetroTextField
                placeholder="_______________________"
                required
                InputProps={{
                    classes: {
                        root: styles.textfield
                    }
                }}
                onChange={(e) => {
                    setProjectName(e.target.value);
                }}
                error={projectNameError}
                />
            </div>
            <div className={styles.buttonContainer}>
                <Button 
                variant="standard"
                className={styles.createButton}
                sx={{
                    '&& .MuiTouchRipple-rippleVisible': {
                        animationDuration: '50ms',   
                    },
                    padding: "1rem 2rem",
                    border: "2px solid",
                    borderColor: "white"
                }}
                onClick={() => {
                    if (projectNameError) {
                        alert("Your project name should only contain letters or numbers.");
                    } else {
                        handleCreateProject(host, user.uid, projectName);
                    }
                }}>
                    <ButtonTypography>
                        CREATE 
                    </ButtonTypography>
                </Button>
            </div>
        </div>
    )
}