import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import * as React from 'react';
import styled from 'styled-components';

const TitleLabel = styled(Typography)`
  flex-grow: 1;
  text-align: center;
  font-size: 1.3rem;
`;

const LogoutButton = styled(Button)`
  && {
    margin-right: 100px;
  }
`;

interface Props {
  toggleNavBar: React.MouseEventHandler;
  logout: React.MouseEventHandler;
}

const Header: React.FC<Props> = props => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={props.toggleNavBar}
        >
          <MenuIcon />
        </IconButton>
        <TitleLabel variant="h6">Bills 365</TitleLabel>
        <LogoutButton color="inherit" onClick={props.logout}>
          Logout
        </LogoutButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
