const { getMatchesData, getDeliveresData } = require("../../data/data.js");

//1.
async function getMatchesPerYear(request, response) {
    let matches = await getMatchesData();
    try {
        let matchesInYear = {};
        matches.forEach((match) => {
            if (matchesInYear[match.season] === undefined) {
                matchesInYear[match.season] = 1;
            } else {
                matchesInYear[match.season] += 1;
            }
        });
        const data = {
            data: matchesInYear,
            title: "No. Of Matches Per Season",
            id: "matchesPerYear",
            labels: {
                x: "Years",
                y: "Match Count",
            },
        };
        return response.render("singleDegreeChart", data);
    } catch (error) {
        console.log(`Error counting number of matches per year. ${error}`);
    }
}

//2.
async function getMatchesWonPerTeamPerYear(request, response) {
    let matches = await getMatchesData();
    try {
        let wins = {};

        matches.forEach((match) => {
            if (wins[match.season] === undefined) {
                wins[match.season] = {};
            }

            if (wins[match.season][match.winner] === undefined) {
                wins[match.season][match.winner] = 1;
            } else {
                wins[match.season][match.winner] += 1;
            }
        });
        const data = {
            data: wins,
            title: "No. Of Matches Per Team Per Season",
            id: "matchesWonPerTeamPerYear",
            labels: {
                x: "Teams",
                y: "Match Count",
            },
        };

        return response.render("doubleDegreeChart", data);
    } catch (error) {
        console.log(
            `Error counting number of wins per year for each team. ${error}`
        );
    }
}

//3.
async function calculateExtraRunsPerTeam(request, response) {
    try {
        let matches = await getMatchesData();
        let deliveries = await getDeliveresData();

        let matchIDs2016 = matches
            .filter((match) => {
                return match.season == "2016";
            })
            .map((match) => {
                return match.id;
            });

        let extraRunsPerTeam = deliveries
            .filter((delivery) => {
                return matchIDs2016.includes(delivery.match_id);
            })
            .reduce((acc, delivery) => {
                if (delivery.bowling_team in acc) {
                    acc[delivery.bowling_team] += parseInt(delivery.extra_runs);
                } else {
                    acc[delivery.bowling_team] = parseInt(delivery.extra_runs);
                }

                return acc;
            }, {});
        const data = {
            data: extraRunsPerTeam,
            title: "Extra Runs Conceded in 2016",
            id: "extraRunsPerTeam",
            labels: {
                x: "Teams",
                y: "Extra Runs Conceded",
            },
        };
        return response.render("singleDegreeChart", data);
    } catch (error) {
        console.log(
            `Error counting number of extra runs per team in year 2016. ${error}`
        );
    }
}

//4.
async function calculateBowlersEconomyRate(request, response) {
    try {
        let matches = await getMatchesData();
        let deliveries = await getDeliveresData();

        let matchIDs2015 = matches
            .filter((match) => {
                return match.season == "2015";
            })
            .map((match) => {
                return match.id;
            });

        let bowlerStats = deliveries
            .filter((delivery) => {
                return matchIDs2015.includes(delivery.match_id);
            })
            .reduce((stats, delivery) => {
                let isLegalBall =
                    delivery.noball_runs == "0" && delivery.wide_runs == "0";

                if (delivery.bowler in stats) {
                    stats[delivery.bowler].runs +=
                        parseInt(delivery.total_runs) + !isLegalBall;
                    stats[delivery.bowler].balls += isLegalBall;
                } else {
                    stats[delivery.bowler] = {
                        runs: parseInt(delivery.total_runs) + !isLegalBall,
                        balls: isLegalBall,
                    };
                }

                return stats;
            }, {});

        let economyRates = Object.entries(bowlerStats)
            .map(([bowler, stats]) => {
                let overs = stats.balls / 6;
                let economyRate = stats.runs / overs;

                return [bowler, economyRate];
            })
            .sort((a, b) => {
                return a[1] - b[1];
            })
            .slice(0, 10)
            .reduce((result, [bowler, economyRate]) => {
                result[bowler] = economyRate;
                return result;
            }, {});
        const data = {
            data: economyRates,
            title: "Top 10 Economical Bowlers of 2015",
            id: "bowlersEconomyRate",
            labels: {
                x: "Bowlers",
                y: "Economy Rate",
            },
        };
        return response.render("singleDegreeChart", data);
    } catch (error) {
        console.log(
            `Error getting top 10 economical players in 2015. ${error}`
        );
    }
}

//5.
async function countTimesTeamsWonTheTossAndTheMatch(request, response) {
    try {
        let matches = await getMatchesData();
        let counts = matches
            .filter((match) => {
                return match.toss_winner == match.winner;
            })
            .reduce((result, match) => {
                if (match.winner in result) {
                    result[match.winner]++;
                } else {
                    result[match.winner] = 1;
                }

                return result;
            }, {});
        const data = {
            data: counts,
            title: "No. of Times Teams Won the Toss and the Match",
            id: "timesTeamWonTossAndMatch",
            labels: {
                x: "Teams",
                y: "Toss & Match Win Count",
            },
        };
        return response.render("singleDegreeChart", data);
    } catch (error) {
        console.log(
            `Error counting times the team won the toss and the match at the same time. ${error}`
        );
    }
}

//6.
async function getHighestPlayerOfMatchForEachSeason(request, response) {
    try {
        let matches = await getMatchesData();

        let playerOfMatchCounts = {};
        matches.forEach((match) => {
            if (playerOfMatchCounts[match.season] == undefined) {
                playerOfMatchCounts[match.season] = {};
            }

            if (
                playerOfMatchCounts[match.season][match.player_of_match] ==
                undefined
            ) {
                playerOfMatchCounts[match.season][match.player_of_match] = 1;
            } else {
                playerOfMatchCounts[match.season][match.player_of_match] += 1;
            }
        });

        let highestPlayerOfMatchPerSeason = {};
        Object.entries(playerOfMatchCounts).forEach(
            ([season, playerCounts]) => {
                let highestPlayerOfMatch = "";
                let highestPlayerOfMatchCount = 0;

                Object.entries(playerCounts).forEach(([player, count]) => {
                    if (count > highestPlayerOfMatchCount) {
                        highestPlayerOfMatch = player;
                        highestPlayerOfMatchCount = count;
                    }
                });

                highestPlayerOfMatchPerSeason[season] = highestPlayerOfMatch;
            }
        );
        const data = {
            data: highestPlayerOfMatchPerSeason,
            title: "No. of Times Teams Won the Toss and the Match",
            id: "highestPlayerOfMatchForEachSeason",
        };
        return response.render("noChart", data);
    } catch (error) {
        console.log(
            `Error getting the player with highest player of match per season. ${error}`
        );
    }
}

//7.
async function getBatsmanStrikeRateBySeason(request, response) {
    try {
        let matches = await getMatchesData();
        let deliveries = await getDeliveresData();

        let matchIDBySeason = matches.reduce((acc, match) => {
            acc[match.id] = match.season;
            return acc;
        }, {});

        let batsmanRunsBySeason = deliveries.reduce((acc, delivery) => {
            let season = matchIDBySeason[delivery.match_id];
            let batsman = delivery.batsman;
            let runs = parseInt(delivery.batsman_runs);

            if (!acc[season]) {
                acc[season] = {};
            }

            let isLegalBall =
                delivery.noball_runs == "0" && delivery.wide_runs == "0";

            if (!acc[season][batsman]) {
                acc[season][batsman] = {
                    runs: runs + !isLegalBall,
                    balls: isLegalBall,
                };
            } else {
                acc[season][batsman].runs += runs + !isLegalBall;
                acc[season][batsman].balls += isLegalBall;
            }

            return acc;
        }, {});

        let batsmanStrikeRateBySeason = {};
        Object.entries(batsmanRunsBySeason).forEach(([season, stats]) => {
            batsmanStrikeRateBySeason[season] = {};
            Object.entries(stats).forEach(([batsman, batsmanStats]) => {
                let strikeRate = (batsmanStats.runs / batsmanStats.balls) * 100;
                batsmanStrikeRateBySeason[season][batsman] = strikeRate;
            });
        });
        const data = {
            data: batsmanStrikeRateBySeason,
            title: "Strike Rate of Batsman by Season",
            id: "batsmanStrikeRateBySeason",
            labels: {
                x: "Batsman",
                y: "Strike Rate",
            },
        };
        return response.render("doubleDegreeChart", data);
    } catch (error) {
        console.log(`Error getting strike rate of batsmen by season. ${error}`);
    }
}

//8.
async function getHighestPlayerDismissions(request, response) {
    try {
        let deliveries = await getDeliveresData();
        let playerDismissalCount = deliveries.reduce((acc, delivery) => {
            if (
                delivery.player_dismissed &&
                delivery.bowler &&
                delivery.dismissal_kind
            ) {
                const dismissalKey = `${delivery.bowler}-${delivery.player_dismissed}`;

                if (dismissalKey in acc) {
                    acc[dismissalKey]++;
                } else {
                    acc[dismissalKey] = 1;
                }
            }

            return acc;
        }, {});

        const [highestPlayerDismissalPair, highestPlayerDismissalCount] =
            Object.entries(playerDismissalCount).reduce(
                ([maxPair, maxCount], [pair, count]) => {
                    if (count > maxCount) {
                        return [pair, count];
                    }

                    return [maxPair, maxCount];
                }
            );

        const result = {
            Bowler: highestPlayerDismissalPair.split("-")[0],
            "Player Dismissed": highestPlayerDismissalPair.split("-")[1],
            "Dismissal Times": highestPlayerDismissalCount,
        };
        const data = {
            data: result,
            title: "Highest Player Dismissal Pair",
            id: "highestPlayerDismissals",
        };
        return response.render("noChart", data);
    } catch (error) {
        console.log(
            `Error getting highest player dismissal pair and count. ${error}`
        );
    }
}

//9.
async function getBestEconomicalRateInSuperOverBowler(request, response) {
    try {
        let deliveries = await getDeliveresData();

        let bowlerStats = deliveries.reduce((acc, delivery) => {
            if (delivery.is_super_over == "1") {
                let isLegalBall =
                    delivery.noball_runs == "0" && delivery.wide_runs == "0";

                if (delivery.bowler in acc) {
                    acc[delivery.bowler].runs +=
                        parseInt(delivery.total_runs) + !isLegalBall;
                    acc[delivery.bowler].balls += isLegalBall;
                } else {
                    acc[delivery.bowler] = {
                        runs: parseInt(delivery.total_runs) + !isLegalBall,
                        balls: isLegalBall,
                    };
                }
            }

            return acc;
        }, {});

        let bestEconomyRatePlayer = Object.entries(bowlerStats)
            .map(([bowler, bowlerStat]) => {
                let overs = bowlerStat.balls / 6;
                let economyRate = bowlerStat.runs / overs;

                return [bowler, economyRate];
            }, {})
            .sort((a, b) => a[1] - b[1])
            .slice(0, 1)
            .reduce((acc, [bowler, economyRate]) => {
                acc[bowler] = economyRate;

                return acc;
            }, {});
        const data = {
            data: bestEconomyRatePlayer,
            title: "Best Economical Bowler in Super Over",
            id: "bestEconomicalRateInSuperOverBowler",
        };
        return response.render("noChart", data);
    } catch (error) {
        console.log(
            `Error getting best economical rate bowler in super over. ${error}`
        );
    }
}

module.exports = {
    getMatchesPerYear,
    getMatchesWonPerTeamPerYear,
    calculateExtraRunsPerTeam,
    calculateBowlersEconomyRate,
    countTimesTeamsWonTheTossAndTheMatch,
    getHighestPlayerOfMatchForEachSeason,
    getBatsmanStrikeRateBySeason,
    getHighestPlayerDismissions,
    getBestEconomicalRateInSuperOverBowler,
};
