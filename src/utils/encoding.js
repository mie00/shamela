var iconv  = require('iconv-lite');

var arToUTF = function(x) {
	var a = iconv.encode(x, 'WINDOWS-1252');
	var i;
	if(~(i = a.toString().indexOf('\0')))a = a.slice(0,i)
    return iconv.decode(a, 'WINDOWS-1256');
}
var isNotAr = function(x) {
    return arToUTF(x.replace(/\?/g,'')).indexOf('?')!=-1;
}
module.exports = {
	arToUTF:arToUTF,
	isNotAr:isNotAr,
}