import React, { memo, useEffect,useContext,useReducer } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Actions from './actions';
import * as Selectors from './selectors';
import LoadingIndicator from './../../../components/LoadingIndicator';
import ModuleLayout from '../components/ModuleLayout';
import AccountChart from '../Chart/components/AccountChart';
import CircularProgress from '@material-ui/core/CircularProgress';
export const ChartContext = React.createContext();


const Chart = props => {
  useInjectReducer({ key: 'chart', reducer });
  useInjectSaga({ key: 'chart', saga });

  console.log('Chart index.js loaded');

  const {
    loading,
    dispatchGetAllChartOfAccountTypeAction,
    dispatchGetAllAccountTypeAction,
  } = props;

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    dispatchGetAllChartOfAccountTypeAction();
    dispatchGetAllAccountTypeAction();
    return () => {
      dispatchGetAllChartOfAccountTypeAction();
      dispatchGetAllAccountTypeAction();
    }
  }, []);


  const initialState ={
   payload: [],
   viewId:'',
   refresh:true,
  }

  const payloadReducers = (state, action) => {
   switch(action.type){
     case 'PAYLOAD':
       state ={
         ...state,
         payload:action.payload
       }
       return state;
     case 'VIEW_ID':
       state ={
         ...state,
         viewId:action.id
       } 
       return state
       case 'REFRESH':
       state ={
         ...state,
         refresh:action.refresh
       } 
       return state
       default:
         return state;
   }

  }

  const [state, dispatch] = useReducer(payloadReducers, initialState);


  if (loading) {
    return <div style={{textAlign:'center'}}><div style={{margin:'2px auto'}}><CircularProgress /></div></div>;
  }

  return (
      <ModuleLayout>
        <ChartContext.Provider
    value={{chartState: state, chartDispatch: dispatch }}>
       <AccountChart />
    </ChartContext.Provider>
        
      </ModuleLayout>
  );
};

Chart.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatchGetAllChartOfAccountTypeAction: () => dispatch(Actions.getAllChartOfAccountTypeAction()),
    dispatchGetAllAccountTypeAction: () => dispatch(Actions.getAllAccountTypeAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Chart);
