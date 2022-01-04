
import { useState, forwardRef } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { Typography } from "@mui/material";
import { withStyles, makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
import Router from "next/router";
import Selection from "./selection";
import ManageProject from "./manage";

//for the full page dialog
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import Info from "../shared/info";

import styles from "./Home.module.css"


const Transition = forwardRef(function Transition(
  props, ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Home({ host, user, members, project }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const RedTextTypography = withStyles({
      root: {
        color: "#E50000",
        fontFamily: '"Press Start 2P", cursive',
        textDecoration: "underline",
        textDecorationColor: "#E50000",
      }
    })(Typography);

    const ButtonTypography = withStyles({
      root: {
        color: "#FFFFFF",
        fontFamily: '"Press Start 2P", cursive',
        textDecoration: "underline",
        textDecorationColor: "#FFFF00",
        fontSize: "16px",
        padding: "1rem"
      }
    })(Typography);

    const DialogTitleTypography = withStyles({
      root: {
        color: "#FFFF00",
        fontFamily: '"Press Start 2P", cursive',
      }
    })(Typography);

    return(
        <div className={styles.container}>
            <div className={styles.faqButtonContainer}>
              <div className={styles.faqButton}>
                <Button color="error" variant="standard" onClick={() =>  {
                  handleClickOpen()
                }}>
                  <ButtonTypography> FAQ </ButtonTypography>
                </Button>
              </div>
              <Dialog                
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
              >
                <div className={styles.dialogContainer}>
                  <AppBar sx={{ position: 'relative', backgroundColor: "#0F0E0E", boxShadow: 0}}>
                    <Toolbar>
                      <DialogTitleTypography sx={{ ml: "2rem", flex: 1 }} variant="h6" component="div">
                        FAQ
                      </DialogTitleTypography>
                      <IconButton
                      edge="start"
                      color="inherit"
                      onClick={handleClose}
                      aria-label="close"
                    >
                        <CloseIcon />
                      </IconButton>
                    </Toolbar>
                  </AppBar>
                  <Info/>
                </div>
              </Dialog>
            </div>

            {
            user.project ?
             (<ManageProject host={host} user={user} project={project} members={members} />)
            : <Selection></Selection>
            }
            <div className={styles.signOutButtonContainer}>
              <Button className={styles.signOutButton} color="error" variant="standard" onClick={() =>  {
                signOut();
                Router.push("/");
              }}>
                <RedTextTypography>  Sign Out </RedTextTypography>
              </Button>
            </div>
        </div>   
    )
}