var cb = function(fn,callback) {
    return function(err, res) {
        if (err) callback(err);
        else {
            callback(null, fn(res))
        }
    }
}
module.exports = {
	cb:cb,
}