import React from 'react';
import Link from 'next/link';
import styles from "../../styles/SelectionPage.module.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

export default function SelectionPage() {
    
    return (
        <div className={styles.container}>
            <Card sx={{ maxWidth: 345 }} className={styles.create}>
                <CardActionArea>
                <Link href="/project/create">
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Create a project
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Click here if you are a loner or a project leader!
                    </Typography>
                    </CardContent>
                </Link>
                </CardActionArea>
            </Card>

            
            <Card sx={{ maxWidth: 345 }} className={styles.join}>
                <CardActionArea>
                <Link href="/project/join">
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Join a project
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Click here if you have a project to join!
                    </Typography>
                    </CardContent>
                </Link>
                </CardActionArea>
            </Card>
        </div>
    )
}   
