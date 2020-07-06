import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingIndicator from './../../components/LoadingIndicator';
import NewSaleOrder from './components/newsalesorder';
import NewShipment from './components/newshipment';
import SalesOrder from './components/salesorder';
import SalesOrderInvoice from './components/salesorderinvoice';
import Shipping from './components/shippment';
import { BrowserRouter as Router, Switch,useParams, Route } from "react-router-dom";
import ModuleLayout from './components/ModuleLayout';
const Sales = () => {
  const {id} = useParams();
    return ( 
    <div>
     <ModuleLayout>
     <Switch>
         {id === undefined?
         <Route exact path="/sales" component={NewSaleOrder} />
         :
         (
          <Route exact path={`/sales/${id}`} component={
            id === 'newsalesorder'?NewSaleOrder:(
              id==='newshippment'?NewShipment:(id=== 'salesorder'?SalesOrder:(
                id==='salesorderinvoice'?SalesOrderInvoice:(
                  Shipping
                    )
                  )
                )
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