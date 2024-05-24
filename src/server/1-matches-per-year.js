const saveDataToJSON = require("./saveDataToJSON.js");
const { getMatchesData } = require("./../data/data.js");

function getMatchesPerYear(matches){
  try {
    let matchesInYear = {}
    matches.forEach( match => {
      if(matchesInYear[match.season] === undefined){
        matchesInYear[match.season] = 1;
      } else {
          matchesInYear[match.season] += 1;
      }
    });
    
    return matchesInYear;
  } catch (error){
    console.log(`Error counting number of matches per year. ${error}`);
  }
}

getMatchesData()
  .then((matches) => {
    let result = getMatchesPerYear(matches)
    saveDataToJSON(result, "matchesPerYear.json");
  })

