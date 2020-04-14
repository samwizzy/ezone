import firebase from 'firebase/app';
import config from './firebaseServiceConfig';
import 'firebase/auth';
import 'firebase/database';
import '@firebase/messaging';

class FirebaseService {
  init() {
    if (firebase.apps.length) {
      return;
    }
    firebase.initializeApp(config);
    const messageing = firebase.messaging();
    messageing
      .requestPermission()
      .then(() => {
        return messageing.getToken();
      })
      .then(token => {
        console.log(token);
      })
      .catch(err => {
        console.log('error occur');
      });

      console.log('come to message outside');
      messageing.onMessage(function(payload) {
        console.log('come to message inside');
        console.log("Message received. ", payload);
      });

    this.db = firebase.database();
    this.auth = firebase.auth();
  }

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
