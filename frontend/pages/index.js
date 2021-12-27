import {useState} from "react";

import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Profiles from '../src/components/profiles'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";

import DiscordLogo from "../public/static/images/discord-mascot.png"

import { createTheme, ThemeProvider} from '@mui/material/styles';
import { withStyles } from '@mui/styles'
import { grey } from "@mui/material/colors";

import { useSession, signIn, signOut, getSession } from "next-auth/react"

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/team/selection',
        permanent: false,
      },
    }
  }

  return {
    props: { session }
  }
}

export default function Home() {
  const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF"
    }
  })(Typography);
  
  const theme = createTheme({
    palette: {
      primary: {
        main: grey[900]
      },
      secondary: {
        main: grey[50]
      }
    }
  });
  
  return (
    <div className={styles.container}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Le Troll</title>
          <meta name="description" content="Frying4Good hackathon" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Image src={'https://i.ibb.co/NyXRxNC/drip.gif'} width={100} height={100}/>
          
          
          <WhiteTextTypography variant="h2" component="div" className={styles.title} gutterBottom> 
            PANATHON
          </WhiteTextTypography>
          <WhiteTextTypography variant="h4" component="div" gutterBottom> 
            2022
          </WhiteTextTypography>


          <div className={styles.authentication}>
               <Fab sx={{margin: 2, width: 150, height: 150}} onClick={() => signIn()}>
                  <Image src={DiscordLogo} width={150} height={150}/>
              </Fab>
            <WhiteTextTypography variant="body" component="div">
              Apply with Discord!
            </WhiteTextTypography>
          </div>

          <Profiles/>
          <div className={styles.accordions}>
            <Accordion className={styles.accordionDescription} disableGutters >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <WhiteTextTypography >What is Frying4Pan?</WhiteTextTypography>
              </AccordionSummary>
              <AccordionDetails>
                <WhiteTextTypography>
                Panathon i! We're currently working on a website that will allow users to submit their projects and present them in front of a Frying Pan's livestream. The judges will be Frying Pan and other tech YouTubers!
                </WhiteTextTypography>
              </AccordionDetails>
            </Accordion>

            <Accordion className={styles.accordionDescription} disableGutters elevation={0}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <WhiteTextTypography>  What are the prizes? </WhiteTextTypography>
              </AccordionSummary>
              <AccordionDetails>
                <WhiteTextTypography>
                None yet Clueless
                </WhiteTextTypography>
              </AccordionDetails>
            </Accordion>
          </div>
        </main>

        <footer className={styles.footer}>
          <WhiteTextTypography>
            <a
              href="https://www.youtube.com/c/FryingPan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Powered by{' '}Frying Pan
            </a>
          </WhiteTextTypography>
        </footer>
      </ThemeProvider>
    </div>
  )
}
