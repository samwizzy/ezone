import React, { useState,useEffect } from 'react';
import {
    BrowserRouter as Route,
    Switch,
    useParams,
    useRouteMatch,
  } from "react-router-dom";
import * as Endpoints from '../../components/Endpoints';
import axios from "axios";
import Dashboard from './Dashboard';
import AccountSetup from './Settings/components/AccountSetup';
/*import Reports from './Reports';
import Chart from './Chart';
import Journal from './Journal';
import Budget from './Budget';
import Banking from './Banking';
import Settings from './Settings';
import FixedAssets from './FixedAssets';*/
//import Payroll from './Payroll';
import  ModuleLayout from './components/ModuleLayout';

const Home = ({match}) => {
    const [accoutSetup,setAccountSetup] = useState({})
    const [credentials] = useState(JSON.parse(localStorage.getItem('user')))
    const [accessToken] = useState(localStorage.getItem('access_token'))
    console.log(`Path ${JSON.stringify(match)}`)

    useEffect(() => {
        async function getAccountingSetUp() {
            // You can await here
            //const response 
            //select uri
            const config = {
              headers: { Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json', }
          };
          
            await axios
            .get(`${Endpoints.GetAccountingSetupApi}/${credentials.organisation.orgId}`,
            config)
            .then((res) => {
              let accData = res.data;
              setAccountSetup(accData) 
            })
            .catch((err) => {
              console.log(`error ocurr ${err}`);
            });
           
            // ...
          }
          getAccountingSetUp(); 
          return () =>{
            getAccountingSetUp();   
          }
      }, []);

    /*
    
    { id: 1, name: 'Dashboard', url: '/account', icon: 'dashboard' },
      { id: 2, name: 'Chart of Account', url: '/account/chart', icon: 'account_tree' },
      { id: 3, name: 'Journal', url: '/account/journal', icon: 'menu_book' },
      { id: 4, name: 'Fixed Assets', url: '/account/fixedassets', icon: 'label' },
      { id: 5, name: 'Banking', url: '/account/banking', icon: 'group' },
      { id: 6, name: 'Payroll', url: '/account/payroll', icon: 'payment' },
      { id: 7, name: 'Reports', url: '/account/reports', icon: 'label' },
      { id: 8, name: 'Budgeting', url: '/account/budgeting', icon: 'account_balance_wallet' },
      { id: 9, name: 'Settings', url: '/account/settings', icon: 'settings' },

    */
    return ( 
        <div>
            <ModuleLayout>
         
           <Switch>
            
             <Route exact path={`${match.path}`}>
                {accoutSetup === null?
                 <AccountSetup/>
                 :
                 <Dashboard /> 
               }
            </Route>
              {/* <Route exact path={`${path}/reports`} component={Reports}/>
              
              <Route path={`${path}/chart`}>
               <Chart />
              </Route>
              <Route path={`${path}/journal`}>
               <Journal/>
              </Route>
              <Route path={`${path}/chart`}>
               <Chart />
              </Route>
              <Route path={`${path}/fixedasset`}>
               <FixedAssets/>
              </Route>
              <Route path={`${path}/banking`}>
               <Banking/>
              </Route>
              {/*<Route path={`${path}/payroll`}>
               <Payroll/>
            </Route>
              <Route path={`${path}/budgeting`}>
               <Budget/>
              </Route>
              <Route path={`${path}/settings`}>
               <Settings/>
              </Route>*/}
            </Switch>
            </ModuleLayout>
           
        </div>
     );
}
 
export default Home;