const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const matchesCsvFilePath = path.join(__dirname, 'matches.csv');
const deliveriesCsvFilePath = path.join(__dirname, 'deliveries.csv');

function getData() {
  return  {
    matches(){
      try {
        const matchesCSV = fs.readFileSync(matchesCsvFilePath, 'utf8');
        const matchesData = parse(matchesCSV, {
          columns: true,
          skip_empty_lines: true,
          relax_column_count: true
        });
  
        return matchesData;
      } catch (error) {
        console.log(`Error retrieving matches.csv data. ${error}`);
      }
      
    },
    deliveries(){
      try {
        const deliveriesCSV = fs.readFileSync(deliveriesCsvFilePath, 'utf8');
        const deliveriesData = parse(deliveriesCSV, {
          columns: true,
          skip_empty_lines: true,
          relax_column_count: true
        });
        return deliveriesData;
      } catch (error) {
        console.log(`Error retrieving deliveries.csv data. ${error}`);
      }
    }
  }
}

module.exports = getData;