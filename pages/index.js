import Head from "next/head";
import Link from "next/link";

import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import {useState, forwardRef} from 'react';
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import Image from "next/image";
import DiscordLogo from "../public/static/images/discord-mascot.jpg"

import { withStyles , makeStyles} from '@mui/styles'
import { useSession, signIn, signOut, getSession, getProviders } from "next-auth/react"

import Profiles from '../src/components/index/profiles';
import Info from "../src/components/shared/info/Info";
import styles from "../styles/Index.module.css"

// Props

export async function getServerSideProps(context) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/user/home',
        permanent: false,
      },
    }
  }

  const providers = await getProviders();

  return {
    props: { providers }
  }
}

const Transition = forwardRef(function Transition(
  props,
  ref,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Landing({ providers }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const TitleTypography = withStyles({
    root: {
        color: "#FFFF00",
        fontFamily: '"Press Start 2P", cursive'
    }
  })(Typography);

  const WhiteTextTypography = withStyles({
      root: {
      color: "#FFFFFF",
      fontFamily: '"Press Start 2P", cursive'
      }
  })(Typography);


  const SmallWhiteText = withStyles({
    root: {
    color: "#FFFFFF",
    fontFamily: '"Press Start 2P", cursive',
    fontSize: "10px"
    }
  })(Typography);

  const ButtonTypography = withStyles({
  root: {
      color: "#FFFFFF",
      fontFamily: '"Press Start 2P", cursive',
      textDecoration: "underline",
      textDecorationColor: "#FFFF00",
  }
  })(Typography); 

    // Automatically makes the discord auth instead of going to signin!
    const renderAuthButton = (providers) => {
      if ("discord" in providers) {
          return (   
          <Card className={styles.cursor} sx={{margin: 8, width: 150, height: 150, backgroundColor: "transparent"}} onClick={() => handleClickOpen()}>
              <Image src={DiscordLogo} width={150} height={150}/>
          </Card>
        )
      } else {
        return (
          <Fab className={styles.cursor} sx={{margin: 8, width: 150, height: 150}} onClick={() => signIn()}>
            <Image src={DiscordLogo} width={150} height={150}/>
          </Fab>
        )
      }
    }
  
  return (
    <div className={styles.container}>
        <Head>
          <title> Hack4Pan </title>
          <meta name="description" content="Hack4Pan hackathon" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          
          <Link href="/amogus">
            <div className={styles.drip} >
              <Image src={'https://i.ibb.co/NyXRxNC/drip.gif'} width={100} height={100}/>
            </div>
          </Link>
            
          <TitleTypography variant="h1" component="div" className={styles.title} gutterBottom> 
            HACK 4 PAN<span className={styles.blink}>_</span>
          </TitleTypography>
          <WhiteTextTypography variant="h4" component="div" gutterBottom> 
            2022
          </WhiteTextTypography>

          <div className={styles.authentication}>
            {
              renderAuthButton(providers)
            }
              <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-describedby="alert-dialog-slide-description"
            >
              <div className={styles.dialogContainer}>
                <DialogTitle> 
                  <WhiteTextTypography>
                    PARTICIPATION AGREEMENT
                  </WhiteTextTypography>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    <WhiteTextTypography>
                        Hack 4 Pan will be livestreamed on Twitch and potentially shared on YouTube. You will present your project by sharing
                        your screen and talking to the judges through Discord. By applying, you agree to the above.
                    </WhiteTextTypography>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>
                    <ButtonTypography>
                      Disagree
                    </ButtonTypography>
                  </Button>
                  <Button onClick={() => {
                    handleClose();
                    signIn(providers["discord"].id);
                    }}>
                       <ButtonTypography>
                        Agree
                      </ButtonTypography>
                    </Button>
                </DialogActions>
              </div>
            </Dialog>
            <WhiteTextTypography variant="body" component="div">
              Apply with Discord!
            </WhiteTextTypography>
            <div className={styles.discordClickAbove}>
              <SmallWhiteText component="div">
                (click above)
              </SmallWhiteText>
            </div>
          </div>
          <div className={styles.info}>
            <Info/>
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
          <Profiles/>
        </footer>
    </div>
  )
}

