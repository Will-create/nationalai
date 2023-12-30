require('total5');
const cheerio = require('cheerio');
const { RESTBuilder } = require('total5/builders');
const MOS_FR = 'mos-fr';
const MOS_EN = 'mos-en';
const OUTPUT_PATH = '../../output/webonary2.json';
const TIMEOUT = 15000;

var letters = ['-', 'a', 'ã', 'b', 'd', 'e', 'ẽ', 'f', 'g', 'h', 'k', 'l', 'm', 'n', 'o', 'õ', 'p', 'r', 's', 't', 'ũ', 'v', 'w', 'y', 'z'];
var urls = [];
var baseurl = 'https://www.webonary.org/moore/browse/browse-vernacular-english/?key=mos&letter={0}&lang=en';
var url;
var words = [];
letters.wait(async function(letter, next) {
    url = baseurl.format(encodeURIComponent(letter));
    
  RESTBuilder.GET(url).keepalive().timeout(60000).callback(function(err, res, output) {

        var html = output.response;
        var $ = cheerio.load(html);

        var number = $('#wp_page_numbers > ul > li.page_info').text().split(' ').last().parseInt();
        var urls = [];
        for (var i = 0;  i < number; i++) 
            urls.push(url + '&totalEntries=61&pagenr=' + (i + 1));

        urls.wait(function(item, next_fn) {
            RESTBuilder.GET(item).keepalive().timeout(60000).callback(function(er, res, out) {
                var html = out.response;
                var $ = cheerio.load(html);
                var posts = $('.post') || [];
        
                var index = 0; 
                posts && posts.each(function() {
                    index += 1;
                    
                    var is = false;
                    var post = $(this);
                    var obj = {};
        
                    var name = post.find('span.mainheadword > span > span');
                    //var url = post.find('span.mainheadword > span >')('href');
                    if (name.length == 2) 
                        obj.name = $(name[0]).text();
                    else 
                        obj.name = post.find('span.mainheadword > span >  a').text();
        
                    obj.hasaudio = false;
                    obj.audio = '-';
        
                    var audio = post.find('span.lexemeform > span > audio > source').attr('src');
        
                   
                    if (audio) {
                        obj.audio = audio;
                        obj.hasaudio = true;
                    }
                
        
                    var frs = post.find('span.senses > span.sensecontent > span > span.gloss > span:nth-child(2)').text().split(',');
                    var ens = post.find('span.senses > span.sensecontent > span > span.gloss > span:nth-child(4)').text().split(',');
        
        
                    if (!obj.name)
                        obj.name = post.find('span.mainheadword > span > span > a').text();
        
             
                    frs.forEach(function(fr) {
                        var o = CLONE(obj);
                        o.type = MOS_FR;
                        o.value = fr.trim();
                        o.name && words.push(o);
        
                    });
        
                    ens.forEach(function(en) {
                        var o = CLONE(obj);
                        o.type = MOS_EN;
                        o.value = en.trim();
                        o.name && words.push(o);
                    });
        
                    var contents = post.find('span.sensecontent');
        
                    if (contents.length > 1) { 
                        is = true;
                        var i = 0;
                        var sense = post.find('span.sensecontent')[1];
                        var examples = $(sense).find('span.examplescontents');
                        
                        examples.each(function() {
                         var self = $(this);
                         var name = self.find('span.example > span').text();
                         var fr = self.find('span.translationcontents > span > span > span:nth-child(2)').text();
                         var en = self.find('span.translationcontents > span > span > span:nth-child(4)').text();
                            name && words.push({name: name, audio: '-', hasaudio: false, type: MOS_EN, value: en.trim() });
                            name && words.push({name: name, audio: '-', hasaudio: false, type: MOS_FR, value: fr.trim() });
                        });
                    }
                });

                next_fn();
            });

        }, function() {
            console.log('Letter = {0}; count = {1}'.format(letter, words.length));
                next();
    
        });        
        
  });

}, function() {
    setTimeout(function() {
        console.log('Total = ', words.length);
        F.Fs.writeFile(OUTPUT_PATH, JSON.stringify(words, null, 2),function() {
           console.log('done');
        });

    }, TIMEOUT);
});
