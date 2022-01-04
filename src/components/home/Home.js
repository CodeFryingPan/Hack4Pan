
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { Typography } from "@mui/material";
import { withStyles, makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
import Router from "next/router";
import Selection from "./selection";
import ManageProject from "./manage";

import styles from "./Home.module.css"

export default function Home({ host, user, members, project }) {

    const RedTextTypography = withStyles({
      root: {
        color: "#E50000",
        fontFamily: '"Press Start 2P", cursive',
        textDecoration: "underline",
        textDecorationColor: "#E50000",
      }
    })(Typography);

    return(
        <div className={styles.container}>
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