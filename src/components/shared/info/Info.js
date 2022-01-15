
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { withStyles , makeStyles} from '@mui/styles'

import styles from "./Info.module.css"


//  React

const useStyles = makeStyles({
  content: {
    justifyContent: "center"
  }
});  

export default function Info() {
    const WhiteTextTypography = withStyles({
        root: {
        color: "#FFFFFF",
        fontFamily: '"Press Start 2P", cursive'
        }
    })(Typography);

    const classes = useStyles();
    
    return (
        <div className={styles.accordions}>
        <Accordion className={styles.accordionDescription} sx={{backgroundColor: "#0F0E0E"}}  disableGutters >
          <AccordionSummary
            classes={{ content: classes.content }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div>
              <WhiteTextTypography>
                How do I apply and submit?
              </WhiteTextTypography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            
            <WhiteTextTypography>
            Just apply using the apply with Discord button and then create/join a Project. Once you have created/joined a project, you're ready! (More on submission guidelines will come!) <br/><br/>
            Everyone can submit their projects and share it to an audience on Pan's livestream. The projects will be judged by Pan, SECRET, and SECRET.
            </WhiteTextTypography>
            
          </AccordionDetails>
        </Accordion>

        <div className={styles.accordionSeparator} sx={{backgroundColor: "#0F0E0E"}} >
          <WhiteTextTypography> </WhiteTextTypography>
        </div>

        <Accordion className={styles.accordionDescription} sx={{backgroundColor: "#0F0E0E"}}  disableGutters elevation={0}>
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
                Over 1200$ in Prizes: <br/>
                - 1st Place 500$ <br/>
                - 2nd 200$ <br/>
                - 3rd 150$ <br/>
                - 4th 100$ <br/>
                - 5th 50$ <br/>
                - Top 10 get an exclusive discord role. <br/>
                - Top 10 get a Hack4Pan NFT <br/>
                <br/>
                
                Category Prizes:  <br/>
                - Best Social Good Hack: 100$ <br/>
                - Best Meme Hack: 100$ <br/>
              
                <br/>
                Other Prizes:  <br/>
                - Best Meme (Posted in #memes): Meme NFT

            </WhiteTextTypography>
          </AccordionDetails>
        </Accordion>

        <div className={styles.accordionSeparator}>
          <WhiteTextTypography> </WhiteTextTypography>
        </div>

        <Accordion className={styles.accordionDescription} sx={{backgroundColor: "#0F0E0E"}}  disableGutters elevation={0}>
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
            Yes! The teams can be comprised of 1-4 people. You can participate alone, but if you want to find teammates you can ask around in our discord in the #team-formation channel in tthe Hack4Pan category :)
            </WhiteTextTypography>
          </AccordionDetails>
        </Accordion>
        <div className={styles.accordionSeparator}>
          <WhiteTextTypography> </WhiteTextTypography>
        </div>

        <Accordion className={styles.accordionDescription} sx={{backgroundColor: "#0F0E0E"}}  disableGutters elevation={0}>
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
             The presentations will be done via discord or zoom where you'll be presenting 
            </WhiteTextTypography>
          </AccordionDetails>
        </Accordion>

        <div className={styles.accordionSeparator}>
          <WhiteTextTypography> </WhiteTextTypography>
        </div>

        <Accordion className={styles.accordionDescription} sx={{backgroundColor: "#0F0E0E"}} disableGutters elevation={0}>
          <AccordionSummary
            classes={{ content: classes.content }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <WhiteTextTypography>  What is the timeline for Hack4Pan? </WhiteTextTypography>
          </AccordionSummary>
          <AccordionDetails>
            <WhiteTextTypography>
            Hack4Pan will be from Friday, January 21st at 12 pm to Sunday January 23rd at 6:00 pm EST.
            Presentations will be done on Sunday after submissions are over at 12:00 pm. More info on submissions guidelines and judging criteria will be announced soon. 
            </WhiteTextTypography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
};