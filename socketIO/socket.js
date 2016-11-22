/**
 * Created by qudrat on 11/4/16.
 */
'use strict';

const redisChannel = require('../core/redis-channel');

module.exports = function (io) {

    io.of('/someNsp').on('connection', function (socket) {

        socket.on('error', function (err) {
            console.error('Error in connection socket customer: ', err);
        });

        console.info('Client connected to worker: ', process.pid);

        socket.on("messageToServer", function (msg, callback) {
            console.info('Received message from client: \'%s\'   Current worker PID: %d', msg, process.pid);
            redisChannel.callback({ "callbackData": true }, callback);
        });

        socket.on('disconnect', function () {
            console.info('SOCKET: disconnected ! socketId --- ', socket.id);
        });

    });


};


