var objects = require('../../src/utils/objects');
var sinon = require('sinon'),
    should = require('should');
require('should-sinon');

describe('Objects module', function() {
    describe('objMap function', function() {
        it('should map the obj to a callback', function() {
            var spy = sinon.spy();
            objects.map({a:1,b:2},spy);
            spy.should.be.calledWith('a',1)
            spy.should.be.calledWith('b',2)
        });
    });
});
