/**
 *
 * Accounting
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { BrowserRouter as Router, Switch,useParams, Route,useRouteMatch } from "react-router-dom";
import reducer from './reducer';
import saga from './saga';
import * as crud from './crud';
import * as Actions from './actions';
import makeSelectAccounting, * as Selectors from './selectors';
import Charts from './Chart/Loadable';
import Reports from './Reports/index';
import Home from './home';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingIndicator from "../../components/LoadingIndicator";
import ModuleLayout from './components/ModuleLayout';
import Journal from './Journal';
import AddNewJournal from './Journal/components/AddNewJournal';
import JournalDetails from './Journal/components/JournalDetails';
import axios from 'axios';
import Budget from './Budget';
import BudgetingDetails from './Budget/components/BudgetingDetails';
import NewBudgeting from './Budget/components/NewBudgeting';
import Banking from './Banking';
import AccountDetails from './Banking/components/AccountDetails';
import DetailsOfAccountChat from './Chart/components/DetailsOfAccountChart';
import FixedAssets from './FixedAssets/index';

export function Accounting(props) {
  const { id, name } = useParams();
  const param = useParams();
  useInjectReducer({ key: 'accounting', reducer });
  useInjectSaga({ key: 'accounting', saga });
  console.log(
    `Accounting index.js loaded ${id} ${name}  ${JSON.stringify(param)}`,
  );

  const { loading } = props;

  useEffect(() => {
    async function dataCall() {
      await crud.setUptins().then(data=>{
          console.log(`What a data ${JSON.stringify(data.data)}`);
        })
        .catch(err => {
          console.log(`Error from setUptins ${err}`);
        });
    }

    dataCall();
  }, []);
  // Similar to componentDidMount and componentDidUpdate:

  // Routing based on api response
  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div>
      <Switch>
        {id === undefined?
          <Route exact path="/account" component={Home} />
          :
          (
            name === undefined?
              (<Route
exact path={`/account/${id}`} component={
                id === 'reports'?Reports:(
                  id==='charts'?Charts:(id=== 'journal'?Journal:(
                    id==='fixedassets'?FixedAssets:(
                      id==='banking'?Banking:((id==='budgeting'?Budget:
                          (id==='settings'?Home:(id === 'fixedassets'?FixedAssets:Home)
                        )
                      )
                      )
                    )
                  ))
                )
              } />)
              :
              (
            
                
                <Route exact path={`/account/${id}/${name}`} component={
                 name === 'add'?(id==='budgeting'?NewBudgeting:AddNewJournal): (id === 'journal'?JournalDetails:
                 (id === 'charts'?DetailsOfAccountChat:(id ==='budgeting'?BudgetingDetails:AccountDetails)))
                }/>
                
               
              
           
              )
          )
        }
      </Switch>
    </div>
  );
}

Accounting.propTypes = {};

const mapStateToProps = createStructuredSelector({
  loading: Selectors.makeSelectLoading(),
});

const withConnect = connect(mapStateToProps);

export default compose(
  withConnect,
  memo,
)(Accounting);
