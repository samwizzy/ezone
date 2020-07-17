import axios from "axios";
import * as Endpoints from '../../../components/Endpoints';

export async function createChartOfAccountHandler(values) {
  // let credentials = JSON.parse(localStorage.getItem('user'))
  let accessToken = localStorage.getItem('access_token')
  const requestURL = `${Endpoints.CreateChartOfAccountApi}`;
  const config = {
    headers: { Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json', }
  };

  console.log(`from crud ${JSON.stringify(values)}`)
  
  let postValue;
  if(values.parentId === null){
    if(values.accountTypeId === 14){
      postValue = {
        accountCode: values.accountCode,
        accountName: values.accountName,
        accountNumber: values.accountNumber,
        accountTypeId: values.accountTypeId,
        bankBalance: Number(values.bankBalance),
        bankName: values.bankName,
        description: values.description,
        openingBalance: Number(values.openingBalance),
        orgId: values.orgId,
        rate: 0,
        status: true
      }
    }
    else{
      postValue = {
        accountCode: values.accountCode,
        accountName: values.accountName,
        accountTypeId: values.accountTypeId,
        description: values.description,
        openingBalance: Number(values.openingBalance),
        orgId: values.orgId,
        rate: 0,
        status: true
      }
    }
 
  }
  else{
    postValue = {
      accountCode: values.accountCode,
      accountName: values.accountName,
      accountTypeId: values.accountTypeId,
      description: values.description,
      openingBalance: Number(values.openingBalance),
      orgId: values.orgId,
      parentId:values.parentId,
      rate: 0,
      status: true
    }
}

  return await axios.post(requestURL,postValue,config)
    .then(result => { console.log(result); return result; })
    .catch(error => { console.error(error); return Promise.reject(error); });
  
}

export async function updateChartOfAccount(values) {
  // let credentials = JSON.parse(localStorage.getItem('user'))
  let accessToken = localStorage.getItem('access_token')
  const requestURL = `${Endpoints.UpdateChartOfAccountAp}`;
  const config = {
    headers: { Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json', }
  };
  let postValue= values;
  postValue = {...postValue,openingBalance:Number(values.openingBalance)}

  return await axios.put(requestURL,postValue,config)
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

export async function getAllAccountTypeFSever() {
  // let credentials = JSON.parse(localStorage.getItem('user'))
  let accessToken = localStorage.getItem('access_token')
  const requestURL = `${Endpoints.GetAllAccountTypeApi}`;
  const config = {
    headers: { Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json', }
  };

  return await axios.get(requestURL,config)
    .then(result => { console.log(result); return result; })
    .catch(error => { console.error(error); return Promise.reject(error); });
}

export async function createAccountSetup(values) {
  // let credentials = JSON.parse(localStorage.getItem('user'))
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
    dateCreated: `${new Date().toISOString()}`,
    dateUpdated: '',
    id: `${values.id}`,
    multiCurrency: Boolean(values.multiCurrency),
    orgId: `${values.orgId}`,
    startDay: Number(values.startDay),
    startMonth: Number(values.startMonth),
    taxDay: 0,
    taxMonth: 0,
    taxType: '',
  };

  return await axios
    .post(requestURL, accountSetup, config)
    .then(result => { console.log(result); return result; })
    .catch(error => { console.error(error); return Promise.reject(error); });

  /* await axios.post(`${Endpoints.CreateAccountingSetupApi}`, accountSetup)
          .then((res) => {
            let chatResponse = res.data;
            if (chatResponse.success) {
              swal("Success", "Account opened successfully", "success");
    
            }
    
          })
    
          .catch((err) => {
            accContext.accDispatch({ type: 'MSG', msg: { open: true, message: 'Something went wrong. Please try again later', severity: 'error' } })
            console.log(`error ocurr ${err}`);
          }); */
}
