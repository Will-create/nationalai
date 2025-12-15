// acronym.js - Read acronyms in Moore (Mòoré) language

// Map of capital letters to their Moore pronunciation
// TODO: Fill in the Moore pronunciation for each letter
const LETTER_SOUNDS = {
  'A': 'a',      // Fill with Moore pronunciation
  'B': 'be',     // Fill with Moore pronunciation
  'C': 'se',     // Fill with Moore pronunciation
  'D': 'de',     // Fill with Moore pronunciation
  'E': 'e',      // Fill with Moore pronunciation
  'F': 'ef',     // Fill with Moore pronunciation
  'G': 'ze',     // Fill with Moore pronunciation
  'H': 'as',     // Fill with Moore pronunciation
  'I': 'i',      // Fill with Moore pronunciation
  'J': 'zi',     // Fill with Moore pronunciation
  'K': 'ka',     // Fill with Moore pronunciation
  'L': 'el',     // Fill with Moore pronunciation
  'M': 'em',     // Fill with Moore pronunciation
  'N': 'en',     // Fill with Moore pronunciation
  'O': 'o',      // Fill with Moore pronunciation
  'P': 'pe',     // Fill with Moore pronunciation
  'Q': 'ky',     // Fill with Moore pronunciation
  'R': 'er',     // Fill with Moore pronunciation
  'S': 'es',     // Fill with Moore pronunciation
  'T': 'te',     // Fill with Moore pronunciation
  'U': 'y',      // Fill with Moore pronunciation
  'V': 've',     // Fill with Moore pronunciation
  'W': 'dubleve',// Fill with Moore pronunciation
  'X': 'iks',    // Fill with Moore pronunciation
  'Y': 'igrek',  // Fill with Moore pronunciation
  'Z': 'zed'     // Fill with Moore pronunciation
};

/**
 * Detects if a word is an acronym (all capital letters, 2+ characters)
 * @param {string} word - Word to check
 * @returns {boolean} True if acronym
 */
function isAcronym(word) {
  // Remove common punctuation
  const cleaned = word.replace(/[.,;:!?()'"]/g, '');
  
  // Check if it's all uppercase letters and at least 2 characters
  return /^[A-Z]{2,}$/.test(cleaned);
}

/**
 * Reads an acronym letter by letter in Moore
 * @param {string} acronym - Acronym to read
 * @returns {string} Moore pronunciation
 */
function readAcronym(acronym) {
  // Remove punctuation
  const cleaned = acronym.replace(/[.,;:!?()'"]/g, '');
  
  const letters = cleaned.split('');
  const sounds = [];
  
  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i].toUpperCase();
    if (LETTER_SOUNDS[letter]) {
      sounds.push(LETTER_SOUNDS[letter]);
    } else {
      // If letter not in map, keep original
      sounds.push(letter.toLowerCase());
    }
  }
  
  return sounds.join(' ');
}

/**
 * Scans text and replaces all acronyms with Moore pronunciation
 * @param {string} text - Text to process
 * @returns {string} Text with acronyms replaced
 */
function replaceAcronymsWithMoore(text) {
  // Split text into words while preserving spaces and punctuation
  const words = text.split(/(\s+)/);
  
  const processedWords = words.map(function(word) {
    // Skip whitespace
    if (/^\s+$/.test(word)) {
      return word;
    }
    
    // Check if word is an acronym
    if (isAcronym(word)) {
      const mooreAcronym = readAcronym(word);
      return mooreAcronym;
    }
    
    return word;
  });
  
  return processedWords.join('');
}

/**
 * Finds all acronyms in text
 * @param {string} text - Text to scan
 * @returns {Array} Array of found acronyms with their Moore pronunciation
 */
function findAcronyms(text) {
  const words = text.split(/\s+/);
  const acronyms = [];
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (isAcronym(word)) {
      const cleaned = word.replace(/[.,;:!?()'"]/g, '');
      acronyms.push({
        original: word,
        acronym: cleaned,
        moore: readAcronym(word),
        position: i
      });
    }
  }
  
  return acronyms;
}

module.exports = { 
  LETTER_SOUNDS,
  isAcronym,
  readAcronym, 
  replaceAcronymsWithMoore,
  findAcronyms 
};