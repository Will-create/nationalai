require('total5');
const { spellnumber } = require('./spellnumber.js');
const { readSinglePhone } = require('./phone.js');
const config = require('../config.js');
const { replaceAcronymsWithMoore } = require('./acronym.js');
const Fs = F.Fs;
const TIMEOUT = 65000;
const OUTPUT_PATH = 'output/deepgram_tts_it.mp3';

const MODEL = 'aura-2-dionisio-it';
const APIKEY = '3bfcd5f0f8fc6798f5398c724893b3eed3c166c6';
const URL = 'https://api.deepgram.com/v1/speak?model=' + MODEL;

var replace_map = config.replacement_map || {};

// convert text using replace_map
function replacePhoneNumbersWithMoore(text) {
    // Pattern to match phone numbers (various formats)
    const phonePattern = /(\+?\d{1,4}[\s.-]?)?\d{2,4}[\s.-]?\d{2,4}[\s.-]?\d{2,4}[\s.-]?\d{0,4}/g;
    
    var replacedText = text.replace(phonePattern, function(match) {
        // Only process if it looks like a real phone number (at least 8 digits)
        const digits = match.replace(/\D/g, '');
        
        if (digits.length >= 8) {
            const moorePhone = readSinglePhone(match);
            return moorePhone;
        }
        
        return match; // Keep original if not enough digits
    });
    
    return replacedText;
}

/**
 * Detects and replaces standalone numbers with Moore pronunciation
 * Excludes numbers that are part of phone numbers
 * @param {string} text - Text containing numbers
 * @returns {string} Text with numbers replaced
 */
function replaceNumbersWithMoore(text) {
    // Pattern to match standalone numbers (not part of phone numbers)
    // This will match numbers that are surrounded by spaces or punctuation
    const numberPattern = /\b(\d+)\b/g;
    
    var replacedText = text.replace(numberPattern, function(match) {
        // Skip very long numbers (likely already processed phone numbers)
        if (match.length > 4) {
            return match;
        }        
        const mooreNumber = spellnumber(parseInt(match, 10));
        return mooreNumber;
    });
    
    return replacedText;
}



function processTextWithMoore(text) {
    // First, replace phone numbers
    var processedText = replacePhoneNumbersWithMoore(text);
    // Then, replace remaining standalone numbers
    processedText = replaceNumbersWithMoore(processedText);

    return processedText;
}



var tts = function(text) {
	return new Promise(function(resolve, reject) {

		RESTBuilder
			.POST(URL, { text: text })   // ✅ FIXED: Only send 'text' in body
			.timeout(TIMEOUT)
			.keepalive()
			.header('Authorization', 'Token ' + APIKEY)
			.stream(function(err, res) {
                if (err) {
                    console.error('TTS STREAM ERROR:', err);
                    return reject(err);
                }

                let stream = res.stream;
				var chunks = [];

                stream.on('data', function(chunk) {
                    chunks.push(chunk);
                });

                stream.on('end', function() {
                    var audio = Buffer.concat(chunks);
                    console.log('TTS audio length:', audio.length);
                    resolve(audio);
                });

                stream.on('error', function(err) {
                    reject(err);
                }); 
			});
	});
};

function convert(input_text) {
	try {
        // Step 1: Replace phone numbers and numbers with Moore
        input_text = processTextWithMoore(input_text);
        // Step 2: Apply character replacements for TTS
        // input_text = replaceAcronymsWithMoore(input_text);
        for (var key in replace_map) {
            var value = replace_map[key];    
            var regex = new RegExp(key, 'g');
            input_text = input_text.replace(regex, value);
        }
        return input_text;
	} catch (e) {
		console.error('DEEPGRAM TTS FAILED:', e);
	}
}


//convert();
module.exports = {
    convert
}