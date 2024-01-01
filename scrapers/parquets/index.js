var fs = require('fs');
var path = 'output/translation.json';

fs.readFile(path, 'utf8', function(err, response) {
    console.log(JSON.parse(response));
});