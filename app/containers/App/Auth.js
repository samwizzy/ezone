import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import * as Actions from './actions';
import * as AppSelectors from './selectors';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectAuthorizationPage from './../AuthorizationPage/selectors';
import saga from './../AuthorizationPage/saga';
import reducer from './reducer';

class Auth extends Component {
  constructor(props) {
		super(props);

    this.authCheck();
  }

  authCheck = () => {
		const {currentUser, accessToken} = this.props

		if (accessToken && currentUser) {

			this.props.getUserProfile({access_token: accessToken})

			/** Retrieve user data from Auth **/
			console.log(this.props.currentUser, 'currentUser');
		}

		console.log("i am already here")
  };

  render() {
    const { children } = this.props;

    return <React.Fragment>{children}</React.Fragment>;
  }
}

const mapStateToProps = createStructuredSelector({
	authorizationPage: makeSelectAuthorizationPage(),
  accessToken: AppSelectors.makeSelectAccessToken(),
  currentUser: AppSelectors.makeSelectCurrentUser(),
});

function mapDispatchToProps(dispatch){
	return bindActionCreators({
		logout: Actions.loginAction,
		getUserProfile: Actions.getUserProfileAction,
	},
	dispatch);
}

const withReducer = injectReducer({ key: 'authorizationPage', reducer });
const withSaga = injectSaga({ key: 'authorizationPage', saga });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
	withReducer,
	withSaga,
	withConnect,
)(Auth);
