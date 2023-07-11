
const renderMW = require('../middleware/renderMW');
const getKonyvListMW = require('../middleware/konyv/getKonyvListMW');
const getKonyvMW = require('../middleware/konyv/getKonyvMW');
const getKolcsonzesListMW = require('../middleware/kolcsonzesek/getKolcsonzesListMW');
const getKolcsonzesMW = require('../middleware/kolcsonzesek/getKolcsonzesMW');
const delKonyvMW = require('../middleware/konyv/delKonyvMW');
const delKolcsonzesMW =require('../middleware/kolcsonzesek/delKolcsonzesMW');
const saveKonyvMW = require('../middleware/konyv/saveKonyvMW');
const saveKolcsonzesMW = require('../middleware/kolcsonzesek/saveKolcsonzesMW');


const konyvModel = require('../models/konyv');
const kolcsonzesModel = require('../models/kolcsonzes');

module.exports = function (app) {

    const objectRepository = {
        konyvModel: konyvModel,
        kolcsonzesModel: kolcsonzesModel
    };

    /**
     * új könyv hozzáadása
     */

    app.use('/konyvek/new',
        saveKonyvMW(objectRepository),
        renderMW(objectRepository, 'newKonyv')
    );

    /**
     * meglévő könyv módosítása
     */

    app.use('/konyvek/edit/:konyvid',
        getKonyvMW(objectRepository),
        saveKonyvMW(objectRepository),
        renderMW(objectRepository,'newKonyv')
    );

    /**
     * könyv törlése a listából, aztán redirect a /konyvek-re
     */

    app.get('/konyvek/del/:konyvid',
        getKonyvMW(objectRepository),
        delKonyvMW(objectRepository),
       /**function (req, res, next) {
            return res.redirect('/konyvek');}
        *  */ 
    );

     /**
     * ezen az oldalon láthatóak az adatbázisban szereplő könyvek és alap információik
     */

     app.get('/konyvek',
        getKonyvListMW(objectRepository),
        renderMW(objectRepository, 'konyvek')
 );

    /**
     * új kölcsönzés felvétele adott könyvhöz
     */

    app.use('/kolcsonzes/:konyvid/new',
        getKonyvMW(objectRepository),
        //saveKonyvMW(objectRepository),
        saveKolcsonzesMW(objectRepository),
        renderMW(objectRepository,'kolcsonzesNew')
    );

    /**
     * meglévő kölcsönzés szerkesztése
     */
    app.use('/kolcsonzes/:konyvid/:kolcsonzesid/edit',
        getKonyvMW(objectRepository),
        getKolcsonzesMW(objectRepository),
        saveKolcsonzesMW(objectRepository),
        renderMW(objectRepository,'kolcsonzesNew')
    );

    /**
     * kölcsönzés törlése. Ha sikeres, redirekt a /kolcsonzes/:konyvid-ra
     */
    app.use('/kolcsonzes/:konyvid/:kolcsonzesid/del',
        getKonyvMW(objectRepository),
        getKolcsonzesMW(objectRepository),
        delKolcsonzesMW(objectRepository),
       /** function (req, res, next) {
            return res.redirect(`/kolcsonzes/:konyvid`);}
        */ 
        );

     /**
     * egy könyv előzményeit, azaz eddigi kikölcsönzéseit mutatja
     */

    app.get('/kolcsonzes/:konyvid',
        getKonyvMW(objectRepository),
        getKonyvListMW(objectRepository),
        getKolcsonzesListMW(objectRepository),
        getKolcsonzesMW(objectRepository),
        renderMW(objectRepository,'kolcsonzesek')
        );
    

};