import * as React from 'react';

import { useState, useEffect } from 'react';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import withStyles from '@mui/styles/withStyles';

import { handleCreate } from '../../../util/apiclient';
import Router from "next/router";
import dynamic from 'next/dynamic'

import styles from "./CreateProject.module.css";


const RetroButton = dynamic(() => import('../../shared/button/RetroButton'), { ssr: false })
import RetroTextField from '../../shared/textfield/RetroTextField';

export default function CreateProject( {user} ) {
    
    const [projectName, setProjectName] = useState("");
    const [projectNameError, setProjectNameError] = useState(true);

    const WhiteTextTypography = withStyles({
        root: {
            color: "#FFFFFF",
            fontFamily: '"Press Start 2P", cursive'
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
                    <WhiteTextTypography>
                        BACK
                    </WhiteTextTypography>
                </Button>
            </div>
           
            <TitleTypography className={styles.title}>
                Create a 
            </TitleTypography>
            <TitleTypography className={styles.title}>
                Project/Team!
            </TitleTypography>
                

            <div className={styles.textfieldContainer}>
                <WhiteTextTypography>
                    Project Name: 
                </WhiteTextTypography>
                <RetroTextField
                placeholder="___________________"
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
            <RetroButton 
             sx={{
                '&& .MuiTouchRipple-rippleVisible': {
                  animationDuration: '50ms',
                }
            }}
             onClick={() => {
                if (projectNameError) {
                    alert("Your project name should only contain letters or numbers.");
                } else {
                    handleCreate(user.uid, projectName);
                }
            }}>
                CREATE 
            </RetroButton>
            </div>
        </div>
    )
}