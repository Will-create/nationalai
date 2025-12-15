const utils = require('./utils/index.js');



var input_text = `Yʋʋm-sar kiuug rasem a 4 yʋʋm 2025 soabã Burkĩna Faso tʋʋm-noor ning sẽn get kibay kũun na tũ sorã taoor soab a Wẽndengũudi Lui Modɛɛs Wedraoog zẽka a naoor n tɩ zĩnd Memoryall Toma Sãnkara tɩ b maan kiuug pʋgẽ pipi lamus b sẽn yãk n waoogd a Toma Sãnkar ne a tũud-n-taas piig la a yiibã b sẽn kʋ wã waoor tẽegre. Lamusã yʋʋm-sar kiuug rasem a 4 soabã yɩ a tẽegrã naoor a yiib soaba. Tẽeg-kãng soabã yaa Seɛsse CSC taoor rãmba, la kiba-kɩtbã ne Minitɛɛr dãmbã n maan-a.`;


// convert text to Moore pronunciation
let pronunciation = utils.convert(input_text);
console.log('Moore Pronunciation:\n', pronunciation);
