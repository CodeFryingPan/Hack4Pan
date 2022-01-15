
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import Router from "next/router";
import { Typography, Button } from '@mui/material';
import { withStyles } from '@mui/styles';

import styles from "./Error.module.css"

export default function Error() {

    const WhiteTextTypography = withStyles({
        root: {
        color: "#FFFFFF",
        fontFamily: '"Press Start 2P", cursive'
        }
    })(Typography);


    const TextTypography = withStyles({
        root: {
          color: "#E50000",
          fontFamily: '"Press Start 2P", cursive'
        }
    })(Typography);
    
    const RedTextTypography = withStyles({
        root: {
          color: "#E50000",
          fontFamily: '"Press Start 2P", cursive',
          textDecoration: "underline",
          textDecorationColor: "#E50000",
        }
    })(Typography);
  

    return (
        <div className={styles.container}>
            <div className={styles.errorMessage}>
                <WhiteTextTypography>
                    Error: Try to sign out and then to sign back in if this does not work contact Flepal#8212 in the Discord or report the problem bug-reports in Panhub.
                </WhiteTextTypography>
            </div>

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