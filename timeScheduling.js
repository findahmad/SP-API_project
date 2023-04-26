
var Financial_Events = require('./Financial_Events.js');
var Inventory_Batches = require('./InventoryBatch.js');
var Packaging_Sheety_Api = require('./Packaging_Sheety_Api.js');
var Purchase_Orders_Sheety_Api = require('./Purchase_Orders_Sheety_Api.js');
const cron = require('node-cron');
const chalk = require('chalk');
var center = require('center-align');

//Inventory Batches Created every day at 3:00 AM
cron.schedule('00 00 03 * * *', async function() {
    console.log(chalk.red.bold("------------------------------------------------------------------------------------"));
    console.log(center(chalk.magenta.bold('WELCOME TO ANALYTICS DASHBOARD!'), 100));
    console.log(chalk.red.bold("------------------------------------------------------------------------------------\n"));                               
    //await 
    await Inventory_Batches.InventoryBatches();
});


//Financial Events Data Loaded every day at 4:00 AM

//00 00 04
cron.schedule('00 00 04 * * *', async function() {
    await Packaging_Sheety_Api.AddProducts();
    await Purchase_Orders_Sheety_Api.AddPurchaseOrders();
    await Financial_Events.LoadFinancialEventData();

});