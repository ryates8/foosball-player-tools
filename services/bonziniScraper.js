

function parseHtml(html, callback) {
    //This function converts html to an array of player objects
    var htmlparser = require("htmlparser");
    var rawHtml = html;
    var playersArray = [];

    var handler = new htmlparser.DefaultHandler(function(error, dom) {
        if (error) {
            callback(error);
        } else {
            var onlyRows = [];
            var onlyCells = [];
            var table = dom[0].children[3];
            var tableElements = table.children[1].children;

            //Loop through list of tableElements, and only add the table rows
            for (var z = 0; z < tableElements.length; z++) {
                if (tableElements[z].name === 'tr') {
                    onlyRows.push(tableElements[z]);
                }
            }

            //Loop through only rows and save all td's that arent undefined
            for (var x = 0; x < onlyRows.length; x++) {
                var tds = onlyRows[x].children;
                var tempArray = [];
                for (var i = 0; i < tds.length; i++) {

                    if (tds[i].name === 'td' && tds[i].children !== undefined) {


                        tempArray.push(tds[i].children[0].data);

                    }
                }
                if (tempArray.length > 0) {
                    playersArray.push(new player(tempArray));
                }
            }
            //return an object containing the parsed players data
            callback(false, { tableHeaders: playersArray.shift(), tableData: playersArray });
        }

    });

    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(rawHtml);
}


function player(csvRow) {
    //turns player array into a player
    var x = 0;
    this.code = csvRow[x++];
    this.lastName = csvRow[x++];
    this.firstName = csvRow[x++];
    this.city = csvRow[x++];
    this.state = csvRow[x++];
    this.singlesPoints = csvRow[x++];
    this.singlesMatches = csvRow[x++];
    this.doublesPoints = csvRow[x++];
    this.doublesMatches = csvRow[x++];

}

module.exports.init = function(callback) {
    var http = require('http');
    http.get({
        host: 'bonziniusa.com',
        path: '/foosball/tournament/players/rankings.html'
    }, function(response) {
        var html = '';
        response.on('data', function(d) {
            html += d;
        });
        response.on('end', function() {
            parseHtml(html, function(error, players) {
                if (error) {
                    console.log(error);
                    callback(error);
                } else {
                    callback(false, players);
                }
            });

        });
    });
};