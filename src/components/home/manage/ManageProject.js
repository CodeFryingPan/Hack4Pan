import * as React from 'react';

import Button from '@mui/material/Button';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Pin from './pin';
import Dashboard from "./dashboard";
import Description from './description';

import { Typography } from '@mui/material';
import { withStyles } from '@mui/styles';

import { handleDeleteProject, handleLeaveProject } from '../../../util/apiclient';

import styles from "./ManageProject.module.css";

export default function ManageProject({ host, user, project, members }) {
    const [open, setOpen] = React.useState(false);
    
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

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    return (
      <div className={styles.container} >
          <h1>{project.projectName}</h1>

          <Pin project={project} />
          <Description host={host} user={user} project={project}/>
          <Dashboard host={host} members={members} user={user} project={project}/>
        { (project.leader == user.uid)? (
          <Button disableRipple className={styles.projectActionButton} variant="standard" onClick={handleClickOpen}>
            <WhiteTextTypography>
              DELETE PROJECT
            </WhiteTextTypography>
          </Button>
          ): (        
            <Button variant="standard" onClick={(e) => handleLeaveProject(e, host, user, user.uid, project)}>
              <WhiteTextTypography>
                  LEAVE PROJECT
              </WhiteTextTypography>
            </Button>
          )
        }
      <Dialog
        open={open}
        onClose={handleClose}
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
            <Button onClick={handleClose}>
              <WhiteTextTypography>
                No 
              </WhiteTextTypography>
            </Button>
            <Button onClick={() => {
              handleDeleteProject(host, user.uid, project);
              handleClose();
            }} autoFocus>
              <WhiteTextTypography>
                Yes
              </WhiteTextTypography>
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      </div>
      );
}