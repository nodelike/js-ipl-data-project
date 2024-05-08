const getData = require('../data/data.js');
const saveDataToJSON = require("./saveDataToJSON.js");

let matches = getData().matches();
let deliveries = getData().deliveries();

function getBatsmanStrikeRateBySeason(matches, deliveries){
  try {
    let batsmanRunsBySeason = {};
    let matchIDBySeason = {};

    for(let match of matches){
        matchIDBySeason[match.id] = match.season;
    }

    for(let delivery of deliveries){
        let season = matchIDBySeason[delivery.match_id]
        // console.log(season);
        if(batsmanRunsBySeason[season] == undefined){
            batsmanRunsBySeason[season] = {};
        } else {
            if(batsmanRunsBySeason[season][delivery.batsman] == undefined){
                batsmanRunsBySeason[season][delivery.batsman] = {
                    runs: parseInt(delivery.batsman_runs),
                    balls: 1
                };
            } else {
                batsmanRunsBySeason[season][delivery.batsman].runs += parseInt(delivery.batsman_runs);
                batsmanRunsBySeason[season][delivery.batsman].balls++;
            }
        }
    }

    let batsmanStrikeRateBySeason = {}
    for(let season in batsmanRunsBySeason){
        batsmanStrikeRateBySeason[season] = {};
        for(let batsman in batsmanRunsBySeason[season]){
            let strikeRate = (batsmanRunsBySeason[season][batsman].runs / batsmanRunsBySeason[season][batsman].balls) * 100
            batsmanStrikeRateBySeason[season][batsman] = strikeRate;
        }
    }

    // console.log(batsmanStrikeRateBySeason);
    return batsmanStrikeRateBySeason;
  } catch (error) {
    console.log(`Error counting number of extra runs per team in year 2016. ${error}`);
  }
}

let result = getBatsmanStrikeRateBySeason(matches, deliveries);
saveDataToJSON(result, "batsmanStrikeRateBySeason.json");