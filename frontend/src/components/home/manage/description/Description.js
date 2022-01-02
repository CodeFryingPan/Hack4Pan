import { useState } from "react";
import { TextField, Button, Typography } from '@mui/material';
import { withStyles } from "@mui/styles";
import EditIcon from '@mui/icons-material/Edit';

import { handleEdit } from "../../../../util/apiclient";

import styles from "./Description.module.css";

import RetroTextField from "../../../shared/textfield/RetroTextField";

export default function Description({ user, project }) { 
    const [description, setDescription] = useState(project.description);
    const [link, setLink] = useState(project.link);
    const [didEdit, setEdit] = useState(false);

    const WhiteTextTypography = withStyles({
        root: {
        color: "#FFFFFF",
        fontFamily: '"Press Start 2P", cursive'
        }
    })(Typography);

    

    return (
      <div className={styles.container}>
          <div className={styles.description}>
                <WhiteTextTypography component="h4">
                    Project Description
                </WhiteTextTypography>
                
                
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
            <div className={styles.link}>
                <WhiteTextTypography component="h4">
                    Project Link
                </WhiteTextTypography>
                
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
            {
            didEdit  && ( 
                <div className={styles.buttonContainer}>
                     <Button 
                        disableRipple
                        variant="standard"
                        className={styles.button}
                        onClick={(e) => {
                            handleEdit(e, user.uid, project, description, link)
                            setEdit(false);
                        }}>
                        <WhiteTextTypography style={{display: 'flex'}}>
                            Confirm 
                        </WhiteTextTypography>
                    </Button>
                    <Button 
                    disableRipple
                    variant="standard"
                    className={styles.button}
                    onClick={(e) => {
                        setDescription("")
                        setLink("")
                        setEdit(false);
                    }}>
                        <WhiteTextTypography>
                            CANCEL 
                        </WhiteTextTypography>
                    </Button>
                </div>
            )
            }
      </div>
      );
}