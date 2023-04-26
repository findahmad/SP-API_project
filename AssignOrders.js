const db = require('./config/db/db.js');
const chalk = require('chalk');

const AssignOrdersToBatch = async () => {
    /******************* Code to Assign Orders to Batches **************/
  
    console.log(chalk.red.bold("------------------------------------------------------------------------------------"));
    console.log(chalk.blue.bold('Assigning orders to an inventory batch!'));
    console.log(chalk.red.bold("------------------------------------------------------------------------------------\n"));
    
    await db.select('sku').from('Orders').groupBy('sku').then(async(sku_res) => {
        for(let j=0; j<sku_res.length; j++){
            var Batch_Status ="Active"; var Purchase_Date=""; var TotalOrders="";
            var Assigned_Orders = []; var OrdersAssigned=[]; var EventsIds=[]; var EventsAssigned=[];
            await db.select().from('Inventory_Batches').where({SKU: sku_res[j].sku}).andWhere('Initial_Quantity', '!=', '').orderBy('Id', 'asc').then(async(batch_res)=> {
            for(let l=0; l<batch_res.length; l++){             
                var Batch_Id = batch_res[l].Batch_Id;
                var InitialQuantity = batch_res[l].Initial_Quantity;
                var Orders=""; var Financial_Events="";
  
                if(Assigned_Orders.length>=1){
                  await db.select().from('Orders').where( {sku: sku_res[j].sku}).whereNotIn('Id', OrdersAssigned).orderBy('Id', 'asc').then(async (order_res) => {
                    Assigned_Orders.splice(0, Assigned_Orders.length); 
                    Orders = order_res;
                  }).catch(err => {
                      console.log(err.message);
                  })
  
                  await db.select('Id').from('Financial_Events').where( {SKU: sku_res[j].sku}).whereNotIn('Id', EventsAssigned).orderBy('Id', 'asc').then(async (event_res) => {
                    EventsIds.splice(0, EventsIds.length); 
                    Financial_Events = event_res;
                  }).catch(err=> {
                      console.log(err.message);
                  })
                }
                else{
                  await db.select().from('Orders').where({sku: sku_res[j].sku}).orderBy('Id', 'asc').then(async (order_res) => {
                    TotalOrders = order_res.length;
                    Orders = order_res;
                  }).catch(err => {
                      console.log(err.message);
                  })
  
                  await db.select('Id').from('Financial_Events').where({SKU: sku_res[j].sku}).orderBy('Id', 'asc').then(async (event_res) => {
                    Financial_Events = event_res;
                  }).catch(err => {
                        console.log(err.message);
                  })
                }
  
                if(Orders!= undefined){
                  for(let k=0; k<InitialQuantity; k++){
                    if(Orders[k]!= undefined ){
                    Assigned_Orders.push(Orders[k]);
                    OrdersAssigned.push(Orders[k].Id);
                    EventsAssigned.push(Financial_Events[k].Id);
                    EventsIds.push(Financial_Events[k].Id)
                    }
                    else{
                      break;
                    }
                  }
                }
  
                var Assigned_Quantity = Assigned_Orders.length;
                var Remaining_Quantity = InitialQuantity - Assigned_Quantity;
                var Po_Number = batch_res[l].Po_Number;
                
                await db.select().from('Purchase_Orders').where({Po_Number}).then(async(purchase_order_res) => {
                  Purchase_Date = purchase_order_res[0].Po_Order_Timestamp;
                }).catch(err=> {
                      console.log(err.message);
                })
  
                if(Remaining_Quantity==0){
                    Batch_Status = 'Depleted';
                }
                         
                var orders="";
                await Assigned_Orders.map(async (order)=> {
                    orders += order.Id + ",";
                })

                await db('Inventory_Batches').update({Assigned_Quantity, Remaining_Quantity, Batch_Status, Assigned_Orders:orders.slice(0, -1), Purchase_Date}).where({ Batch_Id }).then((update_res) => {
                }).catch(err => {
                  console.log(err.message);
                });
  
                for(let m=0; m<Assigned_Orders.length; m++){
                  var Id = Assigned_Orders[m].Id;
                  var Order_Units = Assigned_Orders[m].Order_Units;
                  var sellableUnitCost =  batch_res[l].sellableUnitCost;
                  if(sellableUnitCost == "NoCost"){
                      sellableUnitCost = 0;
                  }
                  var Order_Product_Cost = sellableUnitCost * Order_Units;
                  var Order_Gross_Profit =  Assigned_Orders[m].Order_Revenue - Order_Product_Cost - Assigned_Orders[m].Order_Fulfillment_Fee - Assigned_Orders[m].Order_Referral_Fee;
                  var Unit_Product_Cost = Order_Product_Cost / Order_Units;
                  var Unit_Revenue = Assigned_Orders[m].Order_Revenue / Order_Units;
                  var Unit_Fulfillment_Fee = Assigned_Orders[m].Order_Fulfillment_Fee / Order_Units;
                  var Unit_Referral_Fee = Assigned_Orders[m].Order_Referral_Fee / Order_Units;
                  var Unit_Gross_Profit = Unit_Revenue - Unit_Product_Cost - Unit_Fulfillment_Fee - Unit_Referral_Fee;
                  var Production_Hours = (Order_Units / batch_res[l].productionUnitPerHour).toFixed(4);
                  
                  await db('Orders').update({Order_Product_Cost,Order_Gross_Profit: Order_Gross_Profit.toFixed(2), Unit_Product_Cost, Unit_Gross_Profit: Unit_Gross_Profit.toFixed(2), Production_Hours }).where({Id}).then((update_order_res) => {        
                  }).catch(err => {
                     console.log(err.message);
                 }); 
  
  
                var AssignedBatchID = batch_res[l].Batch_Id;
                 var ProductCost = sellableUnitCost;
                 var GrossProfit = Assigned_Orders[m].Order_Revenue - Assigned_Orders[m].Order_Fulfillment_Fee - Assigned_Orders[m].Order_Referral_Fee - ProductCost;
  
                await db('Financial_Events').update({AssignedBatchID, ProductCost, GrossProfit: GrossProfit.toFixed(2)}).where({ Id: EventsIds[m] }).then((profit_res) => {
                 }).catch(err=> {
                      console.log(err.message);
                 });
              }
  
              if(OrdersAssigned.length==TotalOrders){
                  break;
              }
          }

          console.log(chalk.magenta(`All Orders with Sku ${sku_res[j].sku} Assigned Successfully to a batch!`));                                                                
           
          }).catch(err=> {
            console.log(err.message);
        })
        }
    }).catch(err=> {
      console.log(err.message);
    })
  
      console.log(chalk.red.bold("\n------------------------------------------------------------------------------------"));
      console.log(chalk.green.bold("Orders assigned successfully to inventory batches!"));
      console.log(chalk.green.bold("Profit was calculated Successfully!"));
      console.log(chalk.red.bold("------------------------------------------------------------------------------------\n"));
  } 


  module.exports = {AssignOrdersToBatch}