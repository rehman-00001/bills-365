import React from 'react';
import styled, { keyframes } from 'styled-components';

import { appBackground } from '../../theme';
import logo from '../../logo.svg';
import { Typography } from '@material-ui/core';

const LoaderRoot = styled.div`
  text-align: center;
`;

const LoaderContainer = styled.div`
  background-color: ${appBackground};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.img`
  height: 40vmin;
  pointer-events: none;
  animation: ${rotateAnimation} infinite 6s linear;
`;

const LoaderLabel = styled(Typography)`
  color: black;
`;

const FullPageLoader: React.FC = () => {
  return (
    <LoaderRoot>
      <LoaderContainer>
        <Spinner src={logo} alt="logo" />
        <LoaderLabel variant="h4">Loading...</LoaderLabel>
      </LoaderContainer>
    </LoaderRoot>
  );
};

export default FullPageLoader;
