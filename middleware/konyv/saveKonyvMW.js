/**
 * Létrehoz vagy módosít egy már meglévő könyvet az adataival. 
 *  - ha ez sikerült, visszairányít a /konyvek oldalra
 *  - ha hiányzik egy vagy több kötelezően kitöltendő mező, akkor errort dob,
 *    és az oldalon marad 
 */


const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {
    const konyvModel = requireOption(objectrepository, 'konyvModel');

    return function(req, res, next) {
        if (
            typeof req.body.szerzo === 'undefined' ||
            typeof req.body.cim === 'undefined' ||
            typeof req.body.ev === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.konyv === 'undefined') {
            res.locals.konyv = new konyvModel();
        }

        res.locals.konyv.szerzo = req.body.szerzo;
        res.locals.konyv.cim = req.body.cim;
        res.locals.konyv.ev = req.body.ev;

        res.locals.konyv.save({})
        .then(function (konyv){
            console.log("save " + res.locals.konyv);
        })
        .catch(function (err){
            console.log("save " + err);
        })

        return res.redirect('/konyvek');
    };
    
};