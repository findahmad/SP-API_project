var request = require('request');

var axios = require('axios');
var qs = require('qs');
var Crypto = require("crypto-js");
var strftime = require('strftime');
require('dotenv').config();

function sign(key, msg) {
    return Crypto.HmacSHA256(key, msg, {asBytes: true});
}

function getSignatureKey(key, dateStamp, regionName, serviceName) {
    var kDate = sign(dateStamp, 'AWS4' + key);
    var kRegion = sign(regionName, kDate);
    var kService = sign(serviceName, kRegion);
    var kSigning = sign('aws4_request', kService);
    console.log(kSigning);
    return kSigning;
}

function sha256(str) {
    return Crypto.SHA256(str);
}

// ************* REQUEST VALUES *************
var method = 'GET';
//var service = 'ec2';
//var host = 'ec2.amazonaws.com';
var host = 'sellingpartnerapi-na.amazon.com';
var service = 'execute-api';
var region = 'us-east-1';
var endpoint = 'https://sellingpartnerapi-na.amazon.com';
//var endpoint = 'https://ec2.amazonaws.com';
var request_parameters = 'Action=DescribeRegions&Version=2013-10-15';

var access_key = process.env.Access_Key;
var secret_key = process.env.Secret_Access_Key;

//var date = new Date();
var date = new Date(new Date().toUTCString())
var amzdate = strftime('%Y%m%dT%H%M%SZ', date);
//var amzdate = amzdate1.replace("20230204T14", '20230204T09');
console.log(amzdate);
var datestamp = strftime('%Y%m%d', date);

// ************* TASK 1: CREATE A CANONICAL REQUEST *************
var canonical_uri = '/';
var canonical_querystring = request_parameters;
var canonical_headers = 'host:' + host + '\n' + 'x-amz-date:' + amzdate + '\n';
//var canonical_headers = 'x-amz-date:' + amzdate + '\n';
var signed_headers = 'host;x-amz-date';

var payload_hash = sha256('');
var canonical_request = method + '\n' + canonical_uri + '\n' + canonical_querystring + '\n' + canonical_headers + '\n' + signed_headers + '\n' + payload_hash;

// ************* TASK 2: CREATE THE STRING TO SIGN*************
var algorithm = 'AWS4-HMAC-SHA256';
var credential_scope = datestamp + '/' + region + '/' + service + '/' + 'aws4_request';
var string_to_sign = algorithm + '\n' +  amzdate + '\n' +  credential_scope + '\n' +  sha256(canonical_request);

// ************* TASK 3: CALCULATE THE SIGNATURE *************
var signing_key = getSignatureKey(secret_key, datestamp, region, service);
var signature = sign(signing_key, string_to_sign);
console.log(signature);
// ************* TASK 4: ADD SIGNING INFORMATION TO THE REQUEST *************
var authorization_header = algorithm + ' ' + 'Credential=' + access_key + '/' + credential_scope + ', ' +  'SignedHeaders=' + signed_headers + ', ' + 'Signature=' + signature;
//var user_agent ='amazon-sp-api/0.8.1 (Language=Node.js/v16.16.0; Platform=Windows_NT/10.0.22000';
var headers = {'x-amz-date':amzdate, 'Authorization':authorization_header, host:host, 'x-amz-access-token':'Atza|IwEBINOmyEvTSZjngA9yWxRM9e533RTPSAdRgYLkaSvvsfjgwAi_xFv4p3rAZzCTwaolVnDgrDrtblbHNbX-5Pka9Qq2FXg-4aWtxbszpLCaX_YEvlAdET3YO9n0zn4xo0-NTjhxB1_3eSdT7wTaEP8o_ci6t1zI6PuA_YQBpcnQRXXzytZdMHFe1GGWlW_9tR2NRVfTtQG1SClQ0TlsAvhO53buhT6-ygXeB240pz6iiLz-9wOS39rA6IuZNjko5bQ0WKJKWdqfXcD8UHjEey79nLNmxZztF-a55pYKOBZT4h6ZKAK8GvEaZv3w5n3QWxRnMPWbUs6tlgCaxtpaLj6qiela' };

//var request_url = endpoint + '?' + canonical_querystring;
var request_url = endpoint + '/finances/v0/financialEvents?PostedAfter=2023-02-01T00:00:00.000Z'
console.log(headers);
var options = {
    method:'get',
    url: request_url,
    headers: headers
};

/*request(options, function(err, res) {
    console.log(res.body);
});*/
var axios = require('axios');
  var qs = require('qs');
  var data = qs.stringify({
     
  });
  
  var config ={
    method:'get',
    url: request_url,
    headers: headers,
    data:data
  }
  
  axios(config)
  .then(function (response) {
    
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
        console.log(error);
  });
  
console.log(headers);
console.log(request_url);

/*ALTER TABLE test1 ADD COLUMN id SERIAL PRIMARY KEY;


ALTER TABLE test 
ADD COLUMN id { int | bigint | smallint}
GENERATED { BY DEFAULT | ALWAYS } AS IDENTITY PRIMARY KEY;*/
//CONSTRAINT "Inventory_Batches_pkey" PRIMARY KEY ("Batch_Id")

//var credentials = require('./config.json');
/*var AWS = require("aws-sdk");
AWS.config.loadFromPath('./config.json');

AWS.config.getCredentials(function(err) {
  if (err) console.log(err.stack);
  // credentials not loaded
  else {
    console.log("Access key:", AWS.config.credentials.accessKeyId);
  }
});*/