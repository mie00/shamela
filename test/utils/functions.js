var functions = require('../../src/utils/functions');


describe('Functions module', function() {
    describe('cb function', function() {
        it('should map the input to a callback', function(done) {
            functions.cb(function(x) {
                return x * x
            }, function(err, x) {
                done(err && x != 2)
            })(null, 1);
        });
        it('should map the error to a callback and not execute the function', function(done) {
            functions.cb(function(x) {
                return x * x;
            }, function(err, x) {
                done(err!=1 || x)
            })(1, 1);
        });
    });
});
