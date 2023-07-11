/**
 * lekérdez egy kölcsönzést és 
 * ha sikeres a lekérdezés, visszaadja a kölcsönzés id-ját, ami ahhoz a könyvhöz tartozik
 * ha nem, akkor visszairányít
 */

const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {
    const kolcsonzesModel = requireOption(objectrepository, 'kolcsonzesModel');

    return async function(req, res, next) {
        await kolcsonzesModel.findOne({ _id: req.params.kolcsonzesid })
        .then (function (kolcsonzes) {
            res.locals.kolcsonzes = kolcsonzes;
            console.log(kolcsonzes);
        })
        .catch (function (err) {
            console.log(err);
        });

        return next();
    };
};