'use strict';

var dpointsState = true; //true is high, false is low
var spointsState = true;
var dmatchesState = true;
var smatchesState = true;

var fullPlayersList = players;
var editedPlayersList = players;

$(document).ready(function() {
    $('table').stickyTableHeaders();
    $(document).foundation();
    $('#results').html(fullPlayersList.length);

    $(document).off('click', '#dpoints').on('click', '#dpoints', function(e) {
        e.preventDefault();

        editedPlayersList.sort(function(a, b) {
            if (dpointsState !== true) {
                return a.doublesPoints - b.doublesPoints;

            } else {
                return b.doublesPoints - a.doublesPoints;

            }
        });
        dpointsState = !dpointsState;

        return updateHtml(editedPlayersList);
    });

    $(document).off('click', '#spoints').on('click', '#spoints', function(e) {
        e.preventDefault();
        fullPlayersList.sort(function(a, b) {
            if (spointsState !== true) {
                return a.singlesPoints - b.singlesPoints;

            } else {
                return b.singlesPoints - a.singlesPoints;

            }
        });
        spointsState = !spointsState;
        updateHtml(fullPlayersList);
    });

    $('#dmatches').click(function(e) {
        e.preventDefault();
        fullPlayersList.sort(function(a, b) {
            if (dmatchesState !== true) {
                return a.doublesMatches - b.doublesMatches;

            } else {
                return b.doublesMatches - a.doublesMatches;

            }
        });
        dmatchesState = !dmatchesState;

        return updateHtml(fullPlayersList);
    });



    $('#smatches').click(function(e) {
        e.preventDefault();
        fullPlayersList.sort(function(a, b) {
            if (smatchesState !== true) {
                return a.singlesMatches - b.singlesMatches;

            } else {
                return b.singlesMatches - a.singlesMatches;

            }
        });
        smatchesState = !smatchesState;
        updateHtml(fullPlayersList);
    });


    $('#submit').click(function(e) {
        e.preventDefault();
        var playerPoints = $('#select-player').val();
        var limit = $('#limit').val();
        var difference = limit - playerPoints;
        editedPlayersList = [];


        for (var x = 0; x < fullPlayersList.length; x++) {
            if (difference >= fullPlayersList[x].doublesPoints) {
                editedPlayersList.push(fullPlayersList[x]);
            }
        }
        $('#results').html(editedPlayersList.length);

        editedPlayersList.sort(function(a, b) {
            return b.doublesPoints - a.doublesPoints;
        });
        dpointsState = false;

        return updateHtml(editedPlayersList);
    });
});



function updateHtml(fullPlayersListArr) {
    $('#rankings tbody').html('');
    var cachedLength = fullPlayersListArr.length;

    for (var x = 0; x < cachedLength; x++) {
        var visibilityClass = 'show-for-large';
        if (fullPlayersListArr[x].doublesMatches) {
            $('#rankings tbody').append('<tr><td class="' + visibilityClass + '">' + fullPlayersListArr[x].code + '</td><td>' + fullPlayersListArr[x].lastName + '</td><td>' + fullPlayersListArr[x].firstName + '</td><td class="' + visibilityClass + '">' + fullPlayersListArr[x].city + '</td><td  class="' + visibilityClass + '">' + fullPlayersListArr[x].state + '</td><td>' + fullPlayersListArr[x].doublesPoints + '</td><td class="' + visibilityClass + '">' + fullPlayersListArr[x].doublesMatches + '</td><td>' + fullPlayersListArr[x].singlesPoints + '</td><td class="' + visibilityClass + '">' + fullPlayersListArr[x].singlesMatches + '</td></tr>');
        } else {
            $('#rankings tbody').append('<tr><td class="' + visibilityClass + '">' + fullPlayersListArr[x].code + '</td><td>' + fullPlayersListArr[x].lastName + '</td><td>' + fullPlayersListArr[x].firstName + '</td><td class="' + visibilityClass + '">' + fullPlayersListArr[x].city + '</td><td  class="' + visibilityClass + '">' + fullPlayersListArr[x].state + '</td><td>' + fullPlayersListArr[x].doublesPoints + '</td><td>' + fullPlayersListArr[x].singlesPoints + '</td></tr>');
        }

    }
}
