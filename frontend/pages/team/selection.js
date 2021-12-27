import React from 'react';
import Link from 'next/link';
import styles from "../../styles/SelectionPage.module.css";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

import { useSession, signIn, signOut, getSession } from "next-auth/react"


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
  
    return {
      props: { session }
    }
}

export default function SelectionPage() {
    const { data: session } = useSession()
  
    // IS IN THE DATABASE RIGHT?
    // 

    // if (session) {
    //     console.log(session)
        
    // }
    
    return (
        <div className={styles.container}>
            <Card sx={{ maxWidth: 345 }} className={styles.create}>
                <CardActionArea>
                <Link href="/team/join">
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Create a team
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Click here if you are a loner or a team leader!
                    </Typography>
                    </CardContent>
                </Link>
                </CardActionArea>
            </Card>

            
            <Card sx={{ maxWidth: 345 }} className={styles.join}>
                <CardActionArea>
                <Link href="/team/join">
                    <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Join a team
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Click here if you have a team to join!
                    </Typography>
                    </CardContent>
                </Link>
                </CardActionArea>
            </Card>
            {<button onClick={() => signOut()}>Sign out</button>}
        </div>
    )
}   
