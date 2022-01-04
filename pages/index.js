import Head from "next/head";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Card from "@mui/material/Card";
import {useState, forwardRef} from 'react';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import Image from "next/image";
import DiscordLogo from "../public/static/images/discord-mascot.jpg"
import ClickLogo from "../public/static/images/click.png"
import BinaryLogo from "../public/static/images/binary10.png"

import { withStyles , makeStyles} from '@mui/styles'
import { useSession, signIn, signOut, getSession, getProviders } from "next-auth/react"

import Profiles from '../src/components/index/profiles';
import styles from "../styles/Index.module.css"
import Button from '@mui/material/Button'
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

//  React

const useStyles = makeStyles({
  content: {
    justifyContent: "center"
  }
});  

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

  const ButtonTypography = withStyles({
  root: {
      color: "#FFFFFF",
      fontFamily: '"Press Start 2P", cursive',
      textDecoration: "underline",
      textDecorationColor: "#FFFF00",
  }
  })(Typography); 

  const classes = useStyles();

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
          <Image src={'https://i.ibb.co/NyXRxNC/drip.gif'} width={100} height={100}/>
          
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
          </div>
          
          <div className={styles.accordions}>
            <Accordion className={styles.accordionDescription} disableGutters >
              <AccordionSummary
                classes={{ content: classes.content }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <div>
                  {/* <Image src={BinaryLogo} width={25} height={25} /> */}
                  <WhiteTextTypography>
                    What is HACK4PAN?
                  </WhiteTextTypography>
                  {/* <Image src={ClickLogo} width={25} height={25} /> */}
                </div>
              </AccordionSummary>
              <AccordionDetails>
                
                <WhiteTextTypography>
                Hack The Pan is a hackathon. Everyone can submit their projects and liveshare it 
                to an audience on Pan's livestream. The projects will be judged by Pan 
                and maybe other tech YouTubers.
                </WhiteTextTypography>
                
              </AccordionDetails>
            </Accordion>

            <div className={styles.accordionSeparator}>
              <WhiteTextTypography> </WhiteTextTypography>
            </div>

            <Accordion className={styles.accordionDescription} disableGutters elevation={0}>
              <AccordionSummary
                classes={{ content: classes.content }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <WhiteTextTypography>  What are the prizes? </WhiteTextTypography>
              </AccordionSummary>
              <AccordionDetails>
                <WhiteTextTypography>
                Money + Gift Cards for now, specifics will be decided later monkas
                </WhiteTextTypography>
              </AccordionDetails>
            </Accordion>

            <div className={styles.accordionSeparator}>
              <WhiteTextTypography> </WhiteTextTypography>
            </div>

            <Accordion className={styles.accordionDescription} disableGutters elevation={0}>
              <AccordionSummary
                classes={{ content: classes.content }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <WhiteTextTypography>  Can I be in a team? </WhiteTextTypography>
              </AccordionSummary>
              <AccordionDetails>
                <WhiteTextTypography>
                Yes! The teams can be comprised of 1-4 people. You can totally participate alone, but if you want to find teammates you can ask around in our discord :)
                </WhiteTextTypography>
              </AccordionDetails>
            </Accordion>
            <div className={styles.accordionSeparator}>
              <WhiteTextTypography> </WhiteTextTypography>
            </div>

            <Accordion className={styles.accordionDescription} disableGutters elevation={0}>
              <AccordionSummary
                classes={{ content: classes.content }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <WhiteTextTypography>  Will I be recorded? How will I present? </WhiteTextTypography>
              </AccordionSummary>
              <AccordionDetails>
                <WhiteTextTypography>
                You won't have to share your camera, but you do need a microphone.
                 By participating, you agree to be livestreamed and recorded on video (Twitch/YouTube). 
                 The presentations will be done via
                 discord and you'll have to share your screen and talk to us.
                </WhiteTextTypography>
              </AccordionDetails>
            </Accordion>

            <div className={styles.accordionSeparator}>
              <WhiteTextTypography> </WhiteTextTypography>
            </div>

            <Accordion className={styles.accordionDescription} disableGutters elevation={0}>
              <AccordionSummary
                classes={{ content: classes.content }}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <WhiteTextTypography>  What is the timeline for Hack 4 Pan? </WhiteTextTypography>
              </AccordionSummary>
              <AccordionDetails>
                <WhiteTextTypography>
                Hack 4 Pan will occur for 72 hours, from Thursday 3pm EST till Sunday 3pm EST, which is when the presentations begin.
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
          <Profiles/>
        </footer>
    </div>
  )
}

