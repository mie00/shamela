var map = function(obj,cb){
	return Object.keys(obj).map(function(x){
		return cb(x,obj[x])
	})
}
module.exports = {
	map:map,
}
