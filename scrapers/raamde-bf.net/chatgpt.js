require('total5');
var cheerio = require('cheerio');
var system_prompt = 'You are moore and french expert. I need you to do a job for me. You will take a single text that contains translated moore and french texts and devide it in two for me. Format it in json and output only json string (no comment, nothing more). Expected is object with `french` and `more`. In addition try to resolve `title_french` and `title_moore`  too';
var gpt_url = 'https://api.openai.com/v1/chat/completions';
var gpt_model = 'gpt-4-1106-preview';
var gpt_apikey = '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';
var path = 'output/raamde-bf_draft.json';
const TIMEOUT = 300000;
var system = { role: 'system', content: system_prompt };
var message = { role: 'user' };
var reply;


F.Fs.readFile(path,'utf-8', function(err, data) {
    
    var items = JSON.parse(data);
    
    var index = 0;
    
    items && items.wait(function(item, next_fn) {
        var messages = [];
        messages.push(system);
        index++;
        message.content = item.value;
        messages.push(message);

        RESTBuilder.POST(gpt_url, { temperature: 0.8, model: gpt_model, messages: messages }).header('Authorization', 'Bearer ' + gpt_apikey).timeout(TIMEOUT).keepalive().callback(async function(err, res) {
            if (err) {
                console.log(err);
                return;
            }

            if (res.choices)
                reply = res.choices[0].message;

            reply && console.log(reply);

            if (index == 3)
                next_fn('cancel');
            else
                next_fn()
        });
    }, function() {

    });
});