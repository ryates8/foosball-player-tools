'use strict';

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    var arrayOfPlayers = require('../services/bonziniScraper');

    arrayOfPlayers.init(function(error, players) {
        if (error) {console.log(error);}
        res.render('index', { title: 'Bonzini Points Machine', headlines: players.tableHeaders, players: players.tableData });
    });

});

module.exports = router;
