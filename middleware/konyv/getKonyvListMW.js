/**
 * Lekérdezi a könyvek listáját és visszaadja azt.
 */

const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {
    const konyvModel = requireOption(objectrepository, 'konyvModel');

    return async function(req, res, next) {
        await konyvModel.find({})
        .then (function (konyvek) {
            res.locals.konyvek = konyvek;
            console.log("list " + res.locals.konyvek);
        })
        .catch (function (err) {
            console.log(err);
        });

        return next();
    };
};