require('dotenv').config();
const SellingPartnerAPI = require('amazon-sp-api');
const getDate = require('./Date.js');
let Financial_EventsData='';

async function getFinancialEvents() {
    try {
      let sellingPartner = new SellingPartnerAPI({
        region: "na",
        refresh_token: process.env.RefreshToken,
        credentials: {
          "SELLING_PARTNER_APP_CLIENT_ID": process.env.Client_Identifier,
          "SELLING_PARTNER_APP_CLIENT_SECRET": process.env.Client_Secret,
          "AWS_ACCESS_KEY_ID": "AKIARUJCYFCSXQBAEAYD",
          "AWS_SECRET_ACCESS_KEY": "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",
          "AWS_SELLING_PARTNER_ROLE": "arn:aws:iam::112278907045:role/analytics-spapi-role"
        }
      });

        let previousDate = await getDate.getPreviousDate();
        let date = previousDate + "T00:00:00.000Z";
        console.log(date);
        //console.log(sellingPartner);

        let res = await sellingPartner.callAPI({
          operation:'finances.listFinancialEvents',
          query:{
              PostedAfter: date
          },
          options:{
            raw_result: true
          }
        });
        console.log(res);
        //Financial_EventsData = await res.payload.FinancialEvents.ShipmentEventList;
        //return Financial_EventsData;
    }
   catch(error){
      console.log(error);
   }
}

getFinancialEvents();
  module.exports={ getFinancialEvents}