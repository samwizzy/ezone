import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import * as userActions from 'app/auth/store/actions';
// import { bindActionCreators } from 'redux';
// import * as Actions from 'app/store/actions';
import SockJS from 'sockjs-client';
import Stomp from 'webstomp-client';
import firebaseService from '../services/firebaseService';
// import stompService from '../services/Stomp/stomp';
import * as AppSelectors from '../containers/App/selectors';
// import auth0Service from 'app/services/auth0Service';
// import jwtService from 'app/services/jwtService';

class Auth extends Component {
  /* eslint-disable-next-line no-useless-constructor */
  constructor(props) {
    super(props);

    // this.firebaseCheck();

    this.StompConnect();
  }

  StompConnect = () => {
    console.log('request come here come'); 
    const socket = new SockJS(
      'https://dev.ezoneapps.com/gateway/utilityserv/messages',
    );
    const stompClient = Stomp.over(socket);
    stompClient.connect(
      {
        'X-Authorization': 'Bearer ' + `${this.props.accessToken}`,
        login: 'admin',
        passcode: 'admin',
      },
      frame => {
        const connected = true;
        console.log(frame, 'frame');
        stompClient.subscribe(`/queue/${this.props.currentUser.uuId}`, tick => {
          console.log(tick, 'tick');
          console.log(JSON.parse(tick.body), 'tick');
        });
      },
      error => {
        console.log(error);
        const connected = false;
      },
    );
  };

  firebaseCheck = () => {
    firebaseService.init();

    firebaseService.onAuthStateChanged(authUser => {
      if (authUser) {
        // this.props.showMessage({ message: 'Logging in with Firebase' });

        /**
         * Retrieve user data from Firebase
         */
        firebaseService.getUserData(authUser.uid).then(user => {
          console.log(user, 'user loard');
          //   this.props.setUserDataFirebase(user, authUser);

          //   this.props.showMessage({ message: 'Logged in with Firebase' });
        });
      }
    });
  };

  render() {
    const { children } = this.props;

    return <React.Fragment>{children}</React.Fragment>;
  }
}

const mapStateToProps = createStructuredSelector({
  accessToken: AppSelectors.makeSelectAccessToken(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
});

// function mapDispatchToProps(dispatch)
// {
//     return bindActionCreators({
//             logout             : userActions.logoutUser,
//             setUserData        : userActions.setUserData,
//             setUserDataAuth0   : userActions.setUserDataAuth0,
//             setUserDataFirebase: userActions.setUserDataFirebase,
//             showMessage        : Actions.showMessage,
//             hideMessage        : Actions.hideMessage
//         },
//         dispatch);
// }

// export default Auth;
export default connect(
  null,
  mapStateToProps,
)(Auth);
