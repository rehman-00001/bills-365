import { createStyles, Drawer, makeStyles, Theme } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import styled from 'styled-components';

import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CalendarToday from '@material-ui/icons/DateRange';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { MonthLabels, currentYear } from '../../utils';
import { appBackground } from '../../theme';

const drawerWidth = 275;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerPaper: {
      width: drawerWidth,
      background: appBackground
    }
  })
);

const AppTitle = styled(Paper)`
  padding: 12px;
  margin: 18px;
`;

const SideDrawer = styled(Drawer)`
  width: ${drawerWidth};
  flex-shrink: 0;
`;

type Category = {
  [month: string]: boolean;
};

export interface Categories {
  [year: string]: Category;
}

export interface Collapsed {
  [year: string]: boolean;
}

interface Props {
  open?: boolean;
  categories: Categories;
  toggleNavBar: React.MouseEventHandler;
  fetchSelectedBills(year: string, month: string): void;
}

const SideNavigationBar: React.FC<Props> = props => {
  const { open, toggleNavBar, categories, fetchSelectedBills } = props;
  const classes = useStyles();
  const [collapsed, setCollapsed] = useState({});
  const years = Object.keys(categories);
  const toggleYear = (year: string) =>
    setCollapsed({
      ...collapsed,
      [year]: !collapsed[year]
    });

  return (
    <SideDrawer
      open={open}
      classes={{ paper: classes.drawerPaper }}
      onClose={toggleNavBar}
    >
      <AppTitle>
        <Typography>Select month</Typography>
      </AppTitle>
      <List component="nav" aria-labelledby="nested-list-subheader">
        {years.map((year: string) => (
          <Fragment>
            <ListItem button onClick={() => toggleYear(year)}>
              <ListItemIcon>
                <CalendarToday />
              </ListItemIcon>
              <ListItemText primary={year} />
              {year !== currentYear &&
                (collapsed[year] ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>
            <Collapse
              in={collapsed[year] || year === currentYear}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {Object.keys(categories[year]).map(month => (
                  <ListItem
                    key={month}
                    button
                    onClick={() => fetchSelectedBills(year, month)}
                  >
                    <ListItemText inset primary={MonthLabels[month]} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </Fragment>
        ))}
      </List>
    </SideDrawer>
  );
};

export default SideNavigationBar;
