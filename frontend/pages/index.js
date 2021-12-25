import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Profiles from './profiles'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@material-ui/core/Button";

import { createTheme, ThemeProvider} from '@mui/material/styles';
import { withStyles } from '@material-ui/styles'
import { grey } from "@mui/material/colors";

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

export default function Home() {


  return (
    <div className={styles.container}>
      <ThemeProvider theme={theme}>
        <Head>
          <title>Le Troll</title>
          <meta name="description" content="Frying4Good hackathon" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <Image src={'https://i.ibb.co/NyXRxNC/drip.gif'} width={75} height={75}/>
          
          
          <WhiteTextTypography variant="h2" component="div" className={styles.title} gutterBottom> 
            PANATHON
          </WhiteTextTypography>
          <WhiteTextTypography variant="h4" component="div" gutterBottom> 
            2022
          </WhiteTextTypography>
        

          
            <Link href="/form">
              <Button size="large" variant="outlined">
                <WhiteTextTypography>
                  Register 
                </WhiteTextTypography>
              </Button>
            </Link>
          
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
                Frying4Good is a hackathon for social good! We're currently working on a website that will allow users to submit their projects and present them in front of a Frying Pan's livestream. The judges will be Frying Pan and other tech YouTubers!
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
                Frying4Good is a hackathon for social good! We're currently working on a website that will allow users to submit their projects and present them in front of a stream!
                </WhiteTextTypography>
              </AccordionDetails>
            </Accordion>
          </div>
        </main>

        <footer className={styles.footer}>
          <a
            href="https://www.youtube.com/c/FryingPan/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}Frying Pan
          </a>
        </footer>
      </ThemeProvider>
    </div>
  )
}
