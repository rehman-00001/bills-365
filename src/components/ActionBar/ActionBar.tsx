import { Box, Fab, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import React from 'react';
import styled from 'styled-components';
import { MonthLabels } from '../../utils';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const TotalAmount = styled(Typography)`
  font-weight: bold;
  padding: 0 16px;
`;

interface ActionBarProps {
  total: number;
  onNewBill: React.MouseEventHandler;
  month: string;
  year: string;
}

const ActionBar: React.FC<ActionBarProps> = props => {
  const { total, onNewBill, month, year } = props;
  const isMobile = useMediaQuery('(max-width:760px)');
  return (
    <Box
      m={3}
      component="span"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
    >
      <Box display="flex" alignItems="center">
        <Typography variant="h6">{`${MonthLabels[month]} ${year} : `}</Typography>
        <TotalAmount color="primary" variant="h5">
          {`\u20B9${total}`}
        </TotalAmount>
      </Box>
      {isMobile ? (
        <Fab color="primary" size="medium" onClick={onNewBill}>
          <AddIcon />
        </Fab>
      ) : (
        <Fab
          color="primary"
          variant="extended"
          size="large"
          onClick={onNewBill}
        >
          <AddIcon />
          New Bill
        </Fab>
      )}
    </Box>
  );
};

export default ActionBar;
