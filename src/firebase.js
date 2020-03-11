import config from './config/firebase-config';

import firebaseApp from '@firebase/app';
import '@firebase/database';
import '@firebase/auth';

const app = firebaseApp.initializeApp(config);

const database = app.database();

const auth = app.auth();

const GAuthProvider = firebaseApp.auth.GoogleAuthProvider;

export { database, auth, GAuthProvider };
