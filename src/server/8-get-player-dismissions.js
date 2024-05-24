const { getDeliveresData } = require("./../data/data.js");
const saveDataToJSON = require("./saveDataToJSON.js");

function getHighestPlayerDismissions(deliveries){
  try {
    let playerDismissalCount= deliveries.reduce( (acc, delivery) => {
        if(delivery.player_dismissed && delivery.bowler && delivery.dismissal_kind){
            const dismissalKey = `${delivery.bowler}-${delivery.player_dismissed}`

            if(dismissalKey in acc){
                acc[dismissalKey]++;
            } else {
                acc[dismissalKey] = 1;
            }
        }

        return acc;
    }, {});

    const [highestPlayerDismissalPair, highestPlayerDismissalCount] = Object.entries(playerDismissalCount).reduce( ([maxPair, maxCount], [pair, count]) => {
        if(count > maxCount){
            return [pair, count];
        }

        return [maxPair, maxCount];
    });

    const result = {
        bowler: highestPlayerDismissalPair.split("-")[0],
        playerDismissed: highestPlayerDismissalPair.split("-")[1],
        dismissalTimes: highestPlayerDismissalCount
    };
    return result;
  } catch (error) {
    console.log(`Error getting highest player dismissal pair and count. ${error}`);
  }
}

getDeliveresData()
    .then((deliveries) => {
        let result = getHighestPlayerDismissions(deliveries);
        saveDataToJSON(result, "highestPlayerDismissed.json");
    })
