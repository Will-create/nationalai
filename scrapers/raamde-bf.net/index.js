require('total5');
const cheerio = require('cheerio');
const OUTPUT_PATH = 'output/raamde-bf_draft.json';
const TIMEOUT = 65000;

var baseurl = 'https://raamde-bf.net/';
var urls = [];
var items = [];
var texts = [];
var number = 0;


var request = function (url) {
   return new Promise(function(resolve) {
        RESTBuilder.GET(url).keepalive().timeout(TIMEOUT).callback(function(err, res, output) {
            var html = output.response;
            var $ = cheerio.load(html);
            resolve($);
        });
   });
}

var generate_urls = function(n, str) {
    var arr = [];
    return new Promise(function(resolve) {
        for (var i = 0; i < n; i++) {
            var p = i + 1;
    
            if (p < 2)
                arr.push(str)
            else
                arr.push(str + 'page/' + p)
    
        }

        resolve(arr);

    
    })
}

async function main() {
    var $ = await request(baseurl);

    var element = $('a.page-numbers')[1];
    number = $(element).text().parseInt()
    console.log(number);


    urls = await generate_urls(number, baseurl);

    console.log(urls);
    urls && urls.wait(async function(url, next_fn) {
       var $$ = await request(url, baseurl);

       $$('#blog-entries article').each(function() {
        var el = $$(this);
        var href  = el.find('a').attr('href');

        href && items.push(href);
        })
        next_fn();

    }, function() {
        // console.log('ITEMS ===> ', items);

         items && items.wait(async function(item, next) {
            var $$$ = await request(item);

            var text = $$$('#main > article > div.entry-content').text();

            texts.push({ id: UID(), value: text });
            next();
        }, function() {
            console.log('TEXTS ===> ', texts.length);
            setTimeout(function() {
                console.log('Total = ', texts.length);
                F.Fs.writeFile(OUTPUT_PATH, JSON.stringify(texts, null, 2),function() {
                   console.log('done');
                });
            }, TIMEOUT);

        });
    })
    
}

main();
