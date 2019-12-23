'use strict';

var express = require('express');
const multer = require('multer');
const csv = require('fast-csv');
var router = express.Router();
var playersService = require('../services/player.service');
var fs = require('fs');
const upload = multer({dest: 'uploads/'});

/* GET home page. */
router.get('/', function(req, res) {

  playersService.fetch(function (error, players) {
        if (error) {console.log(error);}
        //console.log(players.tableHeaders);
        res.render('pages/home', { title: 'Bonzini Points Machine', headlines: players.tableHeaders, players: players.tableData });
    });

});

router.get('/analytics', function(req, res) {

  playersService.fetch(function (error, players) {
        if (error) {console.log(error);}
        res.render('pages/analytics', { title: 'Bonzini Points Machine', headlines: players.tableHeaders, players: players.tableData });
    });
});

router.get('/rankings', function(req, res) {

  playersService.fetch(function (error, players) {
        if (error) {console.log(error);}
        res.render('pages/rankings', { title: 'Bonzini Points Machine', headlines: players.tableHeaders, players: players.tableData });
    });
});

router.post("/upload", upload.single('file'), function (req, res, next) {
  const fileRows = [];
  csv.fromPath(req.files[0].path)
    .on("data", function (data) {
      fileRows.push(data); // push each row
    })
    .on("end", function () {
      //console.log(fileRows); //contains array of arrays. Each inner array represents row of the csv file, with each element of it a column
      fs.unlinkSync(req.files[0].path);   // remove temp file
      //process "fileRows" and respond
      const parsedCsv = parseCsv(fileRows);
      console.log(parsedCsv);
      playersService.create(parsedCsv, function(err, res) {
        console.log(err);
        console.log(res);
      });
      res.send('success');
    });
});

router.get('/upload', function (req, res) {
  res.render('pages/upload', {title: 'Bonzini Points Machine'});
});

const indexKeyMap = {
  0: 'playerCode',
  1: 'lastName',
  2: 'firstName',
  3: 'city',
  4: 'region',
  5: 'singlesPoints',
  6: 'doublesPoints'
};

function parseCsv(csv) {
  let parsedCsvRows = [];

  csv.forEach(row => {
    let parsedRow = {};

    row.forEach(
      (value, index) => {
        const key = indexKeyMap[index];
        parsedRow[key] = value;
      }
    );

    parsedCsvRows.push(new playersService(parsedRow));
  });

  return parsedCsvRows;
}

module.exports = router;
