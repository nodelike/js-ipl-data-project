const getData = require('../data/data.js');
const saveDataToJSON = require("./saveDataToJSON.js");

let matches = getData().matches();
let deliveries = getData().deliveries();

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

        if(!acc[season][batsman]){
            acc[season][batsman] = {
                runs: runs,
                balls: 1
            };
        } else {
            acc[season][batsman].runs += runs;
            acc[season][batsman].balls++;
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

let result = getBatsmanStrikeRateBySeason(matches, deliveries);
saveDataToJSON(result, "batsmanStrikeRateBySeason.json");