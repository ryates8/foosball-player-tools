"use strict";

var mongoose = require('../db').db;

var playerSchema = new mongoose.Schema({
  firstName: String, lastName: String, city: String, region: String, singlesPoints: String, doublesPoints: String
});

var playerModel = mongoose.model('players', playerSchema);


var playerService = {
  fetch: function (callback) {
          playerModel.find({}, function(err, players) {
            console.log("err", err);
            if (err) callback(err, null);
            console.log(players);
            callback(null, {
              tableHeaders: ["firstName", "lastName", "city", "region", "singlesPoints", "doublesPoints"],
              tableData: players
            });
          });

    // callback(null, {
    //   tableHeaders: ["_id", "firstName", "lastName", "city", "region", "singlesPoints", "doublesPoints"],
    //   tableData: [{
    //     _id: "123",
    //     firstName: "Joe",
    //     lastName: "Dirt",
    //     city: "Durham",
    //     region: "NC",
    //     singlesPoints: "1200",
    //     doublesPoints: "1250"
    //   }]
    // });
  }
};

module.exports = playerService;
