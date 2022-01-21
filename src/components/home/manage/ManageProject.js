import { useState, forwardRef } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from "@mui/material/Slide";

import Pin from './pin';
import Dashboard from "./dashboard";
import Description from './description';

import { Typography } from '@mui/material';
import { withStyles } from '@mui/styles';

import { handleDeleteProject, handleLeaveProject } from '../../../util/apiclient';

import styles from "./ManageProject.module.css";
import { style } from "@mui/system";

const Transition = forwardRef(function Transition(
  props, ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export default function ManageProject({ host, user, project, members }) {
    const [deleteOpen, setDeleteOpen] = useState(false);
    
    const WhiteTextTypography = withStyles({
        root: {
        color: "#FFFFFF",
        fontFamily: '"Press Start 2P", cursive'
        }
    })(Typography);

    const RedTextTypography = withStyles({
      root: {
      color: "#E50000",
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

    const handleClickDeleteOpen = () => {
      setDeleteOpen(true);
    };

    const handleDeleteClose = () => {
      setDeleteOpen(false);
    };


    return (
      <div className={styles.container} >

          <h1 className={styles.projectTitle}>
            {project.projectName}
            </h1>

          <Pin project={project} />
          <Description host={host} user={user} project={project}/>
          <Dashboard host={host} members={members} user={user} project={project}/>
          {/* <div className={styles.guidelineButton}>
                <Button 
                    disableRipple
                    variant="standard"
                    className={styles.button}
                    onClick={(e) => {
                        
                    }}>
                    <ButtonTypography style={{display: 'flex'}}>
                        GUIDELINE 
                    </ButtonTypography>
                </Button>
          </div> */}
          <div className={styles.projectActionButton}>
            { (project.leader == user.uid)? (
            <Button disableRipple  variant="standard" onClick={handleClickDeleteOpen}>
              <ButtonTypography>
                DELETE PROJECT
              </ButtonTypography>
            </Button>
            ): (        
              <Button variant="standard" onClick={(e) => handleLeaveProject(e, host, user.uid, project)}>
                <ButtonTypography>
                    LEAVE PROJECT
                </ButtonTypography>
              </Button>
            )
          }
          </div>
      <Dialog
        open={deleteOpen}
        TransitionComponent={Transition}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={styles.dialogContainer}>
          <DialogTitle id="alert-dialog-title">
              <WhiteTextTypography>
                  DELETE PROJECT
              </WhiteTextTypography>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">  
              <WhiteTextTypography>
                Are you sure you want to delete your project?
              </WhiteTextTypography>
              <RedTextTypography className={styles.warningText}>
                This cannot be reversed.
              </RedTextTypography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose}>
              <ButtonTypography>
                No 
              </ButtonTypography>
            </Button>
            <Button onClick={() => {
              handleDeleteProject(host, user.uid, project);
              handleDeleteClose();
            }} autoFocus>
              <ButtonTypography>
                Yes
              </ButtonTypography>
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      </div>
      );
}