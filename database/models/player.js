'use strict';

var Bookshelf = require('./connection').Bookshelf;

var PledgeCounter = Bookshelf.Model.extend({
    tableName: 'pledgeCounter',
    idAttribute: 'id'

});

var PledgeCounterCollection = Bookshelf.Collection.extend({
    model: PledgeCounter
});

module.exports = {
    PledgeCounter: PledgeCounter,
    PledgeCounterCollection: PledgeCounterCollection
};
