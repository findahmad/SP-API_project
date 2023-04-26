var axios = require('axios');
var qs = require('qs');
require('dotenv').config();
let _token ='';

/*******  Method to generate Access Token ********/

async function getToken() {
  try {   
        var data = qs.stringify({
            'grant_type': 'refresh_token',
            'refresh_token': process.env.RefreshToken,
            'client_id': process.env.Client_Identifier,
            'client_secret': process.env.Client_Secret
        });

        var config = {
          method:'post',
          url: 'https://api.amazon.com/auth/o2/token',
          headers: { 
              'Content-Type': 'application/x-www-form-urlencoded'
         },
         data:data
        };

       await axios(config)
      .then(async(response) => {
           let token = await JSON.stringify(response.data.access_token);
           console.log(token);
           _token = token;
      })
      .catch((error) => {
        console.log(error.message);
      })
    }
    catch(err){
      console.log('Token Error: ', err.message);
    }
    return _token;
}
getToken();
module.exports = {getToken}