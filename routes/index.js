'use strict';

var express = require('express');
var router = express.Router();
var arrayOfPlayers = require('../services/bonziniScraper');

/* GET home page. */
router.get('/', function(req, res) {
    
    arrayOfPlayers.init(function(error, players) {
        if (error) {console.log(error);}
        console.log(players.tableHeaders);
        res.render('pages/home', { title: 'Bonzini Points Machine', headlines: players.tableHeaders, players: players.tableData });
    });

});

router.get('/analytics', function(req, res) {

    arrayOfPlayers.init(function(error, players) {
        if (error) {console.log(error);}
        res.render('pages/analytics', { title: 'Bonzini Points Machine', headlines: players.tableHeaders, players: players.tableData });
    });
});

router.get('/rankings', function(req, res) {

    arrayOfPlayers.init(function(error, players) {
        if (error) {console.log(error);}
        res.render('pages/rankings', { title: 'Bonzini Points Machine', headlines: players.tableHeaders, players: players.tableData });
    });
});
module.exports = router;
