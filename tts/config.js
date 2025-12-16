const REPLACEMENT_MAP = {
    'ũu': 'uu',
    'ũ': 'u',
    'ɩ': 'i',
    'ɛɛ': 'ee',
    'ɛ': 'e',
    'ãa': 'aa',
    'ã': 'a',
    'Ã': 'A',
    'ĩ': 'i',
    'ʋʋ': 'uu',
    'ʋ': 'u',
    'ẽ': 'ei',
    'é': 'e',
    ' N ': ' On ',
    ' n ': ' on ',
    ' b ': ' ub ',
    ' B ': ' Ub ',
    'õo': 'oon',
    'õ': 'on',
    ' y ': 'i ',
    ' Y ': 'I ',
    '-': ' ',
    ' a ': ' a ',
    ' A ': ' A ',
    'gb': 'geb',
    'gf': 'gef',
    'bg': 'beg',
    '%': ' koabeg pogei',
    '\n\t\t\n': '',
    '\n\n': ' ',
    '\n': '. ',
    '\r\r': '',
    '\r': '',
    '\t\t': ' ',
    '\t': '. '
};


module.exports = {
    lang: 'moore',
    reference_language: 'swahili',
    replacement_map: REPLACEMENT_MAP
}