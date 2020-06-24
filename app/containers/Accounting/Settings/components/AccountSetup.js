import React, { useReducer,useState,useContext,useEffect } from 'react';
import FinancialYearSetup from '../../Settings/components/FinancialYearSetup';
import BussinessActivity from '../../Settings/components/BussinessActivity';
import SetChartOfAccount from "../../Settings/components/SetChartOfAccount";
import * as Endpoints from '../../../../components/Endpoints';
import axios from "axios";
import 'date-fns';
export const AccSetupContext = React.createContext();



const AccountSetup = props => {

  const [credentials] = useState(JSON.parse(localStorage.getItem('user')))
  const [accessToken] = useState(localStorage.getItem('access_token'))

  useEffect(() => {
    async function getChatfromServer() {
      // You can await here
      //const response 
      //select uri
      const config = {
        headers: { Authorization: `Bearer ${props.accessToken}`,
        'Content-Type': 'application/json', }
    };
    
      await axios
      .get(`${Endpoints.GetAllChartOfAccountApi}/${credentials.organisation.orgId}`,
      config)
      .then((res) => {
        let chatData = res.data;
        //setIsEmpty(chatData.length > 0 ?false :true);
        //setchartOfAccountData(chatData)
        console.log(`Good ${chatData}`)
      })

      .catch((err) => {
        console.log(`error ocurr ${err}`);
      });
     
      // ...
    }
    getChatfromServer();
  },[]
  )

 
  const initialState = {
    financialYear:true,
    chatofAcc:false,
    busService:false,
    currentPage:'financialYear',
    orgId:'',
    payload: {}
}
const reducer = (state, action) => {
    switch (action.type) {
        case "NAVIGATION":
        state = {
          ...state,
          currentPage:action.page,
          [state.currentPage] :false,
          [action.page]:true,
        };
        return state;
        case "PAYLOAD":
        state = {
          ...state,
          payload: action.payload,
        };
        return state;
        default :
        return state;
    }
}

const [state, dispatch] = useReducer(reducer, initialState);

  console.log(`values  got it  -> `, state);

  
  return (
    <AccSetupContext.Provider
    value={{ accState: state, accDispatch: dispatch }}>
  <div>
   
    
       <div>
       {state.financialYear?
       <FinancialYearSetup credentials={credentials}/>
       :<div/>
       }
       </div>
        
        <div>
        {state.chatofAcc?
        <SetChartOfAccount/>
        :<div/>
        }
        </div>

        <div>
        {state.busService?
        <BussinessActivity credentials={credentials} accessToken={accessToken}/>
        :<div/>
        }
        </div>
        
        

  </div>
  </AccSetupContext.Provider>
  );
};

export default AccountSetup 