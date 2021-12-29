import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from "../../styles/SelectionPage.module.css";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import {useState, useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from "@mui/material/IconButton";
import Router from 'next/router';
import Image from 'next/image';

  /*
    TODO
    - READ USERS FROM DB DEPENDING ON TEAM NAME
    - KICK ONLY AVAILABLE FOR TEAM LEADER: CHECK IF USER IS LEADER TO DISPLAY COLUMN
  */

export default function Project({ user, project, members }) {
    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const handleKick = (e, userid) => {
      e.preventDefault;
      console.log(e)

      axios.delete(`http://localhost:3000/api/project/${userid}`)
      .then(function (response) {
          console.log(response);
          Router.push("/user/home");
      })
      .catch(function (error) {
          console.log(error);
      });     

      // axios.post('http://localhost:8081/team', body)
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
        // });
    }

    const handleDelete = (project) => {
      const data = {
          project: project._id
      }  
    
      
      axios.delete(`http://localhost:3000/api/project/`, { 
        data: data 
      }).then(function (response) {
            console.log(response);
            Router.push("/user/home");
        })
        .catch(function (error) {
            console.log(error);
        });        
        handleClose();

    }

    return (
      <div className={styles.container}>
          <h1>{project.projectName}</h1>
          <TableContainer component={Paper} className={`${styles.table}`}>
          <h3> Members </h3>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
              <TableCell align="left"> </TableCell>
                <TableCell align="left"> Discord Tag </TableCell>
                <TableCell align="center">
                  UID
                  </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => (
                <TableRow
                  key={member.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell align="left" component="th" scope="row">
                  <Image src={member.image}   width={50} height={50} />
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                  {member.tag}
                  </TableCell>
                  <TableCell align="center">
                  {member.uid}
                  </TableCell>
                  <TableCell align="right">
                      { (project.leader == user.uid && member.uid != project.leader)? (
                        <IconButton id={member.uid} onClick={(e) => handleKick(e, member.uid)} variant="contained">
                          <DeleteIcon></DeleteIcon>
                        </IconButton> 
                        ): (<div></div>)
                      }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        { (project.leader == user.uid)? (
          <Button variant="outlined" onClick={handleClickOpen}>
           DELETE PROJECT
          </Button>
          ): (<div></div>)
        }
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete your team?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}> No </Button>
          <Button onClick={() =>handleDelete(project)} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      </div>
      );
}