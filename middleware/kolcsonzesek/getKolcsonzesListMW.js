/**
 * Lekérdezi az egyes könyvekhez tartoző előzmények, azaz kikölcsönzéseinek listáját és visszaadja azt.
 */

const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {
    const kolcsonzesModel = requireOption(objectrepository, 'kolcsonzesModel');

    return async function(req, res, next) {
        await kolcsonzesModel.find({})
        .then (function (kolcsonzesek) {
            res.locals.kolcsonzesek = kolcsonzesek;
            console.log( "list "+ res.locals.kolcsonzesek);
        })
        .catch (function (err) {
            console.log(err);
        });

        return next();
    };
};