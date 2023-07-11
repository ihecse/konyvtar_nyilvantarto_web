const assert = require('chai').assert;
const sinon = require('sinon');
const getKonyvMW = require('../../../../middleware/konyv/getKonyvMW');

describe('getKonyvMW middleware', function() {

    let loggedMessages = [];

    before(function() {       
        console.log = function(message) {
            loggedMessages.push(message);
        };
    });

    after(function() {
      
        console.log = console._log;
    });

    it('res.locals.konyv-et a returned konyvbe helyezni', function(done) {
        const fake = { _id: '3', name: 'konyv' };
        const konyvModel = {
            findOne: sinon.stub().resolves(fake),
        };

        const req = { params: { konyvid: '3' } };
        const res = { locals: {} };
        const next = sinon.stub().callsFake(function(err) {
            assert.strictEqual(err, undefined);
            assert.strictEqual(res.locals.konyv, fake);
            assert.isTrue(konyvModel.findOne.calledOnceWith({ _id: '3' }));
            done();
        });

        const mw = getKonyvMW({ konyvModel: konyvModel });

        mw(req, res, next);
    });

    it('logolnia kell, ha a finOne errort dob', function(done) {
        const logSpy = sinon.spy(console, 'log');
        
        const fakeError = new Error('Fake error');
        const konyvModel = {
            findOne: sinon.stub().rejects(fakeError),
        };

        const req = { params: { konyvid: 'fakeId' } };
        const res = {};
        const next = sinon.stub().callsFake(function(err) {
            assert.isTrue(konyvModel.findOne.calledOnceWith({ _id: 'fakeId' }));
            assert.isTrue(logSpy.calledOnceWith(fakeError));
            done();
        });

        const mw = getKonyvMW({ konyvModel: konyvModel });

        mw(req, res, next);
    });
});

