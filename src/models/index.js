var dbFactory = require('odbc'),
    util = require('util');

var arToUTF = require('../utils/encoding').arToUTF,
    UTFToAr = require('../utils/encoding').UTFToAr,
    config = require('../../config');

var cb = require('../../src/utils/functions').cb;
var map = require('../../src/utils/objects').map;

var Index = module.exports = function(id, options, callback) {

    options.dir = (options.dir) ? util.format('%s/%d.mdb', options.dir, id) : util.format('%s/Indices/%d/%d.mdb', config.dir, id % 10, id);
    var self = {};
    var db = dbFactory();
    self.open = function(callback) {
        var cn = util.format('DRIVER={MDB};CHARSET=CP1256;DBQ=%s', options.dir);
        db.open(cn, function(err) {
            if (err) callback(err);
            else {
                self.is_opened = true;
                callback(null, self)
            }
        });
    };
    self.close = function(callback) {
        db.close(function(err) {
            if (!err)
                self.is_opened = false;
            callback(err);
        });
    };
    self.is_opened = false;
    self.indecies = function(words, callback) {
        if (!words.length) callback(null, []);
        else
            db.query(util.format("SELECT * FROM Ix Where %s\0", words.map(function(x) {
                return util.format("wrd='%s'", UTFToAr(x));
            }).join(' OR ')), cb(function(res) {
                var ret = {};
                words.forEach(function(word) {
                    var key = word;
                    var val = [];
                    ret[key] = val;
                })
                res.forEach(function(res) {
                    var key = arToUTF(res.wrd);
                    var val = res.pos.split('@').map(Number);
                    ret[key] = val;
                })
                return ret;
            }, callback));
    };
    self.open(callback);
    return self
};
