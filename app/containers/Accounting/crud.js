import * as Endpoints from '../../components/Endpoints';
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