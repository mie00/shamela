var iconv  = require('iconv-lite');

var arToUTF = function(x) {
    return iconv.decode(iconv.encode(x, 'WINDOWS-1252'), 'WINDOWS-1256');
}
var isNotAr = function(x) {
    return arToUTF(x.replace(/\?/g,'')).indexOf('?')!=-1;
}
module.exports = {
	arToUTF:arToUTF,
	isNotAr:isNotAr,
}