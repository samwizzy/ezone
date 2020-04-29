import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import LoadingIndicator from '../../../components/LoadingIndicator';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import saga from '../saga';
import reducer from '../reducer';
import ChatTab from './ChatTab';
import ChatBox from './ChatBox';
import ModuleLayout from '../components/ModuleLayout';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

const ChatsApp = props => {
  useInjectReducer({ key: 'utilityPage', reducer });
  useInjectSaga({ key: 'utilityPage', saga });

  const classes = useStyles();
  // const { dispatchGetUserChats, dispatchGetAllEmployees } = props;

  // React.useEffect(() => {
  //   dispatchGetAllEmployees();
  //   dispatchGetUserChats();
  // }, []);

  return (
    <ModuleLayout>
      <ChatTab />
    </ModuleLayout>
  );
};

ChatsApp.propTypes = {
  // dispatchGetAllEmployees: PropTypes.func,
  // dispatchGetUserChats: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
  chats: Selectors.makeSelectAllUsersChat(),
  allEmployees: Selectors.makeSelectAllEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    // dispatchGetAllEmployees: () => dispatch(Actions.getAllUsers()),
    // dispatchGetUserChats: () => dispatch(Actions.getAllUsersChat()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  memo,
)(ChatsApp);