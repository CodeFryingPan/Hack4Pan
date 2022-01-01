import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";

import Image from 'next/image';

import withStyles from '@mui/styles/withStyles';

import { handleKick } from '../../../../util/apiclient';

import styles from "./Dashboard.module.css";

const Dashboard = ({members, user, project}) => {
     
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

    return (
        <div className={styles.container}>
            <div style={{backgroundColor:'#0F0E0E', color: 'white', width: '100%'}}>
                <h3 > Members </h3>
            </div>
            <TableContainer component={Paper} className={styles.tableContainer}>
                <Table aria-label="simple table"  className={styles.table}>
                    <TableHead>
                        <TableRow style={{backgroundColor: '#0F0E0E', color: 'white',}}>
                            <TableCell align="left" > </TableCell>
                            <TableCell align="left"> 
                                <WhiteTextTypography>
                                    Discord Tag 
                                </WhiteTextTypography>
                            </TableCell>
                            <TableCell align="center">
                                <WhiteTextTypography>
                                UID
                                </WhiteTextTypography>
                            </TableCell>
                            <TableCell align="right">
                            </TableCell>
                            <TableCell align="right">
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {members.map((member) => (
                        <TableRow 
                            key={member.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            style={{backgroundColor:'#0F0E0E', color: 'white',}}
                        >
                            <TableCell align="left" component="th" scope="row">
                                <Image src={member.image}   width={50} height={50} />
                            </TableCell>
                            <TableCell align="left" component="th" scope="row">
                                <WhiteTextTypography>
                                    {member.tag}
                                </WhiteTextTypography>
                            </TableCell>
                            <TableCell align="center">
                                <WhiteTextTypography>
                                    {member.uid}
                                </WhiteTextTypography>
                            </TableCell>
                            <TableCell align="right" component="th" scope="row">
                            {
                                project.leader == member.uid && (
                                <WhiteTextTypography component="p"> 
                                    LEADER 
                                </WhiteTextTypography>)
                            }
                            </TableCell>
                            <TableCell align="right">
                                { (project.leader == user.uid && member.uid != project.leader &&
                                    <IconButton id={member.uid} onClick={(e) => handleKick(e, member.uid, project)}  variant="contained">
                                        <RedTextTypography>
                                            KICK
                                        </RedTextTypography>
                                    </IconButton> )
                                }
                            </TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Dashboard;