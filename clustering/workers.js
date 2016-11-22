/**
 * Created by qudrat on 11/4/16.
 */
'use strict';

const manageSocketIO = require('../socketIO/manage')
    , redisChannels = require('../core/redis-channel')
    , config = require('../config/config');

class Workers {
    constructor() {
        this.app = null;
        this.ioInstance = null;
    }
    get getApp() {}
    set setApp(value) {
        this.app = value;
    }
    getSocketIO() {
        return this.ioInstance;
    }
    init() {
        redisChannels.init();
        var app = this.app;
        // Create HTTP server
        var http = require('http');
        var server = http.createServer(app);
        // start HTTP
        server.listen(0, function () {
            //console.info('Server listening on port %d ', config.app.port);
            console.info('Worker PID: %d is running', process.pid);
        });
        // Create Socket.io
        var socketIO = require('socket.io');
        var ioInstance = socketIO(server).listen(server);
        manageSocketIO.setSocketInstance(ioInstance);
        this.ioInstance = ioInstance;
        // listen master
        process.on('message', function(message, connection) {
            if (message !== 'sticky-session:connection') {
                return;
            }
            server.emit('connection', connection);
        });
    }
}
module.exports = new Workers();
