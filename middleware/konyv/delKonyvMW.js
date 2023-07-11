
/**
 * Kitöröl egy konyvet a listából
 */

const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {
    const konyvModel = requireOption(objectrepository, 'konyvModel');

    return async function(req, res, next) {
        await konyvModel.deleteOne({ _id: req.params.konyvid})
        .then (function () {
            console.log(res.locals.konyvek);
        })
        .catch (function (err) {
            console.log(err);
        })

        return res.redirect('/konyvek');
    };
};