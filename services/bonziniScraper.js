'use strict';

function parseHtml(html, callback) {
    //This function converts html to an array of player objects
    var htmlparser = require('htmlparser');
    var rawHtml = html;

    var handler = new htmlparser.DefaultHandler(function(error, dom) {
        if (error) {
            callback(error);
        } else {
            var tableRows = getTableRows(dom);
            var arrayOfPlayers = getPlayers(tableRows);
            callback(false, { tableHeaders: arrayOfPlayers.shift(), tableData: arrayOfPlayers });
        }

    });
    var parser = new htmlparser.Parser(handler);
    parser.parseComplete(rawHtml);
}


function player(csvRow) {
    //turns player array into a player
    //console.log(csvRow);
    var x = 0;

    //put this in because bonziniusa likes to change the information displayed
    //on their points page
    if (csvRow.length > 7) {

        this.code = csvRow[x++];
        this.lastName = csvRow[x++];
        this.firstName = csvRow[x++];
        if (csvRow[x] === '&nbsp;') {
            csvRow[x] = 'Unkown';
        }
        this.city = csvRow[x++];
        if (csvRow[x] === '&nbsp;') {
            csvRow[x] = 'Unkown';
        }
        this.state = csvRow[x++]
        this.singlesPoints = csvRow[x++];
        this.singlesMatches = csvRow[x++];
        this.doublesPoints = csvRow[x++];
        this.doublesMatches = csvRow[x++];
    } else {
        this.code = csvRow[x++];
        this.lastName = csvRow[x++];
        this.firstName = csvRow[x++];
        if (csvRow[x] === '&nbsp;') {
            csvRow[x] = 'Unkown';
        }
        this.city = csvRow[x++];
        if (csvRow[x] === '&nbsp;') {
            csvRow[x] = 'Unkown';
        }
        this.state = csvRow[x++]
        this.singlesPoints = csvRow[x++];
        this.doublesPoints = csvRow[x++];
    }


}

function getTableRows(dom) {
    var onlyRows = [];
    var table = dom[0].children[3];
    var tableElements = table.children[1].children;
    var elementsLength = tableElements.length;

    //Loop through list of tableElements, and only add the table rows
    for (var z = 0; z < elementsLength; z++) {
        if (tableElements[z].name === 'tr') {
            onlyRows.push(tableElements[z]);
        }
    }

    return onlyRows;
}

function getPlayers(rows) {
    var playersArray = [];
    var rowLength = rows.length;
    //Loop through only rows and save all td's that arent undefined
    for (var x = 0; x < rowLength; x++) {
        var tds = rows[x].children;
        var tdsLength = tds.length;
        var tempArray = [];
        for (var i = 0; i < tdsLength; i++) {

            if (tds[i].name === 'td' && tds[i].children !== undefined) {

                tempArray.push(tds[i].children[0].data);

            }
        }
        if (tempArray.length > 0) {
            playersArray.push(new player(tempArray));
        }
    }
    return playersArray;
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
