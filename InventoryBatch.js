/*** Code to create InventoryBatches from Completed Production Events ****/
var axios = require('axios');
const db = require('./config/db/db.js');
const chalk = require('chalk');

const InventoryBatches = async () => {     
      console.log(chalk.red.bold("------------------------------------------------------------------------------------"));
      console.log(chalk.blue.bold('Inventory Batches Creation!'));
      console.log(chalk.red.bold("------------------------------------------------------------------------------------\n"));
      
      var config = {
        method: 'get',
        url: 'https://api.sheety.co/3f524be040ca6e58130988688cda2846/fmsProductionBatches/productionBatches',
        headers: { 
          'Authorization': 'Bearer r<KqG)kTF%|ki>Fg}skx'
        }
      };
  
      await axios(config)
      .then(async(response) => {
          const productionBatches = response.data.productionBatches;
          if(productionBatches != undefined){
            for(let i=0;i<productionBatches.length; i++){
              if(productionBatches[i].status == "Complete" && productionBatches[i].batchItemId !=""){
                await db.select().from('Inventory_Batches').where({Batch_Id:productionBatches[i].batchItemId}).then(async(batch_exist) => {
                  if(batch_exist.length>=1){
                      await db('Inventory_Batches').update({ Batch_Status:'Active', Po_Number:productionBatches[i].poNumber, SKU:productionBatches[i].sku, Product_Name:productionBatches[i].productName, Initial_Quantity:productionBatches[i].actualProductionQuantity, sellableUnitCost:productionBatches[i].sellableUnitCost, productionUnitPerHour: productionBatches[i]["productionU/h"] }).where({ Batch_Id:productionBatches[i].batchItemId}).then((batch_res) => {
                          console.log(chalk.magenta(`Inventory batch with batch id ${productionBatches[i].batchItemId} Updated Successfully!`));                    
                      }).catch(err=> {
                          console.log(err.message);
                      })
                  }
                  else
                  {
                      await db('Inventory_Batches').insert({Batch_Id:productionBatches[i].batchItemId, Batch_Status:'Active', Po_Number:productionBatches[i].poNumber, SKU:productionBatches[i].sku, Product_Name:productionBatches[i].productName, Initial_Quantity:productionBatches[i].actualProductionQuantity, sellableUnitCost:productionBatches[i].sellableUnitCost, productionUnitPerHour: productionBatches[i]["productionU/h"] }).then((res) => {       
                          console.log(chalk.magenta(`Inventory batch with batch id ${productionBatches[i].batchItemId} Inserted Successfully!`));
                      }).catch(err => {
                        console.log(err.message);
                      });
                  }
                }).catch(err=> {
                  console.log(err.message);
                });
              }
            }
            console.log(chalk.red.bold("\n------------------------------------------------------------------------------------"));
            console.log(chalk.green.bold("Inventory Batches Created Successfully!"));
            console.log(chalk.red.bold("------------------------------------------------------------------------------------\n"));
  
          }
      }).catch(err=> {
        console.log(err.message);
      })
}


module.exports = {InventoryBatches}