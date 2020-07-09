export async function setUptins() {
    let credentials = JSON.parse(localStorage.getItem('user'))
     let accessToken = localStorage.getItem('access_token')
     const requestURL = `${Endpoints.GetAccountingSetupApi}/${credentials.organisation.orgId}`;
      const config = {
        headers: { Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json', }
    }
     
      await axios.get(requestURL,config)
       .then((res) => {
            let chatOfAccResponse = res.data;
            return chatOfAccResponse;
          })
    
          .catch((err) => {
            //console.log(`error ocurr in Chart of Account ${err}`);
            return null;
          });
  
      }