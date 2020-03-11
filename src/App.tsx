import React, { Component } from 'react';
import styled from 'styled-components';
import { Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import ActionBar from './components/ActionBar/ActionBar';
import AddBillModal, {
  DateModel
} from './components/AddBillModal/AddBillModal';
import Bills from './components/Bills/Bills';
import Header from './components/Header/Header';
import SideNavigationBar, {
  Categories
} from './components/SideNavigationBar/SideNavigationBar';
import { database, auth, GAuthProvider } from './firebase';
import Theme, { appBackground } from './theme';
import { currentMonth, currentYear } from './utils';
import { User } from '@firebase/auth-types';
import { Unsubscribe } from '@firebase/util';
import Login from './components/Login/Login';
import FullPageLoader from './components/FullPageLoader/FullPageLoader';

const AppRoot = styled.div`
  display: flex;
  flex-direction: column;
  background: ${appBackground};
  height: 100vh;
`;

interface AppState {
  showNavBar: boolean;
  showAddBill: boolean;
  bills: DateModel[];
  categories: Categories;
  year: string;
  month: string;
  user: null | User;
  authComplete: boolean;
}

const addBill = (bill: DateModel): Promise<any> => {
  const date = new Date(bill.date);
  const updates = {};
  const year = date.getFullYear();
  const month = date.getMonth();
  if (!auth.currentUser || !auth.currentUser.uid) {
    throw new Error('Login first!');
  }
  const { uid } = auth.currentUser;
  const key = database.ref(`${year}/${month}/`).push().key;
  updates[`${uid}/${year}/${month}/${key}`] = bill;
  updates[`${uid}/categories/${year}/${month}`] = true;
  return database.ref().update(updates);
};

const fetchBills = (year: string, month: string): Promise<DateModel[]> => {
  return new Promise(resolve => {
    if (!auth.currentUser || !auth.currentUser.uid) {
      throw new Error('Login first!');
    }
    const { uid } = auth.currentUser;
    database.ref(`${uid}/${year}/${month}/`).once('value', snapshot => {
      const bills: DateModel[] = [];
      snapshot.forEach(item => void bills.push(item.val()));
      resolve(bills);
    });
  });
};

const fetchCategories = (): Promise<Categories> => {
  return new Promise(resolve => {
    if (!auth.currentUser || !auth.currentUser.uid) {
      throw new Error('Login first!');
    }
    const { uid } = auth.currentUser;
    database
      .ref(`${uid}/categories`)
      .once('value', snapshot => resolve(snapshot.val()));
  });
};

const totalExpense = (bills: DateModel[]): number =>
  bills.reduce((a: number, b: DateModel): number => a + Number(b.amount), 0);

const initialState: AppState = {
  showNavBar: false,
  showAddBill: false,
  bills: [],
  categories: {},
  year: currentYear,
  month: currentMonth,
  user: null,
  authComplete: false
};

class App extends Component<{}, AppState> {
  state: AppState = initialState;
  authListener: Unsubscribe | undefined;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(user => {
      if (user && user.uid) {
        this.setState({ user, authComplete: true });
        this.fetchSelectedBills(currentYear, currentMonth);
        this.fetchCategories();
      } else {
        this.setState({ user: null, authComplete: true });
      }
    });
  }

  fetchSelectedBills = (year: string, month: string) => {
    fetchBills(year, month).then((bills: DateModel[]) =>
      this.setState({ bills, year, month })
    );
  };

  fetchCategories = () => {
    fetchCategories().then(categories => this.setState({ categories }));
  };

  toggleAddBill = () =>
    this.setState(prev => ({ showAddBill: !prev.showAddBill }));
  toggleNavBar = () =>
    this.setState(prev => ({ showNavBar: !prev.showNavBar }));

  onNewBill = async (billData: DateModel) => {
    await addBill(billData);
    this.setState(prev => ({
      bills: prev.bills.concat(billData),
      showAddBill: false
    }));
  };

  login = () => {
    auth.signInWithPopup(new GAuthProvider()).then(result => {
      this.setState({ user: result.user, authComplete: true });
    }, console.log);
  };

  logout = () => {
    auth.signOut().then(() => this.setState({ ...initialState }));
  };

  render() {
    const {
      showAddBill,
      bills,
      showNavBar,
      categories,
      month,
      year,
      user,
      authComplete
    } = this.state;

    if (!authComplete) {
      return <FullPageLoader />;
    }

    if (user === null) {
      return (
        <AppRoot>
          <ThemeProvider theme={Theme}>
            <CssBaseline />
            <Login onLogin={this.login} />
          </ThemeProvider>
        </AppRoot>
      );
    }

    return (
      <AppRoot>
        <ThemeProvider theme={Theme}>
          <CssBaseline />
          <Header toggleNavBar={this.toggleNavBar} logout={this.logout} />
          <SideNavigationBar
            open={showNavBar}
            toggleNavBar={this.toggleNavBar}
            categories={categories || {}}
            fetchSelectedBills={this.fetchSelectedBills}
          />
          <Container>
            <AddBillModal
              open={showAddBill}
              onClose={this.toggleAddBill}
              onNewBill={this.onNewBill}
            />
            <ActionBar
              onNewBill={this.toggleAddBill}
              total={totalExpense(bills)}
              month={month}
              year={year}
            />
            <Bills data={bills} />
          </Container>
        </ThemeProvider>
      </AppRoot>
    );
  }
}

export default App;
