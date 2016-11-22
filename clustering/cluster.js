/**
 * Created by qudrat on 11/4/16.
 */
'use strict';

const cluster = require('cluster')
    , master = require('./master')
    , workers = require('./workers');

class Cluster {
    constructor() {}
    init() {
        if (cluster.isMaster) {
            // start as master
            master.setCluster = cluster;
            master.init();
        }
        else {
            // start as worker
            workers.init();
        }
    }
}
module.exports = new Cluster();