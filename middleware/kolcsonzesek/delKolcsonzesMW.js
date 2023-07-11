/**
 * Kitöröl egy kölcsönzést az adott könyv kölcsönzési listájából
 */

const requireOption = require('../requireOptions');

module.exports = function(objectrepository) {
    const kolcsonzesModel = requireOption(objectrepository, 'kolcsonzesModel');

    return async function(req, res, next) {
        await kolcsonzesModel.deleteOne({ _id: req.params.kolcsonzesid})
        .then (function () {
            console.log(res.locals.kolcsonzesek);
        })
        .catch (function (err) {
            console.log(err);
        })

        return res.redirect(`/kolcsonzes/${res.locals.konyv._id}`);
    };
};