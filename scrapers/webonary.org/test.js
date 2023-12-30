require('total5');
var path = 'output/webonary.json';

F.Fs.readFile(path,'utf-8', function(err, data) {
    console.log(JSON.parse(data));
    var reader = U.reader(JSON.parse(data));

});