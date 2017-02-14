'use strict';

var config = {};

if (process.env.NODE_ENV === 'development') {
    config = {
        client: 'mysql',
        connection: {
            host: '52.20.18.227', // your host
            user: 'coe', // your database user
            password: 'M3dTh1nk', // your database password
            database: 'bidil',
            port: 3306,
            charset: 'UTF8_GENERAL_CI',
            pool: {
                min: 0,
                max: 15
            }
        }
    };
} else {
    config = {
        client: 'mysql',
        connection: {
            host: '52.20.18.227', // your host
            user: 'coe', // your database user
            password: 'M3dTh1nk', // your database password
            database: 'bidil',
            port: 3306,
            charset: 'UTF8_GENERAL_CI',
            pool: {
                min: 0,
                max: 15
            }
        }
    };
}


var knex = require('knex')(config);
var Bookshelf = require('bookshelf')(knex);


module.exports.Bookshelf = Bookshelf;
