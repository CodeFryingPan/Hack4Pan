import { useState } from "react";
import { TextField, Button, Typography } from '@mui/material';
import { withStyles } from "@mui/styles";
import EditIcon from '@mui/icons-material/Edit';

import { handleEditProject } from "../../../../util/apiclient";

import styles from "./Description.module.css";

import RetroTextField from "../../../shared/textfield/RetroTextField";

export default function Description({ host, user, project }) { 
    const [description, setDescription] = useState(project.description);
    const [link, setLink] = useState(project.link);
    const [presentation, setPresentation] = useState(project.presentation)
    const [didEdit, setEdit] = useState(false);

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
    

    return (
      <div className={styles.container}>
          <div className={styles.description}>
                <WhiteTextTypography component="h4">
                    Project Description
                </WhiteTextTypography>                
                
                <div className={styles.textFieldContainer}>
                    <RetroTextField
                        placeholder="Describe your project..."
                        variant="standard" 
                        className={styles.descriptionTextField}
                        value={description}
                        multiline
                        onChange={e => {
                            setEdit(true);
                            setDescription(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className={styles.link}>
                <WhiteTextTypography component="h4">
                    Project Link
                </WhiteTextTypography>
                <div className={styles.textFieldContainer}>
                    <RetroTextField
                        placeholder="Link your project..."
                        variant="standard" 
                        value={link}
                        className={styles.linkTextField}
                        onChange={e => {
                            setEdit(true);
                            setLink(e.target.value);
                        }}
                    />
                </div>
            </div>
            <div className={styles.presentation}>
                <WhiteTextTypography component="h4">
                    Project Slides
                </WhiteTextTypography>
                <div className={styles.textFieldContainer}>
                    <RetroTextField
                        placeholder="Link your slides..."
                        variant="standard" 
                        value={presentation}
                        className={styles.presentationTextField}
                        onChange={e => {
                            setEdit(true);
                            setPresentation(e.target.value);
                        }}
                    />
                </div>
            </div>
            {
            didEdit  && ( 
                <div className={styles.buttonContainer}>
                     <Button 
                        disableRipple
                        variant="standard"
                        className={styles.button}
                        onClick={(e) => {
                            handleEditProject(e, host, user.uid, project, description, link, presentation)
                            setEdit(false);
                        }}>
                        <ButtonTypography style={{display: 'flex'}}>
                            Confirm 
                        </ButtonTypography>
                    </Button>
                    <Button 
                    disableRipple
                    variant="standard"
                    className={styles.button}
                    onClick={(e) => {
                        setDescription("")
                        setLink("")
                        setPresentation("")
                        setEdit(false);
                    }}>
                        <ButtonTypography>
                            CANCEL 
                        </ButtonTypography>
                    </Button>
                </div>
            )
            }
      </div>
      );
}