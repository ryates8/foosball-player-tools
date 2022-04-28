'use strict';
$(document).ready(function () {

    $('table').stickyTableHeaders();
    $('#results').html(playerSorter.numberOfPlayers());

    $('#fname').click(function () {
        return playerSorter.sortAlpha('fnameState', 'firstName');
    });

    $('#lname').click(function () {
        return playerSorter.sortAlpha('lnameState', 'lastName');
    });

    $('#city').click(function () {
        return playerSorter.sortAlpha('cityState', 'city');
    });

    $('#state').click(function () {
        return playerSorter.sortAlpha('stateState', 'state');
    });

    $('#dpoints').click(function () {
        return playerSorter.sortNumeric('dpointsState', 'doublesPoints');
    });

    $('#spoints').click(function () {
        return playerSorter.sortNumeric('spointsState', 'singlesPoints');
    });

    $('#submit').click(function () {
        return playerSorter.findAPartner();
    });

    $(document).foundation();
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

    numberOfPlayers: function () {
        return this.fullPlayersList.length;
    },

    sortNumeric: function (state, propToSort) {
        var context = this;
        var list = this.fullPlayersList;
        list.sort(function (a, b) {
            if (context[state] !== true) {
                return a[propToSort] - b[propToSort];

            } else {
                return b[propToSort] - a[propToSort];

            }
        });
        context[state] = !context[state];
        return context._updateHtml(list);
    },

    sortAlpha: function (state, propToSort) {
        var context = this;
        var list = this.fullPlayersList;
        list.sort(function (a, b) {
            if (context[state] !== true) {
                return b[propToSort].toUpperCase().localeCompare(a[propToSort].toUpperCase());
            } else {
                return a[propToSort].toUpperCase().localeCompare(b[propToSort].toUpperCase());

            }
        });
        context[state] = !context[state];
        return context._updateHtml(list);
    },

    findAPartner: function () {
        const playerPoints = $('#select-player').val();
        const limit = $('#limit').val();
        const difference = limit - playerPoints;
        const editedPlayersList = this.fullPlayersList
            .filter(player => difference >= player.doublesPoints)
            .sort((a, b) => b.doublesPoints - a.doublesPoints);

        $('#results').html(editedPlayersList.length);

        this.dpointsState = false;

        return this._updateHtml(editedPlayersList);
    },

    _updateHtml: function (fullPlayersListArr) {
        $('#rankings tbody').html('');
        var cachedLength = fullPlayersListArr.length;

        for (var x = 0; x < cachedLength; x++) {
            var singlesRank;
            var doublesRank;

            if (fullPlayersListArr[x].singlesPoints < 500) {
                singlesRank = '(Novice)';
            } else if (fullPlayersListArr[x].singlesPoints >= 500 && fullPlayersListArr[x].singlesPoints < 1000) {
                singlesRank = '(Amateur)';
            } else if (fullPlayersListArr[x].singlesPoints >= 1000 && fullPlayersListArr[x].singlesPoints < 1500) {
                singlesRank = '(Expert)';
            } else if (fullPlayersListArr[x].singlesPoints >= 1500 && fullPlayersListArr[x].singlesPoints < 200) {
                singlesRank = '(Pro)';
            }
            else {
                singlesRank = '(Master)';
            }

            if (fullPlayersListArr[x].doublesPoints < 500) {
                singlesRank = '(Novice)';
            } else if (fullPlayersListArr[x].doublesPoints >= 500 && fullPlayersListArr[x].doublesPoints < 1000) {
                singlesRank = '(Amateur)';
            } else if (fullPlayersListArr[x].doublesPoints >= 1000 && fullPlayersListArr[x].doublesPoints < 1500) {
                singlesRank = '(Expert)';
            } else if (fullPlayersListArr[x].doublesPoints >= 1500 && fullPlayersListArr[x].doublesPoints < 200) {
                singlesRank = '(Pro)';
            }
            else {
                singlesRank = '(Master)';
            }

            var visibilityClass = 'show-for-large';
            if (fullPlayersListArr[x].doublesMatches) {
                $('#rankings tbody').append('<tr><td class="' + visibilityClass + '">' + fullPlayersListArr[x].playerCode + '</td><td>' + fullPlayersListArr[x].lastName + '</td><td>' + fullPlayersListArr[x].firstName + '</td><td class="' + visibilityClass + '">' + fullPlayersListArr[x].city + '</td><td  class="' + visibilityClass + '">' + fullPlayersListArr[x].region + '</td><td><strong>' + fullPlayersListArr[x].doublesPoints + '</strong> ' + doublesRank + '</td><td class="' + visibilityClass + '">' + fullPlayersListArr[x].doublesMatches + '</td><td><strong>' + fullPlayersListArr[x].singlesPoints + '</strong> ' + singlesRank + '</td><td class="' + visibilityClass + '">' + fullPlayersListArr[x].singlesMatches + '</td></tr>');
            } else {
                $('#rankings tbody').append('<tr><td class="' + visibilityClass + '">' + fullPlayersListArr[x].playerCode + '</td><td>' + fullPlayersListArr[x].lastName + '</td><td>' + fullPlayersListArr[x].firstName + '</td><td class="' + visibilityClass + '">' + fullPlayersListArr[x].city + '</td><td  class="' + visibilityClass + '">' + fullPlayersListArr[x].region + '</td><td><strong>' + fullPlayersListArr[x].doublesPoints + '</strong> ' + doublesRank + '</td><td><strong>' + fullPlayersListArr[x].singlesPoints + '</strong> ' + singlesRank + '</td></tr>');
            }

        }
    },
};
