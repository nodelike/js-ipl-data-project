const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const matchesCsvFilePath = path.join(__dirname, 'matches.csv');
const deliveriesCsvFilePath = path.join(__dirname, 'deliveries.csv');

//Serving data to the server API endpoint
function getData() {
  return  {
    async matches(req, res){
      try {
        const matchesCSV = fs.readFileSync(matchesCsvFilePath, 'utf8');
        const matchesData = parse(matchesCSV, {
          columns: true,
          skip_empty_lines: true,
          relax_column_count: true
        });

        return res.status(200).send(matchesData);
      } catch (error) {
        return res.status(500);
      }
      
    },
    async deliveries(req, res){
      try {
        const deliveriesCSV = fs.readFileSync(deliveriesCsvFilePath, 'utf8');
        const deliveriesData = parse(deliveriesCSV, {
          columns: true,
          skip_empty_lines: true,
          relax_column_count: true
        });
        return res.status(200).send(deliveriesData);
      } catch (error) {
        return res.status(500);
      }
    }
  }
}


// Fetching Data from server and returning it as a promise
let getMatchesData = async () => {
  let response = await fetch("http://localhost:3000/api/data/matches", {
    method: "GET",
    headers : { "Context-Type" : "application/json" }
  })

  const data = await response.json();
  return data;
};

let getDeliveresData = async () => {
  let response = await fetch("http://localhost:3000/api/data/deliveries", {
    method: "GET",
    headers: { "Content-Type" : "application/json" }
  })

  const data = await response.json();
  return data;
}

module.exports = { getData, getMatchesData, getDeliveresData };