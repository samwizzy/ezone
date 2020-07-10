import * as Endpoints from '../../../components/Endpoints';
import axios from "axios";

export async function setUptins() {
    let credentials = JSON.parse(localStorage.getItem('user'))
     let accessToken = localStorage.getItem('access_token')
     const requestURL = `${Endpoints.GetAccountingSetupApi}/${credentials.organisation.orgId}`;
      const config = {
        headers: { Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json', }
    }
     
      return await axios.get(requestURL,config)
      .then(result => { console.log(result); return result; })
      .catch(error => { console.error(error); return Promise.reject(error); });
  
      }


      export async function getChatfromServer(){
        let credentials = JSON.parse(localStorage.getItem('user'))
        let accessToken = localStorage.getItem('access_token')
        const requestURL = `${Endpoints.GetAllChartOfAccountApi}/${credentials.organisation.orgId}`;
         const config = {
           headers: { Authorization: `Bearer ${accessToken}`,
           'Content-Type': 'application/json', }
       }

       return await axios.get(requestURL,config)
      .then(result => { console.log(result); return result; })
      .catch(error => { console.error(error); return Promise.reject(error); });

      }


      export async function createAccountSetup(values) {
      
     //let credentials = JSON.parse(localStorage.getItem('user'))
      let accessToken = localStorage.getItem('access_token')
     const requestURL = `${Endpoints.CreateAccountingSetupApi}`;
      const config = {
        headers: { Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json', }
    }

        let accountSetup =
        {
          accountChart: `${values.accountChart}`,
          accountMethod: `${values.accountMethod}`,
          currency: values.currency,
          dateCreated: `${(new Date).toISOString()}`,
          dateUpdated: "",
          id: `${values.id}`,
          multiCurrency: Boolean(values.multiCurrency),
          orgId: `${values.orgId}`,
          startDay: Number(values.startDay),
          startMonth: Number(values.startMonth),
          taxDay: 0,
          taxMonth: 0,
          taxType: "",
        }
        
    
        return await axios.post(requestURL,accountSetup,config)
       .then(result => { console.log(result); return result; })
       .catch(error => { console.error(error); return Promise.reject(error); });
    
        /*await axios.post(`${Endpoints.CreateAccountingSetupApi}`, accountSetup)
          .then((res) => {
            let chatResponse = res.data;
            if (chatResponse.success) {
              swal("Success", "Account opened successfully", "success");
    
            }
    
          })
    
          .catch((err) => {
            accContext.accDispatch({ type: 'MSG', msg: { open: true, message: 'Something went wrong. Please try again later', severity: 'error' } })
            console.log(`error ocurr ${err}`);
          });*/
    
      }