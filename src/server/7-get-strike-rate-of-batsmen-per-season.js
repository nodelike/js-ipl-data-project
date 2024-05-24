const { getMatchesData, getDeliveresData } = require("./../data/data.js");
const saveDataToJSON = require("./saveDataToJSON.js");

function getBatsmanStrikeRateBySeason(matches, deliveries){
  try {
    let matchIDBySeason = matches.reduce( (acc, match) => {
        acc[match.id] = match.season;
        return acc
    }, {});

    let batsmanRunsBySeason = deliveries.reduce( (acc, delivery) => {
        let season = matchIDBySeason[delivery.match_id]
        let batsman = delivery.batsman;
        let runs = parseInt(delivery.batsman_runs)

        if(!acc[season]){
            acc[season] = {}
        }
        
        let isLegalBall = delivery.noball_runs == '0' && delivery.wide_runs =='0';

        if(!acc[season][batsman]){
            acc[season][batsman] = {
                runs: runs + !isLegalBall,
                balls: isLegalBall
            };
        } else {    
            acc[season][batsman].runs += (runs + !isLegalBall);
            acc[season][batsman].balls += isLegalBall;
        }

        return acc;
    }, {});

    let batsmanStrikeRateBySeason = {}
    Object.entries(batsmanRunsBySeason).forEach( ([season, stats]) => {
        batsmanStrikeRateBySeason[season] = {};
        Object.entries(stats).forEach(([batsman, batsmanStats]) => {
            let strikeRate = (batsmanStats.runs / batsmanStats.balls) * 100;
            batsmanStrikeRateBySeason[season][batsman] = strikeRate;
        });
    });

    console.log(batsmanStrikeRateBySeason);
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