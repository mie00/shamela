var should = require("should"),
    sinon = require('sinon');

var isNotAr = require('../../src/utils/encoding').isNotAr,
    Index = require('../../src/models/index.js');
var map = require('../../src/utils/objects').map;

var config = require('../../config');
config.dir = './Shamela-mock'

describe('Index model', function() {
    describe('constructor', function() {
        it('should return the index object', function(done) {
            var index = Index(160, {}, function(err, res) {
                done(res != index)
            });
        });
        it('should execute the callback', function(done) {
            var index = Index(160, {}, function(err, res) {
                done();
                res.close(function() {});
            });
        });
        it('should accept custom index dirs', function(done) {
            Index(160111, {
                dir: './'
            }, function(err, res) {
                done(err);
            })
        });
    });

    describe('instance', function() {
        var index;
        before(function(done) {
            Index(160, {}, function(err, res) {
                index = res;
                done(err);
            })
        })
        it('should resolve array of words', function(done) {
            index.indecies(['هو','الذي','عمو'], function(err, res) {
                res.should.be.an.Object();
                Object.keys(res).should.have.length(3);
                map(res, function(x, y) {
                    return y;
                }).should.matchEach(function(x) {
                    x.should.be.an.Array();
                    x.should.matchEach(function(page){
                        page.should.be.a.Number();
                    })
                });
                done(err);
            })
        });
    });
});
