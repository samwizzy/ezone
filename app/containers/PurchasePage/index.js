import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import LoadingIndicator from './../../components/LoadingIndicator';
import NewPurchaseOrder from './components/newpurchaseorder';
import NewShipment from './components/newshipment';
import PurchaseOrder from './components/purchaseorder';
import PurchaseOrderInvoice from './components/purchaseorderinvoice';
import { BrowserRouter as Router, Switch,useParams, Route } from "react-router-dom";
import ModuleLayout from './components/ModuleLayout';
const Purchase = () => {
  const {id} = useParams();
    return ( 
    <div>
     <ModuleLayout>
     <Switch>
         {id === undefined?
         <Route exact path="/purchase" component={NewPurchaseOrder} />
         :
         (
          <Route exact path={`/purchase/${id}`} component={
            id === 'newpurchaseorder'?NewPurchaseOrder:(
              id==='newshippment'?NewShipment:(id=== 'purchaseorder'?PurchaseOrder:(
                id==='purchaseorderinvoice'?PurchaseOrderInvoice:(
                  NewPurchaseOrder
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
 
export default Purchase;