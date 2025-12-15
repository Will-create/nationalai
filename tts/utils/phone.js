// phone.js - Read phone numbers in Moore (Mòoré) language
const { spellnumber } = require('./spellnumber.js');

/**
 * Extracts phone numbers from text and converts them to Moore pronunciation
 * Intelligently handles country codes - reads them as complete numbers
 * @param {string} text - Text containing phone numbers
 * @returns {Array} Array of objects with original number and Moore pronunciation
 */
function readPhoneNumbers(text) {
  // Pattern to match phone numbers (various formats)
  const phonePattern = /\+?\d{1,4}[\s.-]?\d{2,4}[\s.-]?\d{2,4}[\s.-]?\d{2,4}[\s.-]?\d{0,4}/g;
  
  const matches = text.match(phonePattern);
  
  if (!matches) {
    return [];
  }
  
  const results = [];
  
  for (const match of matches) {
    const moorePronunciation = readSinglePhone(match);
    const digits = match.replace(/\D/g, '');
    
    results.push({
      original: match,
      digits: digits,
      moore: moorePronunciation,
      hasCountryCode: match.trim().startsWith('+')
    });
  }
  
  return results;
}

/**
 * Smart phone number reader that handles country codes intelligently
 * Country codes (1-3 digits after +) are read as-is, rest in pairs
 * @param {string} phoneNumber - Phone number to read
 * @returns {string} Moore pronunciation
 */
function readSinglePhone(phoneNumber) {
  // Check if phone starts with + (country code indicator)
  const hasPlus = phoneNumber.trim().startsWith('+');
  const digits = phoneNumber.replace(/\D/g, '');
  
  const groups = [];
  let startIndex = 0;
  
  // If has country code, identify and read it
  if (hasPlus && digits.length > 0) {
    // Common country codes: 1 (US/Canada), 33 (France), 226 (Burkina Faso), etc.
    // Try to intelligently detect country code length
    let countryCodeLength = 0;
    
    // Check for 3-digit country code (like 226)
    if (digits.length >= 3) {
      const threeDigit = parseInt(digits.substring(0, 3), 10);
      // Country codes 200-299 are 3 digits
      if (threeDigit >= 200 && threeDigit <= 299) {
        countryCodeLength = 3;
      }
    }
    
    // Check for 2-digit country code (like 33, 44, 49, etc.)
    if (countryCodeLength === 0 && digits.length >= 2) {
      const twoDigit = parseInt(digits.substring(0, 2), 10);
      // Country codes 20-99 (excluding 200s handled above)
      if (twoDigit >= 20 && twoDigit <= 99) {
        countryCodeLength = 2;
      }
    }
    
    // Check for 1-digit country code (like 1 for US/Canada)
    if (countryCodeLength === 0 && digits.length >= 1) {
      const oneDigit = parseInt(digits.substring(0, 1), 10);
      if (oneDigit === 1 || oneDigit === 7) {
        countryCodeLength = 1;
      }
    }
    
    // Read country code as a single number
    if (countryCodeLength > 0) {
      const countryCode = digits.substring(0, countryCodeLength);
      groups.push(spellnumber(parseInt(countryCode, 10)));
      startIndex = countryCodeLength;
    }
  }
  
  // Read remaining digits in pairs
  for (let i = startIndex; i < digits.length; i += 2) {
    const pair = digits.slice(i, i + 2);
    if (pair.length === 2) {
      groups.push(spellnumber(parseInt(pair, 10)));
    } else if (pair.length === 1) {
      groups.push(spellnumber(pair));
    }
  }
  
  return groups.join(', ');
}

/**
 * Reads phone number with grouping (common in Burkina Faso: XX XX XX XX)
 * @param {string} phoneNumber - Phone number to read
 * @returns {string} Moore pronunciation with pauses between groups
 */
function readPhoneWithGroups(phoneNumber) {
  // This function now does the same as readSinglePhone
  // since the standard way in Burkina Faso is 2 by 2
  return readSinglePhone(phoneNumber);
}

module.exports = { 
  readPhoneNumbers, 
  readSinglePhone, 
  readPhoneWithGroups 
};