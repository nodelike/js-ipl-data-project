const { Router } = require("express");
const { getData } = require('../../data/data.js');
const {
    getMatchesPerYear,
    getMatchesWonPerTeamPerYear,
    calculateExtraRunsPerTeam,
    calculateBowlersEconomyRate,
    countTimesTeamsWonTheTossAndTheMatch,
    getHighestPlayerOfMatchForEachSeason,
    getBatsmanStrikeRateBySeason,
    getHighestPlayerDismissions,
    getBestEconomicalRateInSuperOverBowler,
} = require("../controllers/iplController.js");

const getHtmlFile = require("./../controllers/getHtmlFile.js")

const dataRouter = Router();
const fileRouter = Router();



dataRouter
  // .get("/matches", getData().matches)
  // .get("/deliveries", getData().deliveries)
  .get("/matchesPerYear", async (request, response) => {
    
  })
  .get("/matchesWonPerTeamPerYear", getMatchesWonPerTeamPerYear)
  .get("/extraRunsPerTeam", calculateExtraRunsPerTeam)
  .get("/bowlersEconomyRate", calculateBowlersEconomyRate)
  .get("/timesTeamWonTossAndMatch", countTimesTeamsWonTheTossAndTheMatch)
  .get("/highestPlayerOfMatchForEachSeason", getHighestPlayerOfMatchForEachSeason)
  .get("/batsmanStrikeRateBySeason", getBatsmanStrikeRateBySeason)
  .get("/highestPlayerDismissals", getHighestPlayerDismissions)
  .get("/bestEconomicalRateInSuperOverBowler", getBestEconomicalRateInSuperOverBowler)
  
fileRouter  
.get("/:filename", getHtmlFile)

module.exports = { dataRouter, fileRouter} ;