var should = require("should"),
    sinon = require('sinon');

var isNotAr = require('../../src/utils/encoding').isNotAr,
    Book = require('../../src/models/book.js');

var config = require('../../config');
config.dir = './Shamela-mock'

describe('Book model', function() {
    describe('constructor', function() {
        it('should return the book object', function(done) {
            var book = Book(3685, {}, function(err, res) {
                done(res != book)
                res.close(function() {});
            });
        });
        it('should execute the callback', function(done) {
            var book = Book(3685, {}, function(err, res) {
                done();
                res.close(function() {});
            });
        });
        it('should accept custom book dirs', function(done) {
            Book(3685111, {
                dir: './'
            }, function(err, res) {
                done(err);
                res.close(function() {});
            })
        });
    });

    describe('instance', function() {
        var book;
        before(function(done) {
            Book(170, {}, function(err, res) {
                book = res;
                done(err);
            })
        })
        after(function(done) {
            book.close(done);
        })
        it('should get all titles with ids', function(done) {
            book.titles(function(err, res) {
                res.should.be.an.Array();
                done(err)
            })
        });
        it('should get titles encoded in utf-8', function(done) {
            book.titles(function(err, res) {
                res[0].tit.should.be.a.String();
                isNotAr(res[0].tit).should.be.true()
                done(err)
            })
        });
        it('should get ids', function(done) {
            book.ids(function(err, ids) {
                ids.should.containDeep([4, 10, 1003])
                ids.should.not.containDeep([3])
                done(err);
            })
        });
        it('should get first,last id', function(done) {
            book.flId(function(err, ids) {
                ids.first.should.equal(4);
                ids.last.should.equal(7110);
                done(err);
            })
        });
        it('should get first id', function(done) {
            book.fId(function(err, first) {
                first.should.equal(4);
                done(err);
            })
        });
        it('should get last id', function(done) {
            book.lId(function(err, last) {
                last.should.equal(7110);
                done(err);
            })
        });
        it('should move get start id of a give criteria', function(done) {
            book.getStartId({
                part: 1,
                page: 10
            }, function(err, res) {
                done(res != 49);
            })
        });
        it('should get a page with specific id', function(done) {
            book.getWithId(49, function(err, res) {
                // res.should.not.be.empty();
                // res.should.matchEach(function(res) {
                res.should.be.an.Object();
                res.should.have.ownProperty('id');
                res.id.should.be.a.Number();
                res.id.should.equal(49);
                res.should.have.ownProperty('nass');
                res.nass.should.be.a.String();
                // });
                done(err)
            })
        });
        it('should get a page with the right encoding', function(done) {
            book.getWithId(49, function(err, res) {
                // res.should.not.be.empty();
                // res.should.matchEach(function(res) {
                res.should.have.ownProperty('nass');
                res.nass.should.be.a.String();
                isNotAr(res.nass).should.be.true()

                // });
                done(err)
            })
        });
        it('should return an error when id not matched', function(done) {
            book.getWithId(-1, function(err, res) {
                // res.should.be.empty();
                err.should.not.be.null();
                done()
            })
        });
        it('should get page with a specific criteria', function(done) {
            this.slow()
            book.goto({
                part: 1,
                page: 10
            }, function(err, res) {
                // res.should.not.be.empty();
                // res.should.matchEach(function(res) {
                res.should.be.an.Object();
                res.should.have.ownProperty('id');
                res.id.should.equal(49);
                // });
                done(err)
            })
        });
        it('should get the first page with no criteria', function(done) {
            this.slow()
            book.goto({}, function(err, res) {
                // res.should.not.be.empty();
                // res.should.matchEach(function(res) {
                res.should.be.an.Object();
                res.should.have.ownProperty('id');
                res.id.should.equal(4);
                // });
                done(err)
            })
        });
        it('should be closable', function(done) {
            var book = Book(3685, {}, function(err, res) {
                res.close(function() {
                    book.is_opened.should.be.false();
                    should(err).be.null();
                    res.titles(function(err) {
                        should(err).not.be.null();
                        done()
                    });
                });
            });
        });
    });
});
