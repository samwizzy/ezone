import React, { useReducer, useState, useContext, useEffect } from 'react';
import FinancialYearSetup from '../../Settings/components/FinancialYearSetup';
import BusinessActivity from '../../Settings/components/BusinessActivity';
import SetChartOfAccount from "../../Settings/components/SetChartOfAccount";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import * as Enums from '../enums';
import 'date-fns';
export const AccSetupContext = React.createContext();

const AccountSetup = props => {

  const [credentials] = useState(JSON.parse(localStorage.getItem('user')))
  const [accessToken] = useState(localStorage.getItem('access_token'))

  const initialState = {
    accountChart: Enums.AccountChart.DEFAULT,
    accountMethod: Enums.AccountMethod.ACCURAL,
    currency: "",
    dateCreated: "",
    dateUpdated: "",
    id: credentials.id,
    multiCurrency: false,
    orgId: credentials.organisation.orgId,
    startDay: 0,
    startMonth: 0,
    taxDay: 0,
    taxMonth: 0,
    taxType: "",
    msg: {
      open: false,
      message: '',
      severity: 'success'
    },
    businessActivity: "",
    financialYear: true,
    chatofAcc: false,
    busService: false,
    currentPage: 'financialYear',
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "NAVIGATION":
        state = {
          ...state,
          currentPage: action.page,
          [state.currentPage]: false,
          [action.page]: true,
        };
        return state;
      case "PAYLOAD":
        state = {
          ...state,
          [action.payload.label]: action.payload.value,
        };
        return state;
      case "SUBMIT":
        createAccountSetup()
        return state;
      case "MSG":
        state = {
          ...state,
          msg: {
            ...state.msg,
            open: action.msg.open,
            message: action.msg.message,
            severity: action.msg.severity
          }
        };
        return state;
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: 'MSG', msg: { open: false, message: '', severity: 'success' } });
  };

  console.log(`values  got it  -> `, state);

  return (
    <AccSetupContext.Provider
      value={{ accState: state, accDispatch: dispatch }}>
      <div>
        <div>
          <Snackbar anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }} open={state.msg.open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={state.msg.severity}>
              {state.msg.message}
            </Alert>
          </Snackbar>
        </div>

        <div>
          {state.financialYear ?
            <FinancialYearSetup />
            : <div />
          }
        </div>

        <div>
          {state.chatofAcc ?
            <SetChartOfAccount />
            : <div />
          }
        </div>

        <div>
          {state.busService ?
            <BusinessActivity credentials={credentials} accessToken={accessToken} />
            : <div />
          }
        </div>

      </div>
    </AccSetupContext.Provider>
  );
};

export default AccountSetup 