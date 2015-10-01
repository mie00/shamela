var encoding = require('../../src/utils/encoding');


describe('Encoding module', function() {
    describe('isNotAr function', function() {
        it('should return true for UTF encoded string', function() {
        	encoding.isNotAr('أ').should.be.true();
        });
        it('should return false for Windows-1256 encoded string', function() {
        	encoding.isNotAr('\xc3').should.be.false();
        });
    });
    describe('arToUTF function', function() {
        it('should convert Windows-1256 strings to UTF-8 strings', function() {
        	encoding.arToUTF('\xc3\xd3').should.equal('أس');
        });
    });
});
