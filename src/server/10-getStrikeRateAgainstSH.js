const { getMatchesData, getDeliveresData } = require("./../data/data.js");
const saveDataToJSON = require("./saveDataToJSON.js");

function getBatsmanStrikeRateBySeason(matches, deliveries){
  try {
    let batsmanRunsBySeason = {};
    let matchIDBySeason = {};

    for(let match of matches){
        matchIDBySeason[match.id] = match.season;
    }

    for(let delivery of deliveries){
        if(delivery.bowling_team == "Sunrisers Hyderabad"){
            let season = matchIDBySeason[delivery.match_id]
            if(batsmanRunsBySeason[season] == undefined){
                batsmanRunsBySeason[season] = {};
            }
            let isLegalBall = delivery.noball_runs == '0' && delivery.wide_runs =='0';
            if(batsmanRunsBySeason[season][delivery.batsman] == undefined){
                batsmanRunsBySeason[season][delivery.batsman] = {
                    runs: parseInt(delivery.batsman_runs) + !isLegalBall,
                    balls: isLegalBall
                };
            } else {
                if(isLegalBall){
                    batsmanRunsBySeason[season][delivery.batsman].runs += parseInt(delivery.batsman_runs);
                    batsmanRunsBySeason[season][delivery.batsman].balls++;
                } else {
                    batsmanRunsBySeason[season][delivery.batsman].runs += (parseInt(delivery.batsman_runs) + 1);
                }
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

    let result = Object.entries(batsmanStrikeRateBySeason).reduce((acc, season) => {
        acc[season[0]] = Object.entries(season[1]).sort((a ,b) => b[1] - a[1])[0]
        return acc;
    }, {})

    console.log(result);
    return batsmanStrikeRateBySeason;
  } catch (error) {
    console.log(`Error getting strike rate of batsmen by season. ${error}`);
  }
}

getMatchesData()
  .then(async (matches) => {
    let deliveries = await getDeliveresData();
    
    let result = getBatsmanStrikeRateBySeason(matches, deliveries);
    saveDataToJSON(result, "batsmanStrikeRateBySeason.json");
  })
