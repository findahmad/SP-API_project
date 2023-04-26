var axios = require('axios');
const db = require('./config/db/db.js');
const chalk = require('chalk');

/*** Packaging Sheety Api (Will be product TABLE) *****/

const AddProducts = async () => {

  console.log(chalk.red.bold("------------------------------------------------------------------------------------"));
  console.log(chalk.blue.bold('Add data to products table using Packaging Sheety Api!'));
  console.log(chalk.red.bold("------------------------------------------------------------------------------------\n"));
      
  var config = {
      method: 'get',
      url: 'https://api.sheety.co/3f524be040ca6e58130988688cda2846/fmsPackagingTable/packaging',
      headers: { 
        'Authorization': 'Bearer S]K8?c98KGjR+WQZcZ\'A'
      }
    };

    await axios(config)
    .then(async(response) => {
        const productData = response.data.packaging;
        if(productData != undefined){
          for(let i=0;i<productData.length; i++){
              var First_Production_Date = productData[i].firstProductionDate || null;
              var Discontinued_Date = productData[i].discontinuedDate || null;
              var Added_Date = productData[i].addedDate || null;
              
              await db.select().from('Products').where({SKU:productData[i].sku}).then(async(product_exist) => {
                if(product_exist.length>=1){
                    await db('Products').update({Status:productData[i].status, ProductName:productData[i].productName, FNSKU:productData[i].fnsku, ASIN:productData[i].asin, Inner_Packaging_Type:productData[i].innerPackagingType, Pack_Count:productData[i].packCount, Pack_Size:productData[i].packSize, Pack_UOM:productData[i].packUom, Production_Type:productData[i].productionType, Packaging_Code:productData[i].packagingCode, Product_Label_Code:productData[i].productLabelCode, Packaging_Cost:productData[i].packagingCost, Expiration_Date_Location:productData[i].expirationDateLocation, Average_Shelf_Life:productData[i].averageShelfLife, Required_Shelf_Life:productData[i].requiredShelfLife, Item_Length:productData[i].itemLength, Item_Width:productData[i].itemWidth, Item_Height:productData[i].itemHeight, Item_Dimensions:productData[i].itemDimensions, Item_Cubic_Ft:productData[i].itemCubicFt, Item_Weight:productData[i].itemWeight, Packaging_Product_Pic:productData[i].packagingProductPicture, Primary_Outbound_Box_Type:productData[i].primaryOutboundBoxType, Primary_Outbound_Box_Size:productData[i].primaryOutboundBoxSize, Primary_Outbound_Box_Cost:productData[i].primaryOutboundBoxCost, Primary_Outbound_Box_Cost_Per_Unit:productData[i].primaryOutboundBoxCostPerUnit, Primary_Outbound_Box_Cubic:productData[i].primaryOutboundBoxCubic, Primary_Outbound_Box_Weight_LB:productData[i].primaryOutboundBoxWeightLb, Primary_Outbound_Box_Quantity:productData[i].primaryOutboundBoxQuantity, Primary_Dunnage:productData[i].primaryDunnage, Primary_Packed_OB_Box_Picture:productData[i].primaryPackedObBoxPicture, Designated_Production_Station:productData[i].designatedProductionStation, Total_Packaging_Cost_Per_Unit:productData[i].totalPackagingCostPerUnit, Notes:productData[i].notes, Meltable:productData[i].meltable, Small_and_Light:productData[i].smallAndLight, Image:productData[i].image, OB_Reship_Box_Size:productData[i].obReshipBoxSize, OB_Reship_Box_Cubic:productData[i].obReshipBoxCubic, OB_Reship_Box_Weight:productData[i].obReshipBoxWeight, OB_Reship_Box_Quantity:productData[i].obReshipBoxQuantity, OB_Reship_Dunnage:productData[i].obReshipDunnage, OB_Reship_Packed_Picture:productData[i].obReshipPackedPicture, OB_New_Box_Size:productData[i].obNewBoxSize, OB_New_Box_Cost:productData[i].obNewBoxCost, OB_New_Box_Cost_Per_Unit:productData[i].obNewBoxCostPerUnit, OB_New_Box_Cubic:productData[i].obNewBoxCubic, OB_New_Box_Weight:productData[i].obNewBoxWeight, OB_New_Box_Quantity:productData[i].obNewBoxQuantity, OB_New_Box_Dunnage:productData[i].obNewBoxDunnage, OB_New_Box_Packed_Picture:productData[i].obNewBoxPackedPicture, OB_New_Box_2_Size:productData[i].obNewBox2Size, OB_New_Box_2_Cost:productData[i].obNewBox2Cost, OB_New_Box_2_Cost_Per_Unit:productData[i].obNewBox2CostPerUnit, OB_New_Box_2_Cubic:productData[i].obNewBox2Cubic, OB_New_Box_2_Weight:productData[i].obNewBox2Weight, OB_New_Box_2_Quantity:productData[i].obNewBox2Quantity, OB_New_Box_2_Dunnage:productData[i].obNewBox2Dunnage, OB_New_Box_2_Packed_Picture:productData[i].obNewBox2PackedPicture, MSKU:productData[i].msku, Vendor:productData[i].vendor, Vendor_SKU:productData[i].vendorSku, Sellable_Units_Per_Case:productData[i].sellableUnitsPerCase, Case_Weight:productData[i].caseWeight, Disposition_Damaged_Receipt:productData[i].dispositionDamagedOnReceipt, Disposition_Damaged:productData[i].dispositionDamaged, Disposition_End_Batch:productData[i].dispositionEndOfBatch, Disposition_Removal_Order:productData[i].dispositionRemovalOrder, First_Production_Date, Manufacturer:productData[i].manufacturer, Brand:productData[i].brand, Category:productData[i].category, Sub_Category:productData[i].subCategory, Sourced_By:productData[i].sourcedBy, Discontinued_Date, Discontinued_Reason:productData[i].discontinuedReason, Added_Date, Tags:productData[i].tags}).where({SKU:productData[i].sku})
                    .then((product_response) => {
                        console.log(chalk.magenta(`Product with SKU ${productData[i].sku} Updated Successfully!`));                    
                    }).catch(err=> {
                        console.log(err.message);
                    })
                }
                else
                {
                    await db('Products').insert({SKU:productData[i].sku, Status:productData[i].status, ProductName:productData[i].productName, FNSKU:productData[i].fnsku, ASIN:productData[i].asin, Inner_Packaging_Type:productData[i].innerPackagingType, Pack_Count:productData[i].packCount, Pack_Size:productData[i].packSize, Pack_UOM:productData[i].packUom, Production_Type:productData[i].productionType, Packaging_Code:productData[i].packagingCode, Product_Label_Code:productData[i].productLabelCode, Packaging_Cost:productData[i].packagingCost, Expiration_Date_Location:productData[i].expirationDateLocation, Average_Shelf_Life:productData[i].averageShelfLife, Required_Shelf_Life:productData[i].requiredShelfLife, Item_Length:productData[i].itemLength, Item_Width:productData[i].itemWidth, Item_Height:productData[i].itemHeight, Item_Dimensions:productData[i].itemDimensions, Item_Cubic_Ft:productData[i].itemCubicFt, Item_Weight:productData[i].itemWeight, Packaging_Product_Pic:productData[i].packagingProductPicture, Primary_Outbound_Box_Type:productData[i].primaryOutboundBoxType, Primary_Outbound_Box_Size:productData[i].primaryOutboundBoxSize, Primary_Outbound_Box_Cost:productData[i].primaryOutboundBoxCost, Primary_Outbound_Box_Cost_Per_Unit:productData[i].primaryOutboundBoxCostPerUnit, Primary_Outbound_Box_Cubic:productData[i].primaryOutboundBoxCubic, Primary_Outbound_Box_Weight_LB:productData[i].primaryOutboundBoxWeightLb, Primary_Outbound_Box_Quantity:productData[i].primaryOutboundBoxQuantity, Primary_Dunnage:productData[i].primaryDunnage, Primary_Packed_OB_Box_Picture:productData[i].primaryPackedObBoxPicture, Designated_Production_Station:productData[i].designatedProductionStation, Total_Packaging_Cost_Per_Unit:productData[i].totalPackagingCostPerUnit, Notes:productData[i].notes, Meltable:productData[i].meltable, Small_and_Light:productData[i].smallAndLight, Image:productData[i].image, OB_Reship_Box_Size:productData[i].obReshipBoxSize, OB_Reship_Box_Cubic:productData[i].obReshipBoxCubic, OB_Reship_Box_Weight:productData[i].obReshipBoxWeight, OB_Reship_Box_Quantity:productData[i].obReshipBoxQuantity, OB_Reship_Dunnage:productData[i].obReshipDunnage, OB_Reship_Packed_Picture:productData[i].obReshipPackedPicture, OB_New_Box_Size:productData[i].obNewBoxSize, OB_New_Box_Cost:productData[i].obNewBoxCost, OB_New_Box_Cost_Per_Unit:productData[i].obNewBoxCostPerUnit, OB_New_Box_Cubic:productData[i].obNewBoxCubic, OB_New_Box_Weight:productData[i].obNewBoxWeight, OB_New_Box_Quantity:productData[i].obNewBoxQuantity, OB_New_Box_Dunnage:productData[i].obNewBoxDunnage, OB_New_Box_Packed_Picture:productData[i].obNewBoxPackedPicture, OB_New_Box_2_Size:productData[i].obNewBox2Size, OB_New_Box_2_Cost:productData[i].obNewBox2Cost, OB_New_Box_2_Cost_Per_Unit:productData[i].obNewBox2CostPerUnit, OB_New_Box_2_Cubic:productData[i].obNewBox2Cubic, OB_New_Box_2_Weight:productData[i].obNewBox2Weight, OB_New_Box_2_Quantity:productData[i].obNewBox2Quantity, OB_New_Box_2_Dunnage:productData[i].obNewBox2Dunnage, OB_New_Box_2_Packed_Picture:productData[i].obNewBox2PackedPicture, MSKU:productData[i].msku, Vendor:productData[i].vendor, Vendor_SKU:productData[i].vendorSku, Sellable_Units_Per_Case:productData[i].sellableUnitsPerCase, Case_Weight:productData[i].caseWeight, Disposition_Damaged_Receipt:productData[i].dispositionDamagedOnReceipt, Disposition_Damaged:productData[i].dispositionDamaged, Disposition_End_Batch:productData[i].dispositionEndOfBatch, Disposition_Removal_Order:productData[i].dispositionRemovalOrder, First_Production_Date, Manufacturer:productData[i].manufacturer, Brand:productData[i].brand, Category:productData[i].category, Sub_Category:productData[i].subCategory, Sourced_By:productData[i].sourcedBy, Discontinued_Date, Discontinued_Reason:productData[i].discontinuedReason, Added_Date, Tags:productData[i].tags})
                    .then((product_res) => { 
                        console.log(chalk.magenta(`Product with SKU ${productData[i].sku} Inserted Successfully!`));                                             
                    }).catch(err=> {
                        console.log(err.message);
                    });
                }
              }).catch(err=> {
                console.log(err.message);
              });        
          }

          console.log(chalk.red.bold("\n------------------------------------------------------------------------------------"));
          console.log(chalk.green.bold("Products Data Inserted Successfully!"));
          console.log(chalk.red.bold("------------------------------------------------------------------------------------\n"));
        }
    })
    .catch((error)=> {
      console.log(error.message);
    })
}

module.exports = {AddProducts}