/**
 * Created by qudrat on 11/4/16.
 */
'use strict';

const config = require('../config/config.json')
    , net = require('net')
    , num_processes = require('os').cpus().length;

class Master {
    constructor() {
        this.cluster = null;
    }

    get getCluster() {
    }

    set setCluster(value) {
        this.cluster = value;
    }

    init() {
        var workers = [];
        var cluster = this.cluster;
        var spawn = function (i) {
            workers[i] = cluster.fork();
            workers[i].on('exit', function (worker, code, signal) {
                console.log('restarting worker', i);
                spawn(i);
            });
        };
        for (var i = 0; i < num_processes; i++) {
            spawn(i);
        }
        var worker_index = function(ip, len) {
            var s = '';
            for (var i = 0, _len = ip.length; i < _len; i++) {
                if (!isNaN(ip[i])) {
                    s += ip[i];
                }
            }
            return Number(s) % len;
        };
        var server = net.createServer({pauseOnConnect: true}, function (connection) {
            var idx = worker_index(connection.remoteAddress, num_processes);
            var worker = workers[idx];
            worker.send('sticky-session:connection', connection);
        });
        server.maxConnections = Infinity;
        server.listen(config.app.port);
    }
}
module.exports = new Master();
