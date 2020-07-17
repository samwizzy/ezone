import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingIndicator from './../../components/LoadingIndicator';
import Purchases from './purchase';
import { BrowserRouter as Router, Switch,useParams, Route } from "react-router-dom";
import ModuleLayout from './components/ModuleLayout';

const Purchase = () => {
  const {id} = useParams();
    return ( 
    <div>
     <ModuleLayout>
     <Switch>
         {id === undefined?
         <Route exact path="/purchase" component={Purchases} />
         :
         (
          <Route exact path={`/purchase/${id}`} component={
            id === 'bill'?Purchases:(
              Purchases
              )
              
          } />
         )
         }
        </Switch>
    </ModuleLayout>
    </div>
     );
}
 
export default Purchase;