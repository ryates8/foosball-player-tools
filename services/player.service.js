"use strict";

const mongoose = require('../db').db;

const playerSchema = new mongoose.Schema({
    playerCode: String,
    firstName: String,
    lastName: String,
    city: String,
    region: String,
    singlesPoints: String,
    doublesPoints: String
  },
  {collection: 'players'});


class playerModel extends mongoose.Model {
  static fetch(callback) {
    this.find({}, (err, players) => {
      if (err) {
        console.log("err", err);
        callback(err, null);
      }

      console.log('players', players);
      callback(null, {
        tableHeaders: ["firstName", "lastName", "city", "region", "singlesPoints", "doublesPoints"],
        tableData: players
      });
    });
  }
}

playerSchema.loadClass(playerModel);
module.exports = mongoose.model('players', playerSchema);
