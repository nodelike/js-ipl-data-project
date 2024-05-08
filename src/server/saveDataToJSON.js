const fs = require('fs');
const path = require('path');

function saveDataToJSON(data, fileName){
    const outputFilePath = path.join(__dirname, '..', 'public', 'output', fileName);
    const jsonData = JSON.stringify(data, null, 2);

    fs.writeFile(outputFilePath, jsonData, 'utf8', (err) => {
        if (err) {
        callback(err);
        return;
        }
    });
}

module.exports = saveDataToJSON;