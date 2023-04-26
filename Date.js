let formattedDate='';
var datetime = require('node-datetime');
async function getPreviousDate() {
    var date = datetime.create();   //date of previous day
    // 7 day in the past
    date.offsetInDays(-1);
    formattedDate = await date.format('Y-m-d');
    return formattedDate;
}

getPreviousDate();
module.exports = {getPreviousDate}