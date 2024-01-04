require('total5');

var path = 'output/raamde-bf_draft.json';
var dbname = 'nosql/pages';
F.Fs.readFile(path, 'utf-8', function(err, response) {

    var items = response.parseJSON(true);

    var index = 0;
    items.wait(function(item, next) {
        index++;

        item.name = 'Text ' + index;
        item.dtcreated = NOW;
        item.complete = false;
        
        DATA.insert(dbname, item, true).where('id', item.id).callback(function() { 
            next();
        })
    }, function() {
        console.log('Done');
    });
});
