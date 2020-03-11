import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';

import { DateModel } from '../AddBillModal/AddBillModal';
import { formatDate } from '../../utils';

const SimpleTable = styled(Table)`
  min-width: 650px;
`;

interface BillProps {
  data: DateModel[];
}

export default function Bills(props: BillProps) {
  const { data } = props;
  if (data.length === 0)
    return (
      <Box
        display="flex"
        width="100%"
        height="65vh"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h3">No expenses listed</Typography>
      </Box>
    );
  return (
    <TableContainer component={Paper}>
      <SimpleTable aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">#hashtags</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Amount({'\u20B9'})</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: DateModel, index: number) => (
            <TableRow key={index}>
              <TableCell align="center">{formatDate(row.date)}</TableCell>
              <TableCell align="center">{row.hashtags}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </SimpleTable>
    </TableContainer>
  );
}
