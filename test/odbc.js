process.chdir(__dirname);

var db = require('odbc')(),
    cn = 'DRIVER={MDB};DBQ=3685.mdb';
describe('ODBC', function() {
    describe('with mdb-driver', function() {
        it('should connect sync', function(done) {

            db.open(cn, function(err) {
                if (err) done(err);
                else {
                    try {
                        var a = db.querySync("SELECT * FROM title\0");
                        db.close(function(err) {
                            if (err) done(err);
                            done();
                        });
                    } catch (err) {
                        done(err);
                    }
                }
            });
        });

        it('should connect async(this required change in odbc src: moreResultSets = false)', function(done) {

            db.open(cn, function(err) {
                if (err) done(err);
                else {
                    db.query("SELECT * FROM title\0", function(err, data, moreResultSets) {
                        if (err) {
                            done(err);
                        }

                        {
                            db.close(function(err) {
                                if (err) done(err);
                                done();
                            });
                        }

                    });
                }
            });


        });
    });
});
