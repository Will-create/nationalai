require('total5');
var path = 'output/raamde-bf_draft.json';
var server = '';
var token = '';
var folder = 'Language models';
var ownerid = 'IW5XDs1cD61f';
var users = ['chris@totaljs.com', 'fadilah@gmail.com', 'kienteganourdine72@gmail.com', 'louisbertson@gmail.com', 'ouedjosa47@gmail.com'];
F.Fs.readFile(path, 'utf-8', function(err, response) {

    var items = response.parseJSON(true);

    var index = 0;
    items.wait(function(item, next) {
        index++;
        item.name = 'Text ' + index;
        item.dtcreated = NOW;
        item.complete = false;
        
        var ticket = {};

        ticket.name = item.name;
        ticket.translate1 = item.value;
        ticket.folder = folder;
        ticket.ownerid = ownerid;
        ticket.istranslate = true;
        ticket.users = users;

        RESTBuilder.POST(server, { schema: 'tickets_create', data: ticket }).header('x-token', token).keepalive().callback(function(err, res) {
            console.log(err, res);
            next();
        })
    }, function() {
        console.log('Done');
    });
});
