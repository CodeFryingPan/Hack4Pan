
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
                What is HACK4PAN?
              </WhiteTextTypography>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            
            <WhiteTextTypography>
            Hack4Pan is a hackathon. Everyone can submit their projects and share it 
            to an audience on Pan's livestream. The projects will be judged by Pan, Nick White 
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
            Money + gift cards for now, details will be revealed later PauseChamp
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
            Yes! The teams can be comprised of 1-4 people. You can participate alone, but if you want to find teammates you can ask around in our discord in the :)
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
             The presentations will be done via
             discord and you'll have to share your screen.
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
            Hack4Pan will occur for 72 hours, from Thursday 3pm EST till Sunday 3pm EST,
            which is when the presentations begin. The dates will be announced soon.
            </WhiteTextTypography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
};