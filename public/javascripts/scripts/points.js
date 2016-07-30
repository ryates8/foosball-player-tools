'use strict';
$(document).ready(function() {

    $('table').stickyTableHeaders();
    $(document).foundation();
    $('#results').html(playerSorter.numberOfPlayers());

    $('#fname').click(function() {
        return playerSorter.sortAlpha('fnameState', 'firstName');
    });

    $('#lname').click(function() {
        return playerSorter.sortAlpha('lnameState', 'lastName');
    });

    $('#city').click(function() {
        return playerSorter.sortAlpha('cityState', 'city');
    });

    $('#state').click(function() {
        return playerSorter.sortAlpha('stateState', 'state');
    });

    $('#dpoints').click(function() {
        return playerSorter.sortNumeric('dpointsState', 'doublesPoints');
    });

    $('#spoints').click(function() {
        return playerSorter.sortNumeric('spointsState', 'singlesPoints');
    });

    $('#dmatches').click(function() {
        return playerSorter.sortNumeric('dmatchesState', 'doublesMatches');
    });

    $('#smatches').click(function() {
        return playerSorter.sortNumeric('smatchesState', 'singlesMatches');
    });

    $('#submit').click(function() {
        return playerSorter.findAPartner();
    });
});


var playerSorter = {
    lnameState: true,
    fnameState: true,
    dpointsState: true,
    spointsState: true,
    dmatchesState: true,
    smatchesState: true,
    cityState: true,
    stateState: true,
    fullPlayersList: players,
    editedPlayersList: players,

    numberOfPlayers: function() {
        return this.fullPlayersList.length;
    },

    sortNumeric: function(state, propToSort) {
        var context = this;
        var list = this.fullPlayersList;
        list.sort(function(a, b) {
            if (context[state] !== true) {
                return a[propToSort] - b[propToSort];

            } else {
                return b[propToSort] - a[propToSort];

            }
        });
        context[state] = !context[state];
        return context._updateHtml(list);
    },

    sortAlpha: function(state, propToSort) {
        var context = this;
        var list = this.fullPlayersList;
        list.sort(function(a, b) {
            if (context[state] !== true) {
                return b[propToSort].toUpperCase().localeCompare(a[propToSort].toUpperCase());
            } else {
                return a[propToSort].toUpperCase().localeCompare(b[propToSort].toUpperCase());

            }
        });
        context[state] = !context[state];
        return context._updateHtml(list);
    },

    findAPartner: function() {
        var length = this.fullPlayersList.length;
        var playerPoints = $('#select-player').val();
        var limit = $('#limit').val();
        var difference = limit - playerPoints;
        var editedPlayersList = [];
        for (var x = 0; x < length; x++) {
            if (difference >= this.fullPlayersList[x].doublesPoints) {
                editedPlayersList.push(this.fullPlayersList[x]);
            }
        }
        $('#results').html(editedPlayersList.length);

        editedPlayersList.sort(function(a, b) {
            return b.doublesPoints - a.doublesPoints;
        });
        this.dpointsState = false;

        return this._updateHtml(editedPlayersList);
    },

    _updateHtml: function(fullPlayersListArr) {
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
    },
};
