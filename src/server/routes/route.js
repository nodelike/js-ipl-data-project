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


const dataRouter = Router();
const fileRouter = Router();



dataRouter
  .get("/matches", getData().matches)
  .get("/deliveries", getData().deliveries)

fileRouter
  .get("/matchesPerYear", getMatchesPerYear)
  .get("/matchesWonPerTeamPerYear", getMatchesWonPerTeamPerYear)
  .get("/extraRunsPerTeam", calculateExtraRunsPerTeam)
  .get("/bowlersEconomyRate", calculateBowlersEconomyRate)
  .get("/timesTeamWonTossAndMatch", countTimesTeamsWonTheTossAndTheMatch)
  .get("/highestPlayerOfMatchForEachSeason", getHighestPlayerOfMatchForEachSeason)
  .get("/batsmanStrikeRateBySeason", getBatsmanStrikeRateBySeason)
  .get("/highestPlayerDismissals", getHighestPlayerDismissions)
  .get("/bestEconomicalRateInSuperOverBowler", getBestEconomicalRateInSuperOverBowler)

module.exports = { dataRouter, fileRouter} ;