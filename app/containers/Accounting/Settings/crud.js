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

  //console.log(`payload b4 ${JSON.stringify(payload)}`)
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

      export async function getDeprecitionArea(){
        let credentials = JSON.parse(localStorage.getItem('user'))
        let accessToken = localStorage.getItem('access_token')
        const requestURL = `${Endpoints.GetDeprecitionAreaByOrgIdApi}?orgId=${credentials.organisation.orgId}`;
         const config = {
           headers: { Authorization: `Bearer ${accessToken}`,
           'Content-Type': 'application/json', }
       }

       return await axios.get(requestURL,config)
      .then(result => { console.log(result); return result; })
      .catch(error => { console.error(error); return Promise.reject(error); });

      }


      export async function addDeprecitionArea(value){
        let credentials = JSON.parse(localStorage.getItem('user'))
        let accessToken = localStorage.getItem('access_token')
        const requestURL = `${Endpoints.AddDeprecitionAreaApi}`;
         const config = {
           headers: { Authorization: `Bearer ${accessToken}`,
           'Content-Type': 'application/json', }
       }
       let payload ={...value,orgId:credentials.organisation.orgId}

       return await axios.post(requestURL,payload,config)
       .then(result => { console.log(result); return result; })
       .catch(error => { console.error(error); return Promise.reject(error); });

      }

      export async function saveDeprecitionType(value){
        let credentials = JSON.parse(localStorage.getItem('user'))
        let accessToken = localStorage.getItem('access_token')
        const requestURL = `${Endpoints.AddDeprecitionTypeApi}`;
         const config = {
           headers: { Authorization: `Bearer ${accessToken}`,
           'Content-Type': 'application/json', }
       }
       let payload ={...value,depreciatedValue:Number(value.depreciatedValue),percentageValue:Number(value.percentageValue),orgId:credentials.organisation.orgId}

       return await axios.post(requestURL,payload,config)
       .then(result => { console.log(result); return result; })
       .catch(error => { console.error(error); return Promise.reject(error); });

      }

      export async function saveTaxType(value){
        let credentials = JSON.parse(localStorage.getItem('user'))
        let accessToken = localStorage.getItem('access_token')
        const requestURL = `${Endpoints.AddTaxTypeApi}`;
         const config = {
           headers: { Authorization: `Bearer ${accessToken}`,
           'Content-Type': 'application/json', }
       }
       let payload ={...value,orgId:credentials.organisation.orgId}

       return await axios.post(requestURL,payload,config)
       .then(result => { console.log(result); return result; })
       .catch(error => { console.error(error); return Promise.reject(error); });

      }

      export async function updateTaxType(value){
        let credentials = JSON.parse(localStorage.getItem('user'))
        let accessToken = localStorage.getItem('access_token')
        const requestURL = `${Endpoints.UpdateTaxTypeApi}`;
         const config = {
           headers: { Authorization: `Bearer ${accessToken}`,
           'Content-Type': 'application/json', }
       }
       let payload ={...value,orgId:credentials.organisation.orgId}

       return await axios.put(requestURL,payload,config)
       .then(result => { console.log(result); return result; })
       .catch(error => { console.error(error); return Promise.reject(error); });

      }

      export async function getTaxType(){
        let credentials = JSON.parse(localStorage.getItem('user'))
        let accessToken = localStorage.getItem('access_token')
        const requestURL = `${Endpoints.GetTaxTypeByOrgIdApi}?orgId=${credentials.organisation.orgId}`;
         const config = {
           headers: { Authorization: `Bearer ${accessToken}`,
           'Content-Type': 'application/json', }
       }

       return await axios.get(requestURL,config)
      .then(result => { console.log(result); return result; })
      .catch(error => { console.error(error); return Promise.reject(error); });

      }

      export async function getCurrencies(){
        let credentials = JSON.parse(localStorage.getItem('user'))
        let accessToken = localStorage.getItem('access_token')
        const requestURL = `${Endpoints.GetCurrencyByIdApi}?orgId=${credentials.organisation.orgId}`;
         const config = {
           headers: { Authorization: `Bearer ${accessToken}`,
           'Content-Type': 'application/json', }
       }

       return await axios.get(requestURL,config)
      .then(result => { console.log(result); return result; })
      .catch(error => { console.error(error); return Promise.reject(error); });

      }

      
      export async function saveCurrencies(value){
        let credentials = JSON.parse(localStorage.getItem('user'))
        let accessToken = localStorage.getItem('access_token')
        const requestURL = `${Endpoints.CreateCurrencyApi}`;
         const config = {
           headers: { Authorization: `Bearer ${accessToken}`,
           'Content-Type': 'application/json', }
       }
       let payload ={...value,orgId:credentials.organisation.orgId,dateCreated:(new Date).toISOString()}
       //console.log(`Before saving.... ${JSON.stringify(payload)}`)
       return await axios.post(requestURL,payload,config)
       .then(result => { console.log(result); return result; })
       .catch(error => { console.error(error); return Promise.reject(error); });

      }

      export async function updateCurrency(value){
        let credentials = JSON.parse(localStorage.getItem('user'))
        let accessToken = localStorage.getItem('access_token')
        const requestURL = `${Endpoints.UpdateCurrencyApi}`;
         const config = {
           headers: { Authorization: `Bearer ${accessToken}`,
           'Content-Type': 'application/json', }
       }
       let payload ={...value,orgId:credentials.organisation.orgId}

       return await axios.put(requestURL,payload,config)
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

      export async function createAssetType(value){
        let credentials = JSON.parse(localStorage.getItem('user'))
        let accessToken = localStorage.getItem('access_token')
        const requestURL = `${Endpoints.CreateAssetTypeApi}`;
         const config = {
           headers: { Authorization: `Bearer ${accessToken}`,
           'Content-Type': 'application/json', }
       }
       let payload ={...value,orgId:credentials.organisation.orgId}

       return await axios.post(requestURL,payload,config)
       .then(result => { console.log(result); return result; })
       .catch(error => { console.error(error); return Promise.reject(error); });

      }

      export async function getAssetType(){
        let credentials = JSON.parse(localStorage.getItem('user'))
        let accessToken = localStorage.getItem('access_token')
        const requestURL = `${Endpoints.GetAssetTypeByOrgIdApi}?orgId=${credentials.organisation.orgId}`;
         const config = {
           headers: { Authorization: `Bearer ${accessToken}`,
           'Content-Type': 'application/json', }
       }

       return await axios.get(requestURL,config)
      .then(result => { console.log(result); return result; })
      .catch(error => { console.error(error); return Promise.reject(error); });

      }