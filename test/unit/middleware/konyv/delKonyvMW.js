const expect = require('chai').expect;
const sinon = require('sinon');
const delKonyvMW = require('../../../../middleware/konyv/delKonyvMW');


describe('delKonyvMW middleware', function() {
    let loggedMessages = [];

    before(function() {
         console.log = function(message) {
            loggedMessages.push(message);
        };
    });

    after(function() {
        
        console.log = console._log;
    });

    it('logolnia kell a konyveket és redirectelni: /konyvek', async function() {
        const deleteOneStub = sinon.stub().resolves();
        const redirectSpy = sinon.spy();

        const mw = delKonyvMW({
            konyvModel: {
                deleteOne: deleteOneStub
            }
        });

        const req = {
            params: {
                konyvid: '2'
            }
        };
        const res = {
            locals: {},
            redirect: redirectSpy
        };

        await mw(req, res, async function() {});

        expect(loggedMessages).to.deep.equal([res.locals.dalok]);
        expect(redirectSpy.calledWith('/konyvek')).to.be.true;
    });

    it('logolnia kell, ha a deleteOne errort dob és redirectelni a /konyvek-re', async function() {
        const fakeError = new Error('adatbazishiba');
        const deleteOneStub = sinon.stub().rejects(fakeError);
        const redirectSpy = sinon.spy();

        const mw = delKonyvMW({
            konyvModel: {
                deleteOne: deleteOneStub
            }
        });

        const req = {
            params: {
                dalid: '2'
            }
        };
        const res = {
            locals: {},
            redirect: redirectSpy
        };

        await mw(req, res, async function(err) {
            expect(err).to.equal(fakeError);
            throw new Error('a következőt nem kellett volna hívni');
        });

        expect(loggedMessages).to.deep.equal([undefined, fakeError]);
        expect(redirectSpy.calledWith('/konyvek')).to.be.true;
    });

});
