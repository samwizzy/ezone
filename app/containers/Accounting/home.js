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
import Settings from './Settings/index';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import  ModuleLayout from './components/ModuleLayout';
import LoadingIndicator from '../../components/LoadingIndicator';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    alignContent:'center'
  },
}));

const Home = () => {
  const {path} = useRouteMatch()
  const classes = useStyles();
    const [accoutSetup,setAccountSetup] = useState({})
    const [credentials] = useState(JSON.parse(localStorage.getItem('user')))
    const [accessToken] = useState(localStorage.getItem('access_token'))
    const [loader,setloader] =useState(true);

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
              setloader(false);
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

    return ( 
        <div>
            <ModuleLayout>
         
           <Switch>

           <Route exact path={path}>
              {loader?
               (
                <div>
                <div style={{textAlign:'center'}}><div style={{margin:'2px auto'}}><CircularProgress /></div></div>
              </div>
               )
              :
                (accoutSetup === null?<AccountSetup/>:((`${path}`).indexOf('settings')>0 ?<Settings path={path}/>:<Dashboard/>))
               }
            </Route>
           
            </Switch>
            </ModuleLayout>
           
        </div>
     );
}
 
export default Home;