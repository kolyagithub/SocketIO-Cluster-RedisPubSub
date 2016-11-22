/**
 * Created by qudrat on 11/4/16.
 */
'use strict';

const express = require('express')
    , fs = require('fs')
    , routes = require('./route/client')
    , cluster = require('./clustering/cluster')
    , worker = require('./clustering/workers');

var app = express();
app.use('/', routes);

// init app to worker
worker.setApp = app;

// init and start clustering
cluster.init();

