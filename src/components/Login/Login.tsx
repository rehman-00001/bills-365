import React from 'react';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

interface LoginProps {
  onLogin(): void;
}

const Login: React.FC<LoginProps> = props => {
  const { onLogin } = props;
  return (
    <Box
      display="flex"
      width="100vw"
      height="100vh"
      justifyContent="flex-start"
      alignItems="center"
      flexDirection="column"
    >
      <Box marginTop="120px">
        <Typography variant="h2">Bill Tracker 365</Typography>
      </Box>
      <Box marginTop="80px">
        <Button variant="contained" color="primary" onClick={onLogin}>
          Sign in using Gmail
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
