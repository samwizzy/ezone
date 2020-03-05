import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import LoadingIndicator from '../../../components/LoadingIndicator';
import * as Actions from '../actions';
import * as Selectors from '../selectors';
import saga from './../saga';
import reducer from './../reducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import ChatTab from './ChatTab'
import DashboardLayout from '../components/DashboardLayout' 

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  }
}));

const ChatsApp = props => {
    useInjectReducer({ key: 'utilityPage', reducer });
    useInjectSaga({ key: 'utilityPage', saga });

    const classes = useStyles();
    const { loading, chats, match } = props;
    const { params } = match

    React.useEffect(() => {
      // getUtilityChats()
    }, []);

    return (
        <DashboardLayout>
            <ChatTab />
        </DashboardLayout>
    );
};

ChatsApp.propTypes = {
  loading: PropTypes.bool,
  chats: PropTypes.array,
  // getUtilityChats: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    loading: Selectors.makeSelectLoading(),
    chats: Selectors.makeSelectAllUsersChat(),
});

function mapDispatchToProps(dispatch) {
  return {
    // getUtilityChats: ev => dispatch(() => {}),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default withRouter(
  compose(
    withConnect,
    memo,
)(ChatsApp));
