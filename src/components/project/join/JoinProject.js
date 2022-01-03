import { useState } from 'react';
import withStyles from '@mui/styles/withStyles';
import { Typography, Button } from '@mui/material';

import { handleJoinProject } from '../../../util/apiclient';
import Router from 'next/router';
import dynamic from 'next/dynamic'

import RetroTextField from '../../shared/textfield/RetroTextField';

import styles from "./JoinProject.module.css";

export default function JoinProject({ host, user }) {
    
    const WhiteTextTypography = withStyles({
        root: {
            color: "#FFFFFF",
            fontFamily: '"Press Start 2P", cursive'
        }
    })(Typography);   
    
    const TitleTypography = withStyles({
        root: {
            color: "#28FE14",
            fontFamily: '"Press Start 2P", cursive'
        }
    })(Typography);   

    const [pin, setPin] = useState("");

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
                Join a 
            </TitleTypography>
            <TitleTypography className={styles.title}>
                Project/Team!
            </TitleTypography>
                

            <div className={styles.textfieldContainer}>
                <WhiteTextTypography>
                    Pin: 
                </WhiteTextTypography>
                <RetroTextField
                placeholder="**************************"
                required
                type="password"
                InputProps={{
                    classes: {
                        root: styles.textfield
                    }
                }}
                onChange={(e) => {
                    setPin(e.target.value);
                }}
                />
            </div>
            <div className={styles.buttonContainer}>
                <Button 
                    variant="standard"
                    className={styles.joinButton}
                    sx={{
                        '&& .MuiTouchRipple-rippleVisible': {
                            animationDuration: '50ms',   
                        },
                        padding: "1rem 2rem",
                        border: "2px solid",
                        borderColor: "white"
                    }}
                    onClick={(e) => handleJoinProject(host, user.uid, pin)}>
                        <WhiteTextTypography>
                            JOIN 
                        </WhiteTextTypography>
                </Button>
        </div>
    </div>
    )
}

