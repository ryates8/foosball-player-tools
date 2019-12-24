'use strict';

const express = require('express');
const multer = require('multer');
const csv = require('fast-csv');
const router = express.Router();
const playersService = require('../services/player.service');
const fs = require('fs');
const upload = multer({dest: 'uploads/'});

/* GET home page. */
router.get('/', (req, res) => {

  playersService.fetch((error, players) => {
        if (error) {console.log(error);}
        //console.log(players.tableHeaders);
        res.render('pages/home', { title: 'Bonzini Points Machine', headlines: players.tableHeaders, players: players.tableData });
    });

});

router.get('/analytics', (req, res) => {

  playersService.fetch((error, players) => {
        if (error) {console.log(error);}
        res.render('pages/analytics', { title: 'Bonzini Points Machine', headlines: players.tableHeaders, players: players.tableData });
    });
});

router.get('/rankings', (req, res) => {

  playersService.fetch((error, players) => {
        if (error) {console.log(error);}
        res.render('pages/rankings', { title: 'Bonzini Points Machine', headlines: players.tableHeaders, players: players.tableData });
    });
});

router.post("/upload", upload.single('file'), (req, res) => {
  const fileRows = [];

  csv.fromPath(req.files[0].path)
    .on("data", data => {
      fileRows.push(data); // push each row
    })
    .on("end", () => {
      fs.unlinkSync(req.files[0].path);   // remove temp file
      const parsedCsv = parseCsv(fileRows);
      playersService.create(parsedCsv, (err, res) => {
        console.log(res);
      });

      res.send('success');
    });
});

router.get('/upload', (req, res) => {
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
