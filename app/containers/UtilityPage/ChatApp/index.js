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
import * as Actions from './actions';
import makeSelectUtilityChats, * as Selectors from './selectors';
import saga from './saga';
import reducer from './reducer';
import ChatTab from './ChatTab';
import ChatBox from './ChatBox';
import ModuleLayout from '../components/ModuleLayout';

const key = "utilityChats";

const ChatsApp = props => {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { getAllUsersChat, getEmployees } = props;

  React.useEffect(() => {
    getEmployees();
    getAllUsersChat();
  }, []);

  return (
    <ModuleLayout>
      <ChatTab />
    </ModuleLayout>
  );
};

ChatsApp.propTypes = {
  getEmployees: PropTypes.func,
  getAllUsersChat: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  utilityChats: makeSelectUtilityChats(),
  loading: Selectors.makeSelectLoading(),
  chats: Selectors.makeSelectAllUsersChat(),
  allEmployees: Selectors.makeSelectEmployees(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEmployees: () => dispatch(Actions.getEmployees()),
    getAllUsersChat: () => dispatch(Actions.getAllUsersChat()),
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
