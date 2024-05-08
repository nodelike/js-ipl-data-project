const getData = require('../data/data.js');
const saveDataToJSON = require("./saveDataToJSON.js");

let matches = getData().matches();

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

let result = getMatchesPerYear(matches)
saveDataToJSON(result, "matchesPerYear.json");