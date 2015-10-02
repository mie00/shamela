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
        it('should ignore what\'s after null carachter', function() {
        	encoding.arToUTF('\xc3\xd3').should.equal('أس');
        	encoding.arToUTF('\xc3\xd3\0\xc3\xc3').should.equal('أس');
        });
    });
    describe('UTFToAr function', function() {
        it('should convert UTF-8 strings to Windows-1256 strings', function() {
            encoding.UTFToAr('أس').should.equal('\xc3\xd3');
        });
        it('should reverse UTFToAr in case of non nul chars', function() {
            var a = ['أب','حمحم','خشىسي خشسيىشسي خخسش ي']
            a.should.matchEach(function(x){
                encoding.arToUTF(encoding.UTFToAr(x)).should.equal(x)
            })
        });
    });
});
