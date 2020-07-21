import * as Endpoints from '../../../components/Endpoints';
import axios from "axios";


export async function creatAccountingPeriod(value){
   let credentials = JSON.parse(localStorage.getItem('user'))
   let accessToken = localStorage.getItem('access_token')
   const requestURL = `${Endpoints.CreateAccountPeriodApi}`;
    const config = {
      headers: { Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json', }
  }
  let payload = {...value,orgId:credentials.organisation.orgId}
  return await axios.post(requestURL,payload,config)
  .then(result => { console.log(result); return result; })
  .catch(error => { console.error(error); return Promise.reject(error); });
}

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

      export async function getAccountingPeriods(){
        let credentials = JSON.parse(localStorage.getItem('user'))
        let accessToken = localStorage.getItem('access_token')
        const requestURL = `${Endpoints.GetAccountPeriodApi}/${credentials.organisation.orgId}`;
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
    
      }