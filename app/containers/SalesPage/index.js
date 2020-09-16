import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingIndicator from './../../components/LoadingIndicator';
import Saless from './sales';
import { BrowserRouter as Router, Switch,useParams, Route } from "react-router-dom";
import Invoices from './invoices/index.js';
import ModuleLayout from './components/ModuleLayout';

const Sales = () => {
  const {id} = useParams();
    return ( 
    <div>
     <ModuleLayout>
     <Switch>
         {id === undefined?
         <Route exact path="/sales" component={Saless} />
         :
         (
          <Route exact path={`/sales/${id}`} component={
            id === 'invoices'?Invoices:(
              Invoices
              )
              
          } />
         )
         }
        </Switch>
    </ModuleLayout>
    </div>
     );
}
 
export default Sales;