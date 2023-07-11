//var requireOption = require('../common').requireOption;

/**
 * Létrehoz (vagy módosít egy már meglévő) kölcsönzést az adataival. 
 *  - ha ez sikerült, visszairányít a /kolcsonzes/:konyvid oldalra
 *  - ha hiányzik egy vagy több kötelezően kitöltendő mező, akkor errort dob,
 *    és a form oldalán marad 
 */


const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {
    const kolcsonzesModel = requireOption(objectrepository, 'kolcsonzesModel');

    return function(req, res, next) {
        if (
            typeof req.body.nev === 'undefined' ||
            typeof req.body.kolcsonzes_kezdete === 'undefined' ||
            typeof req.body.kolcsonzes_vege === 'undefined' 
           // typeof res.locals.konyv === 'undefined'
        ) {
            return next();
        }


        if (typeof res.locals.kolcsonzes === 'undefined') {
            res.locals.kolcsonzes = new kolcsonzesModel();
        }

        res.locals.kolcsonzes.nev = req.body.nev;
        res.locals.kolcsonzes.kolcsonzes_kezdete = req.body.kolcsonzes_kezdete;
        res.locals.kolcsonzes.kolcsonzes_vege = req.body.kolcsonzes_vege;
        res.locals.kolcsonzes._kolcsonzott = res.locals.konyv._id;

        res.locals.kolcsonzes.save({})
        .then(function (kolcsonzes){
            console.log("save " + res.locals.kolcsonzes);
        })
        .catch(function (err){
            console.log("save " + err);
        })

        return res.redirect(`/kolcsonzes/${res.locals.konyv._id}`);
    };
    
};