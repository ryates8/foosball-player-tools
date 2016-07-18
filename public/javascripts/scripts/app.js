var dpointsState = true;
var spointsState = true;
var dmatchesState = true;
var smatchesState = true;

var fullPlayersList = players;
var editedPlayersList = players;

$(document).ready(function() {
    $('table').stickyTableHeaders();
    var tableOffset = $("#rankings").offset().top;
    var $header = $("#rankings > thead").clone();
    var $fixedHeader = $("#header-fixed").append($header);

    $(window).bind("scroll", function() {
        var offset = $(this).scrollTop();

        if (offset >= tableOffset && $fixedHeader.is(":hidden")) {
            $fixedHeader.show();
        } else if (offset < tableOffset) {
            $fixedHeader.hide();
        }
    });


    $(document).foundation();
    $('#results').html(players.length);

    $(document).off('click', '#dpoints').on('click', '#dpoints', function() {


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

        players.sort(function(a, b) {
            if (spointsState !== true) {
                return a.singlesPoints - b.singlesPoints;

            } else {
                return b.singlesPoints - a.singlesPoints;

            }
        });
        spointsState = !spointsState;
        updateHtml(players);
    });

    $('#dmatches').click(function() {

        players.sort(function(a, b) {
            if (dmatchesState !== true) {
                return a.doublesMatches - b.doublesMatches;

            } else {
                return b.doublesMatches - a.doublesMatches;

            }
        });
        dmatchesState = !dmatchesState;

        return updateHtml(players);
    });



    $('#smatches').click(function(e) {

        players.sort(function(a, b) {
            if (smatchesState !== true) {
                return a.singlesMatches - b.singlesMatches;

            } else {
                return b.singlesMatches - a.singlesMatches;

            }
        });
        smatchesState = !smatchesState;
        updateHtml(players);
    });

    $('#submit').click(function(e) {
        var playerPoints = $('#select-player').val();
        var limit = $('#limit').val();
        var difference = limit - playerPoints;
        editedPlayersList = [];


        for (var x = 0; x < players.length; x++) {
            if (difference >= players[x].doublesPoints) {
                editedPlayersList.push(players[x]);
            }
        }
        $('#results').html(editedPlayersList.length);




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
});



function updateHtml(playersArr) {
    $('#rankings tbody').html('');
    var cachedLength = playersArr.length;
    for (var x = 0; x < cachedLength; x++) {
        var visibilityClass = "show-for-large";
        $('#rankings tbody').append('<tr><td class="' + visibilityClass + '">' + playersArr[x].code + '</td><td>' + playersArr[x].lastName + '</td><td>' + playersArr[x].firstName + '</td><td class="' + visibilityClass + '">' + playersArr[x].city + '</td><td  class="' + visibilityClass + '">' + playersArr[x].state + '</td><td>' + playersArr[x].doublesPoints + '</td><td class="' + visibilityClass + '">' + playersArr[x].doublesMatches + '</td><td>' + playersArr[x].singlesPoints + '</td><td class="' + visibilityClass + '">' + playersArr[x].singlesMatches + '</td></tr>');
    }
}
