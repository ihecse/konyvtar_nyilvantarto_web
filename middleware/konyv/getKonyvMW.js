/**
 * lekérdez egy könyvet és 
 * ha sikeres a lekérdezés, visszaadja a könyv id-ját
 * ha nem, akkor visszairányít
 */

const { isValidObjectId } = require('mongoose');
const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {
    const konyvModel = requireOption(objectrepository, 'konyvModel');

    return async function(req, res, next) {
        await konyvModel.findOne({ _id: req.params.konyvid })
        .then (function (konyv) {
            res.locals.konyv = konyv;
            console.log(konyv);
        })
        .catch (function (err) {
            console.log(err);
        });

        return next();
    };
};