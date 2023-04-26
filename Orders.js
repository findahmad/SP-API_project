const db = require('./config/db/db.js');
const chalk = require('chalk');
var AssignOrders = require('./AssignOrders.js');

const InsertOrders = async () => {

    console.log(chalk.red.bold("------------------------------------------------------------------------------------"));
    console.log(chalk.blue.bold('Putting data into Orders Table!'));
    console.log(chalk.red.bold("------------------------------------------------------------------------------------\n"));
    
    await db.select().from('Financial_Events').then(async(event_res) => {
        for(let i=0; i<event_res.length; i++){
          var Product_Name = "";
          var Packaging_Type = "";
          var Supplier = "";
          var Packaging_Code = "";
          var Image = "";
          await db.select().from('Products').where({SKU:event_res[i].SKU}).then(async(product_res) => {
            Product_Name = product_res[0].ProductName;
            Packaging_Type = product_res[0].Production_Type;
            Supplier = product_res[0].Vendor;
            Packaging_Code = product_res[0].Packaging_Code;
            Image = product_res[0].Image;
          }).catch(err=> {
              console.log(err.message);
          })
            var Quantity = event_res[i].Quantity;
            var Unit_Revenue = event_res[i].Revenue / Quantity;
            var Unit_Fulfillment_Fee = event_res[i].FulfillmentFee / Quantity;
            var Unit_Referral_Fee = event_res[i].ReferralFee / Quantity;
            await db('Orders').insert({ order_id: event_res[i].AmazonOrderId, Product_Name, Packaging_Type, Supplier, Packaging_Code, Image, Date_Time:event_res[i].PostedDate, sku:event_res[i].SKU, description: Product_Name, quantity:Quantity, Order_Units:Quantity, Order_Revenue: event_res[i].Revenue, Order_Fulfillment_Fee: event_res[i].FulfillmentFee, Order_Referral_Fee: event_res[i].ReferralFee, Unit_Revenue, Unit_Fulfillment_Fee, Unit_Referral_Fee}).then((order_res) => {
                console.log(chalk.magenta(`Order with Order_Id ${event_res[i].AmazonOrderId} Inserted Successfully!`));                                                                
            }).catch(err => {
              console.log(err.message);
            })       
        }
        console.log(chalk.red.bold("\n------------------------------------------------------------------------------------"));
        console.log(chalk.green.bold("Data inserted successfully in Orders table!"));
        console.log(chalk.red.bold("------------------------------------------------------------------------------------\n"));
      
        AssignOrders.AssignOrdersToBatch();
      }).catch(err=> {
          console.log(err.message);
      })
}

module.exports = {InsertOrders}