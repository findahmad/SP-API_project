const Token = require('./AccessTokenCreation.js');
//let token = getToken.replace(/['"]+/g, '');

async function GetFinancialEventsData(){
  var axios = require('axios');
  var qs = require('qs');
  var data = qs.stringify({
     
  });
  var config = {
    method: 'get',
    url: 'https://sellingpartnerapi-na.amazon.com/finances/v0/financialEvents?PostedAfter=2023-02-06T00:00:00.000Z',
    headers: { 
      'x-amz-access-token': 'Atza|IwEBIN0-wixV-TSIxzg99DfKvtn4ZiikaoKHhFFF8qs-kw5KGasl7GBSI2840RHoZHQRsB2Pw8cgziTE4WSgRvzVCyNAIYATPqV5Fa7UFOj80UVezDFQ6yYHiF3fb7JsRMPa90XfA0C3Q_9185RLQh6FcYw4g93j5Ks_6uQQ5dCXceITgbSxvjl7GJteOeeXJB1cGE6X4Lkvv6-GnxmZTKDOfRcwViVRQensc6DDJb8YB25pPvSIuiNnaCra0chWREUbPkxUZ3fwItpRPXk8yfg5DKZloMoZJHX41OfQDAPBldvRaoyPRwSeHb1Nq0-2jbdnAH28a1OtHlHD1VsAdnBD-yBs', 
      'X-Amz-Date': '20230207T072854Z', 
      'Authorization': 'AWS4-HMAC-SHA256 Credential=AKIARUJCYFCSRJSC6UF6/20230207/us-east-1/execute-api/aws4_request, SignedHeaders=host;x-amz-access-token;x-amz-date, Signature=5bedb5fbf4e9536a4ca7aafe5a7e4f6e8a65cfb8b638123fa58243e6631d6137'
    },
    data: data
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(error=> {
      console.log(error);
  })
}
  
GetFinancialEventsData();