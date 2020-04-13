import firebase from 'firebase/app';
import config from './firebaseServiceConfig';
import 'firebase/auth';
import 'firebase/database';
import '@firebase/messaging';
// import { AUTH_CONFIG } from '../auth0Service/auth0ServiceConfig';

class FirebaseService {
  init() {
    // if ( Object.entries(AUTH_CONFIG).length === 0 && AUTH_CONFIG.constructor === Object )
    // {
    //     if ( process.env.NODE_ENV === 'development' )
    //     {
    //         console.warn("Missing Firebase Configuration at src/app/services/firebaseService/firebaseServiceConfig.js");
    //     }
    //     return;
    // }

    if (firebase.apps.length) {
      return;
    }
    console.log('firebase come here');
    firebase.initializeApp(config);
    const messageing = firebase.messaging();
    messageing
      .requestPermission()
      .then(() => {
        console.log('have permission');
        return messageing.getToken();
      })
      .then(token => {
        console.log(token);
      })
      .catch(err => {
        console.log('error occur');
      });

    this.db = firebase.database();
    this.auth = firebase.auth();
  }

  createNewAdmin = data => {
    if (!firebase.apps.length) {
      return;
    }

    console.log(data, 'data from firebase');

    const { email, password } = data;

    firebase
      .auth()
      .fetchSignInMethodsForEmail(email)
      .then(providers => {
        console.log(providers.length, 'providers.length');
        // if providers.length === 0 that mean's the user is not available
        if (providers.length === 0) {
          this.createCompanyNode(data);
          this.auth
            .createUserWithEmailAndPassword(email, password)
            .catch(error => {
              // Handle Errors here.
              const errorCode = error.code;
              const errorMessage = error.message;
              // ...
              console.log(errorCode, 'errorCode');
              console.log(errorMessage, 'error.message');
            });
        } else {
          // has signed up
          console.log('nothing come heres');
        }
      });
  };

  createCompanyNode = data => {
    if (!firebase.apps.length) {
      return;
    }

    const { companyName } = data;
    const stripSpecialCharacter = companyName.replace(
      /[&\/\\#,+()$~%.'":*?<>{}]/g,
      '',
    );
    const stripWhiteSpace = stripSpecialCharacter.trim();

    console.log(stripWhiteSpace, 'stripWhiteSpace');

    this.db
      .ref()
      .child(stripWhiteSpace)
      .child('Users')
      .push({
        companyName: data.companyName,
        email: data.email,
        // name: `${data.firstname} ${data.lastname}`,
        // phoneNumber: companyName,
        timestamp: new Date().getTime(),
      });
  };
  //   getUserData = userId => {
  //     if (!firebase.apps.length) {
  //       return;
  //     }
  //     return new Promise((resolve, reject) => {
  //       this.db
  //         .ref(`users/${userId}`)
  //         .once('value')
  //         .then(snapshot => {
  //           const user = snapshot.val();
  //           resolve(user);
  //         });
  //     });
  //   };

  //   updateUserData = user => {
  //     if (!firebase.apps.length) {
  //       return;
  //     }
  //     return this.db.ref(`users/${user.uid}`).set(user);
  //   };

  onAuthStateChanged = callback => {
    if (!this.auth) {
      return;
    }
    this.auth.onAuthStateChanged(callback);
  };

  signOut = () => {
    if (!this.auth) {
      return;
    }
    this.auth.signOut();
  };
}

const instance = new FirebaseService();

export default instance;
