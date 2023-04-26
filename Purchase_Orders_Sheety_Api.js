var axios = require('axios');
const db = require('./config/db/db.js');
const chalk = require('chalk');

/**** Purchase Orders Sheety Api ***/

const AddPurchaseOrders = async () => {

    console.log(chalk.red.bold("------------------------------------------------------------------------------------"));
    console.log(chalk.blue.bold('Add data to Purchase_Orders table using Purchase_Orders Sheety Api!'));
    console.log(chalk.red.bold("------------------------------------------------------------------------------------\n"));

    var config = {
      method: 'get',
      url: 'https://api.sheety.co/3f524be040ca6e58130988688cda2846/fmsPurchaseOrders/purchaseOrders',
      headers: { 
        'Authorization': 'Bearer 3$E]U7D[`G(zs|oR[Ei^'
      }
    };

    await axios(config)
    .then(async(response) => {
          const OrderData = response.data.purchaseOrders;
          if(OrderData != undefined){
              for(let i=0;i<OrderData.length; i++){
                  if(OrderData[i].poNumber !=""){
                      var Lead_Time_Variance = OrderData[i]["leadTimeVariance (actualVsExpected)"];
                      var Actual_Po_CheckIn_Time = OrderData[i].actualPoCheckInTime || null;
                      var Invoice_Date=OrderData[i].invoiceDate || null;
                      var Invoice_PaidDate= OrderData[i].invoicePaidDate || null;
                      var Invoice_DueDate= OrderData[i].invoiceDueDate || null;
                      var Expected_Po_Delivery_Date =  OrderData[i].expectedPoDeliveryDate || null;
                     
                      await db.select().from('Purchase_Orders').where({Po_Number:OrderData[i].poNumber}).then(async(order_exist) => {
                        if(order_exist.length>=1){
                            await db('Purchase_Orders').update({Status:OrderData[i].status, Vendor:OrderData[i].vendor, Vendor_Order_Id:OrderData[i].vendorOrderId, Skus_Ordered:OrderData[i].skusOrdered, Cases_Ordered:OrderData[i].casesOrdered, Units_Ordered:OrderData[i].unitsOrdered,Skus_Received:OrderData[i].skusReceived, Cases_Received:OrderData[i].casesReceived, Units_Received:OrderData[i].unitsReceived, Po_Amount:OrderData[i].poAmount, Po_Fill_Rate:OrderData[i].poFillRate, Expected_Production_Time:OrderData[i].expectedProductionTime, Expected_Checkin_Time:OrderData[i].expectedCheckinTimeMinutes, Po_Order_Timestamp:OrderData[i].poOrderTimestamp, Po_Ship_Timestamp:OrderData[i].poShipTimestamp, Expected_Po_Delivery_Date, Po_Delivered_Timestamp:OrderData[i].poDeliveredTimestamp,Po_Received_By:OrderData[i].poReceivedBy, Po_CheckIn_Started_Timestamp:OrderData[i].poCheckInStartedTimestamp, Po_CheckedIn_Completed_Timestamp:OrderData[i].poCheckedInCompletedTimestamp, Actual_Po_CheckIn_Time, Po_CheckIn_CompletedBy:OrderData[i].poCheckInCompletedBy, Po_CheckIn_Time_Per_Sku:OrderData[i].poCheckInTimePerSku, Po_Delivered_CheckIn_Duration:OrderData[i].poDeliveredToCheckInDuration, Shipment_Order_Days:OrderData[i].daysOrderToShipment,Delivery_Order_Days:OrderData[i].daysOrderToDelivery, Days_In_Transit:OrderData[i].daysInTransit, Lead_Time_Variance, Carrier:OrderData[i].carrier, Pro_Number:OrderData[i].proNumber, Inbound_Po_Freight_Cost:OrderData[i].inboundPoFreightCost, Inbound_Po_Freight_Cost_Per_Unit:OrderData[i].inboundPoFreightCostPerUnit, Pallets:OrderData[i].pallets, Weight:OrderData[i].weight, Bol_Image:OrderData[i].bolImage, Errors:OrderData[i].errors, Generated_By:OrderData[i].generatedBy, Approved_By:OrderData[i].approvedBy, Item_Costs_Entered_By:OrderData[i].itemCostsEnteredBy, Invoice_Status:OrderData[i].invoiceStatus, Invoice_Number:OrderData[i].invoiceNumber, Invoice_Amount:OrderData[i].invoiceAmount, Invoice_Date, Invoice_DueDate, Invoice_PaidDate, Invoice:OrderData[i].invoice, Payment_Notes:OrderData[i].paymentNotes, Notes:OrderData[i].notes, Vendor_Image:OrderData[i].vendorImage}).where({Po_Number:OrderData[i].poNumber}).then((order_response) => {
                              console.log(chalk.magenta(`Purchase Order with Po_Number ${OrderData[i].poNumber} Updated Successfully!`));                    
                            }).catch(err=> {
                              console.log(err.message);
                            })
                        }
                        else
                        {
                            await db('Purchase_Orders').insert({Po_Number:OrderData[i].poNumber, Status:OrderData[i].status, Vendor:OrderData[i].vendor, Vendor_Order_Id:OrderData[i].vendorOrderId, Skus_Ordered:OrderData[i].skusOrdered, Cases_Ordered:OrderData[i].casesOrdered, Units_Ordered:OrderData[i].unitsOrdered,Skus_Received:OrderData[i].skusReceived, Cases_Received:OrderData[i].casesReceived, Units_Received:OrderData[i].unitsReceived, Po_Amount:OrderData[i].poAmount, Po_Fill_Rate:OrderData[i].poFillRate, Expected_Production_Time:OrderData[i].expectedProductionTime, Expected_Checkin_Time:OrderData[i].expectedCheckinTimeMinutes, Po_Order_Timestamp:OrderData[i].poOrderTimestamp, Po_Ship_Timestamp:OrderData[i].poShipTimestamp, Expected_Po_Delivery_Date, Po_Delivered_Timestamp:OrderData[i].poDeliveredTimestamp,Po_Received_By:OrderData[i].poReceivedBy, Po_CheckIn_Started_Timestamp:OrderData[i].poCheckInStartedTimestamp, Po_CheckedIn_Completed_Timestamp:OrderData[i].poCheckedInCompletedTimestamp, Actual_Po_CheckIn_Time, Po_CheckIn_CompletedBy:OrderData[i].poCheckInCompletedBy, Po_CheckIn_Time_Per_Sku:OrderData[i].poCheckInTimePerSku, Po_Delivered_CheckIn_Duration:OrderData[i].poDeliveredToCheckInDuration, Shipment_Order_Days:OrderData[i].daysOrderToShipment,Delivery_Order_Days:OrderData[i].daysOrderToDelivery, Days_In_Transit:OrderData[i].daysInTransit, Lead_Time_Variance, Carrier:OrderData[i].carrier, Pro_Number:OrderData[i].proNumber, Inbound_Po_Freight_Cost:OrderData[i].inboundPoFreightCost, Inbound_Po_Freight_Cost_Per_Unit:OrderData[i].inboundPoFreightCostPerUnit, Pallets:OrderData[i].pallets, Weight:OrderData[i].weight, Bol_Image:OrderData[i].bolImage, Errors:OrderData[i].errors, Generated_By:OrderData[i].generatedBy, Approved_By:OrderData[i].approvedBy, Item_Costs_Entered_By:OrderData[i].itemCostsEnteredBy, Invoice_Status:OrderData[i].invoiceStatus, Invoice_Number:OrderData[i].invoiceNumber, Invoice_Amount:OrderData[i].invoiceAmount, Invoice_Date, Invoice_DueDate, Invoice_PaidDate, Invoice:OrderData[i].invoice, Payment_Notes:OrderData[i].paymentNotes, Notes:OrderData[i].notes, Vendor_Image:OrderData[i].vendorImage}).then((order_res) => {       
                                console.log(chalk.magenta(`Purchase Order with Po_Number ${OrderData[i].poNumber} Inserted Successfully!`));                    
                            }).catch(err=> {
                               console.log(err.message);
                            });
                        }
                      }).catch(err=> {
                        console.log(err.message);
                     });
                  }
              }
              
              console.log(chalk.red.bold("\n------------------------------------------------------------------------------------"));
              console.log(chalk.green.bold("Purchase Orders Data Inserted Successfully!"));
              console.log(chalk.red.bold("------------------------------------------------------------------------------------\n"));    
          }
    })
    .catch(error => {
        console.log(error.message);
    })
}

module.exports = {AddPurchaseOrders}