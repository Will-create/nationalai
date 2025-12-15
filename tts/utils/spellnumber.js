// spell (Mòoré) Number Generator - Corrected Algorithm
// Zero error tolerance - matches reference mapping exactly

const UNITS = {
  1: 'yembre',
  2: 'yiibu',
  3: 'taanbo',
  4: 'naanse',
  5: 'nu',
  6: 'yoobe',
  7: 'yopoe',
  8: 'nii',
  9: 'wai'
};

const TENS = {
  10: 'piiga',
  20: 'pisi',
  30: 'pistan',
  40: 'pisnaanse',
  50: 'pisnu',
  60: 'pisyoobe',
  70: 'pisyopoe',
  80: 'pisnii',
  90: 'piswai'
};

const HUNDREDS = {
  100: 'koabga',
  200: 'kobs-i',
  300: 'kobs-tan',
  400: 'kobs-naanse',
  500: 'kobs-nu',
  600: 'kobs-yoobe',
  700: 'kobs-yopoe',
  800: 'kobs-nii',
  900: 'kobs-wai'
};

function spell(n) {

    if (typeof n === 'string') {
        const leadingZeros = n.match(/^0+/);
        if (leadingZeros) {
        const zeroCount = leadingZeros[0].length;
        const remainingNumber = n.slice(zeroCount);
        
        // Generate 'zaalem' repeated for each leading zero
        const zeroWords = Array(zeroCount).fill('zaalem').join(' la ');
        
        // If there's a remaining number, append it
        if (remainingNumber && remainingNumber !== '0') {
            return zeroWords + ' la ' + spell(parseInt(remainingNumber, 10));
        }
        
        // If only zeros, return the zero words
        return zeroWords;
    }
    
    // No leading zeros, convert to number and continue
    n = parseInt(n, 10);
  }


  if (n === 0) return 'zaalem';
  if (n < 0) return 'negative ' + spell(-n);
  
  // handle the case where first digit is zero. e.g 07 ->



  // Direct lookup for units 1-9
  if (n >= 1 && n <= 9) return UNITS[n];
  
  // Tens: 10, 20, 30, etc.
  if (n >= 10 && n <= 90 && n % 10 === 0) return TENS[n];
  
  // Teens and compound tens (11-99)
  if (n >= 11 && n <= 99) {
    const tens = Math.floor(n / 10) * 10;
    const units = n % 10;
    const tensWord = tens === 10 ? 'piig' : TENS[tens];
    return `${tensWord} la a ${UNITS[units]}`;
  }
  
  // Hundreds: 100, 200, 300, etc.
  if (n >= 100 && n <= 900 && n % 100 === 0) return HUNDREDS[n];
  
  // Compound hundreds (101-999)
  if (n >= 101 && n <= 999) {
    const hundreds = Math.floor(n / 100) * 100;
    const remainder = n % 100;
    const hundredsWord = hundreds === 100 ? 'koabg' : HUNDREDS[hundreds];
    
    if (remainder < 10) {
      return `${hundredsWord} la a ${UNITS[remainder]}`;
    } else if (remainder % 10 === 0) {
      return `${hundredsWord} la ${TENS[remainder]}`;
    } else {
      // Compound: hundreds + tens + units
      const tens = Math.floor(remainder / 10) * 10;
      const units = remainder % 10;
      const tensWord = tens === 10 ? 'piig' : TENS[tens];
      return `${hundredsWord} la ${tensWord} la a ${UNITS[units]}`;
    }
  }
  
  // Thousands: 1000-999,999
  if (n >= 1000 && n < 1000000) {
    const thousands = Math.floor(n / 1000);
    const remainder = n % 1000;
    
    let thousandsWord;
    if (thousands === 1) {
      thousandsWord = 'tuusri';
    } else if (thousands >= 2 && thousands <= 9) {
      thousandsWord = `tuusa ${UNITS[thousands]}`;
    } else if (thousands >= 10 && thousands <= 99) {
      if (thousands % 10 === 0) {
        thousandsWord = `tuus-${TENS[thousands]}`;
      } else {
        const tThousands = Math.floor(thousands / 10) * 10;
        const tUnits = thousands % 10;
        thousandsWord = `tuus-${TENS[tThousands]} la a ${UNITS[tUnits]}`;
      }
    } else if (thousands >= 100 && thousands <= 999) {
      const tHundreds = Math.floor(thousands / 100) * 100;
      const tRemainder = thousands % 100;
      
      if (tRemainder === 0) {
        thousandsWord = `tuus-${HUNDREDS[tHundreds]}`;
      } else if (tRemainder < 10) {
        const hWord = tHundreds === 100 ? 'koabg' : HUNDREDS[tHundreds];
        thousandsWord = `tuus-${hWord} la a ${UNITS[tRemainder]}`;
      } else if (tRemainder % 10 === 0) {
        const hWord = tHundreds === 100 ? 'koabg' : HUNDREDS[tHundreds];
        thousandsWord = `tuus-${hWord} la ${TENS[tRemainder]}`;
      } else {
        const tTens = Math.floor(tRemainder / 10) * 10;
        const tUnits = tRemainder % 10;
        const hWord = tHundreds === 100 ? 'koabg' : HUNDREDS[tHundreds];
        const tensWord = tTens === 10 ? 'piig' : TENS[tTens];
        thousandsWord = `tuus-${hWord} la ${tensWord} la a ${UNITS[tUnits]}`;
      }
    }
    
    if (remainder === 0) return thousandsWord;
    
    // Connect thousands with remainder
    const connector = remainder < 10 ? ' la a ' : ' la ';
    return thousandsWord + connector + spell(remainder);
  }
  
  // Millions: 1,000,000 - 999,999,999
  if (n >= 1000000 && n < 1000000000) {
    const millions = Math.floor(n / 1000000);
    const remainder = n % 1000000;
    
    let millionsWord;
    if (millions === 1) {
      millionsWord = 'miliyon';
    } else if (millions >= 2 && millions <= 9) {
      millionsWord = `miliyon ${UNITS[millions]}`;
    } else if (millions >= 10 && millions <= 99) {
      if (millions % 10 === 0) {
        millionsWord = `miliyon ${TENS[millions]}`;
      } else {
        const mTens = Math.floor(millions / 10) * 10;
        const mUnits = millions % 10;
        const tensWord = mTens === 10 ? 'piig' : TENS[mTens];
        millionsWord = `miliyon ${tensWord} la a ${mUnits}`;
      }
    } else if (millions >= 100 && millions <= 999) {
      const mHundreds = Math.floor(millions / 100) * 100;
      const mRemainder = millions % 100;
      
      if (mRemainder === 0) {
        millionsWord = `miliyon ${HUNDREDS[mHundreds]}`;
      } else {
        millionsWord = `miliyon ${HUNDREDS[mHundreds]} la ${spell(mRemainder)}`;
      }
    }
    
    if (remainder === 0) return millionsWord;
    
    const connector = remainder < 1000 ? ' la ' : ' la ';
    return millionsWord + connector + spell(remainder);
  }
  
  // Billions: 1,000,000,000+
  if (n >= 1000000000) {
    const billions = Math.floor(n / 1000000000);
    const remainder = n % 1000000000;
    
    let billionsWord;
    if (billions === 1) {
      billionsWord = 'miliyar';
    } else {
      billionsWord = `miliyar a ${spell(billions)}`;
    }
    
    if (remainder === 0) return billionsWord;
    return billionsWord + ' la ' + spell(remainder);
  }
  
  return '';
}


module.exports = { spellnumber: spell };