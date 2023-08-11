// written by Annabella Riley
// use to stream static csv data from vitalRecorder batch export
// run npm install csv-parser in terminal
// run npm install readline in terminal

const fs = require('fs');
const csvParser = require('csv-parser');
const readline = require('readline');

let csvData = [];

fs.createReadStream('Public/GameTest.csv')
  .pipe(csvParser())
  .on('data', (row) => {
    csvData.push(row);
  })
  .on('end', () => {
    console.log('CSV data loaded.');
  });

let row = 0;

function emitRow(socket) {
    if (csvData.length === 0) {
      // emit empty if no data
      socket.emit('csv_data', {});
      return;
    } else {
    // emit row
    socket.emit('csv_data', csvData[row]);
    }
    // increment row or reset if end
    row = (row + 1) % csvData.length;
}

module.exports = emitRow;
