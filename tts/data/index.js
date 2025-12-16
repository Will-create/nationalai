const inputFile = 'output/raamde-bf_separated.json';
const outputFile = 'output/raamde-bf_final.json';
const convertedOutputFile = 'output/raamde-bf_final_converted.json';
const utils = require('../utils/index.js');
const fs = require('fs');

// Read the JSON file
const data = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

console.log(`Loaded ${data.length} documents from ${inputFile}`);


// loop through each document and perform final processing
const finalResults = data.map(doc => {
  // Here you can add any final processing needed
  // For example, just return the document as is for now
  return { id: doc.id, text: doc.moore};
});

// Write the final results to the output file
fs.writeFileSync(outputFile, JSON.stringify(finalResults, null, 2));

// Also create a converted version using utils.convert
const convertedResults = finalResults.map(doc => {
  return { id: doc.id, original: doc.text, converted: utils.convert(doc.text)};
});
fs.writeFileSync(convertedOutputFile, JSON.stringify(convertedResults, null, 2));

console.log(`Final results written to ${outputFile} and converted results to ${convertedOutputFile}`);