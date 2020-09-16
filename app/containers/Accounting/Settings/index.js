/**
 *
 * Settings
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  BrowserRouter as Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import * as Actions from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import ModuleLayout from '../components/ModuleLayout';
//import LoadingIndicator from './../../../components/LoadingIndicator';
import CircularProgress from '@material-ui/core/CircularProgress';
import SettingsLayout from './components/SettingsLayout';
import AccountingPeriod from './components/AccountingPeriod';


export function Settings(props) {
  useInjectReducer({ key: 'settings', reducer });
  useInjectSaga({ key: 'settings', saga });

  //console.log('Settings index.js loaded');

  const { 
    loading,
    dispatchGetAccountingSetupAction,
    dispatchGetAllAccountingPeriodAction 
  } = props;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    let mounted = true
    if(mounted){
      dispatchGetAccountingSetupAction();
      dispatchGetAllAccountingPeriodAction();
    }
    return ()=>{
      mounted = false
    }
  }, []);

  //console.log(`Path from Settings -> `, props.path);


  if (loading) {
    return <div style={{textAlign:'center'}}><div style={{margin:'2px auto'}}><CircularProgress /></div></div>;
  }

  return (
    <div>
      <Helmet>
        <title>Settings</title>
        <meta name="description" content="Description of Settings." />
      </Helmet>
     
        <SettingsLayout path={props.path}/>
         {/* <AccountingPeriod />
        </SettingsLayout>*/}
      
    </div>
  );
}

Settings.propTypes = {

};

const mapStateToProps = createStructuredSelector({
  // loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetAccountingSetupAction: () => dispatch(Actions.getAccountingSetupAction()),
    dispatchGetAllAccountingPeriodAction: () => dispatch(Actions.getAllAccountingPeriodAction()),
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Settings);
