const { Router } = require("express");
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
  .get("/matchesPerYear", async (req, res) => {
    const data = await getMatchesPerYear();
    console.log(data);
    res.render("matchesPerYear", { data });
  });
  // .get("/matchesWonPerTeamPerYear", getMatchesWonPerTeamPerYear)
  // .get("/extraRunsPerTeam", calculateExtraRunsPerTeam)
  // .get("/bowlersEconomyRate", calculateBowlersEconomyRate)
  // .get("/timesTeamWonTossAndMatch", countTimesTeamsWonTheTossAndTheMatch)
  // .get("/highestPlayerOfMatchForEachSeason", getHighestPlayerOfMatchForEachSeason)
  // .get("/batsmanStrikeRateBySeason", getBatsmanStrikeRateBySeason)
  // .get("/highestPlayerDismissals", getHighestPlayerDismissions)
  // .get("/bestEconomicalRateInSuperOverBowler", getBestEconomicalRateInSuperOverBowler)

module.exports = { dataRouter, fileRouter} ;