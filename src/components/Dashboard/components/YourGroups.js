import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const YourGroups = ({yourGroups}) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Joined</TableCell>
            <TableCell>Members</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        {yourGroups && yourGroups.length > 0 ? 
          <TableBody>
          {yourGroups.map((row) => (
            <TableRow key={row.name}>   
              <TableCell>{row.group.name}</TableCell>
              <TableCell>{row.group.createdAt}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
          </TableBody>: 
          <div className='empty-state'>You haven't created or joined any groups yet.</div>
        }        
      </Table>
    </TableContainer>
  );
};

export default YourGroups;
