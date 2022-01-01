import { useState } from "react";
import { TextField, Button, Typography } from '@mui/material';
import withStyles from "@mui/styles/withStyles";
import FileCopyIcon from '@mui/icons-material/FileCopy';

import styles from "./Pin.module.css";

const Pin = ({ project }) => {

    const [showPin, setShowPin] = useState(false);
    const [pinCopied, setPinCopied] = useState(false);

    const copy = (e) => {
        e.preventDefault()
        navigator.clipboard.writeText(project.pin);
        setPinCopied(true);
    }

    const WhiteTextTypography = withStyles({
        root: {
            color: "#FFFFFF",
            fontFamily: '"Press Start 2P", cursive'
        }
    })(Typography);

    return (
        <div className={styles.container}>
            <WhiteTextTypography component="h4">
                Project Pin
            </WhiteTextTypography>
            <WhiteTextTypography className={styles.pinDescription} component="p">
                (Add your teammates by giving them this link!)
            </WhiteTextTypography>
            <WhiteTextTypography variant="div">
                {
                    !showPin && 
                    <div className={styles.code} onClick={() => setShowPin(!showPin)}> 
                        click to show pin 
                    </div>
                }
                {
                    showPin && 
                    <div className={styles.pin} onClick={() => setShowPin(!showPin)}> 
                        {project.pin} 
                    </div>
                }
            </WhiteTextTypography>
            <WhiteTextTypography component="h5">
            <Button 
                variant="standard"
                className={styles.copyButton}
                onClick={(e) => copy(e)}>
                <WhiteTextTypography>
                    <FileCopyIcon style={{marginRight: "1rem"}}/>COPY PIN
                </WhiteTextTypography>
            </Button>
            { pinCopied && <span style={{fontSize: '10px'}}> {" "} Copied! :D</span> }
            </WhiteTextTypography>
        </div>
    )
}

export default Pin;