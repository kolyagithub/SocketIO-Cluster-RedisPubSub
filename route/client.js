/**
 * Created by qudrat on 11/4/16.
 */
'use strict';

const express = require('express')
    , routes = express.Router();


routes.get('/send', function (req, res) {
    res.sendFile(__dirname + '/client.html');
});


module.exports = routes;