import React from 'react';
import Link from 'next/link';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography  from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { withStyles } from '@mui/styles';

import styles from "./Selection.module.css";

export default function Selection() {

    const CreateTypography = withStyles({
        root: {
        color: "#FFFF00",
        fontFamily: '"Press Start 2P", cursive'
        }
    })(Typography);


    const JoinTypography = withStyles({
        root: {
        color: "#28FE14",
        fontFamily: '"Press Start 2P", cursive'
        }
    })(Typography);


    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <Card className={styles.create}>
                    <CardActionArea className={styles.actionArea}>
                    <Link href="/project/create">
                        <CardContent className={styles.cardContent}>
                            <CreateTypography gutterBottom variant="h5" component="div">
                                Create Project
                            </CreateTypography>
                            <CreateTypography variant="body2" color="text.primary">
                                Click here if you are a loner or a project leader!
                            </CreateTypography>
                        </CardContent>
                    </Link>
                    </CardActionArea>
                </Card>
            </div>
            <div className={styles.card}>
                <Card className={styles.join}>
                    <CardActionArea  className={styles.actionArea}>
                    <Link href="/project/join">
                        <CardContent className={styles.cardContent}>
                            <JoinTypography gutterBottom variant="h5" component="div">
                            Join Project
                            </JoinTypography>
                            <JoinTypography variant="body2" color="text.primary">
                                Click here if you have a project to join!
                            </JoinTypography>
                            </CardContent>
                    </Link>
                    </CardActionArea>
                </Card>
            </div>
        </div>
    )
}   
