var dbFactory = require('odbc'),
    util = require('util');

var arToUTF = require('../utils/encoding').arToUTF,
    config = require('../../config');

var cb = require('../../src/utils/functions').cb;
var map = require('../../src/utils/objects').map;

var Book = module.exports = function(id, options, callback) {

    options.dir = (options.dir) ? util.format('%s/%d.mdb', options.dir, id) : util.format('%s/Books/%d/%d.mdb', config.dir, id % 10, id);
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
    self.titles = function(callback) {
        db.query("SELECT * FROM title\0", cb(function(res) {
            return res.map(function(res) {
                res.tit = arToUTF(res.tit)
                return res;
            })
        }, callback));
    };
    self.ids = function(callback) {
        db.query("SELECT id FROM book\0", cb(function(res) {
            return res.map(function(res) {
                return res.id
            })
        }, callback));
    };
    self.flId = function(callback) {
        self.ids(cb(function(res) {
            return {
                first: Math.min.apply(Math, res),
                last: Math.max.apply(Math, res)
            };
        }, callback));
    };
    self.fId = function(callback) {
        self.flId(cb(function(res) {
            return res.first;
        }, callback));
    };
    self.lId = function(callback) {
        self.flId(cb(function(res) {
            return res.last;
        }, callback));
    };
    self.getStartId = function(obj, callback) {
        var criteria = map(obj, function(x, y) {
            return util.format('%s = %s', x, y)
        }).join(' AND ');
        db.query(util.format("SELECT id FROM book %s %s \0", criteria && 'where', criteria), cb(function(res) {
            return Math.min.apply(Math, res.map(function(res) {
                return res.id
            }))
        }, callback));
    };
    self.getWithId = function(id, callback) {
        db.query(util.format("SELECT * FROM book where id=%d \0", id), cb(function(res) {
        	map(res,function(x,y){
        		y.nass = arToUTF(y.nass);
        	});
            return (res.length == 0) ? null : res[0];
        }, callback));
    }
    self.goto = function(criteriaObj, callback) {
        self.getStartId(criteriaObj, function(err, id) {
            self.getWithId(id, cb(function(x) {
                return x;
            }, callback))
        })
    }
    self.open(callback);
    return self
};
