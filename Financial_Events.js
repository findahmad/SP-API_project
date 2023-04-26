
/********  Load Data to Finacial Events at 4 AM   *******/

//const Token = require('./AccessTokenCreation.js');
const db = require('./config/db/db.js');
//let Financial_Events = require('./api_sdk');
var json = require('./response.json');
const chalk = require('chalk');
var Orders = require('./Orders.js');

const LoadFinancialEventData = async () => {
      //let Financial_EventsData = await Financial_Events.getFinancialEvents();

      console.log(chalk.red.bold("------------------------------------------------------------------------------------"));
      console.log(chalk.blue.bold('Load data to Financial Events Table!'));
      console.log(chalk.red.bold("------------------------------------------------------------------------------------\n"));
      
      var response = json.FinancialEvents;
      var ShipmentEvent = response.ShipmentEventList;
      if(ShipmentEvent != undefined){
        for(let i=0; i<ShipmentEvent.length; i++) 
        {
          var shipment_event = ShipmentEvent[i];
          var PostedDate = shipment_event.PostedDate;
          if(PostedDate!= undefined){
            PostedDate =  PostedDate.split("T")[0]; 
          }

          var ShipmentItemList = shipment_event.ShipmentItemList;
          if(ShipmentItemList != undefined){
              for(let j=0; j<ShipmentItemList.length; j++)
              {
                  var SKU = ShipmentItemList[j].SellerSKU;
                  var Quantity = ShipmentItemList[j].QuantityShipped;
                  var Revenue="";
                  var FulfillmentFee = "";
                  var ReferralFee = "";

                  var ChargeList = ShipmentItemList[j].ItemChargeList;
                  if(ChargeList != undefined)
                  { 
                      const ItemChargeObj = await ChargeList.find(ItemChargeList => ItemChargeList.ChargeType == "Principal");
                      if(ItemChargeObj != undefined){
                          Revenue = ItemChargeObj.ChargeAmount.CurrencyAmount;
                      }
                  }

                  var FeeList = ShipmentItemList[j].ItemFeeList;
                  if(FeeList != undefined)
                  {
                    const FulfillmentFeeObj= await FeeList.find(ItemFeeList => ItemFeeList.FeeType == "FBAPerUnitFulfillmentFee");
                    if(FulfillmentFeeObj != undefined){
                      FulfillmentFee = FulfillmentFeeObj.FeeAmount.CurrencyAmount;
                    } 
                  
                    const CommisionFeeObj =  await FeeList.find(FeeCommission => FeeCommission.FeeType == "Commission");
                    if(CommisionFeeObj != undefined){
                        ReferralFee = CommisionFeeObj.FeeAmount.CurrencyAmount; 
                    }                 
                  }

                  await db('Financial_Events').insert({AmazonOrderId:shipment_event.AmazonOrderId, SellerOrderId:shipment_event.SellerOrderId, PostedDate, SKU, Quantity, Revenue, FulfillmentFee, ReferralFee }).then(async(event_res) => {          
                      console.log(chalk.magenta(`Data with Order_Id ${shipment_event.AmazonOrderId} Inserted Successfully!`));                                                                
                  }).catch(err => {
                      console.log(err.message);
                  })
              }
          }   
        }

        console.log(chalk.red.bold("\n------------------------------------------------------------------------------------"));
        console.log(chalk.green.bold("Financial Events Data Inserted Successfully!"));
        console.log(chalk.red.bold("------------------------------------------------------------------------------------\n"));   

        Orders.InsertOrders();
    }
}

module.exports = {LoadFinancialEventData}