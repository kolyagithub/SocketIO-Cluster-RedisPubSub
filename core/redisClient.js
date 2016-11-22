/**
 * Created by qudrat on 11/4/16.
 */
'use strict';

var redis = require("redis")
    , config = require("../config/config");

var redisCl = redis.createClient({
    host: config.redis.host,
    port: config.redis.port
});

redisCl.on('error', function (err) {
    console.error('Cannot connect to Redis. Error - ', err);
});

module.exports = redisCl;
