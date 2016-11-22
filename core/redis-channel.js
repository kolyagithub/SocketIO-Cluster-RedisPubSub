/**
 * Created by qudrat on 11/4/16.
 */
'use strict';

const config = require('../config/config.json')
    , redis = require('redis');

var callbackIDCounter = 0, callbacks = {};

class RedisChannels {
    constructor() {
        this.pub = null;
        this.sub = null;
    }
    init() {
        var self = this;
        self.pub = redis.createClient(config.redis.port, config.redis.host);
        self.sub = redis.createClient(config.redis.port, config.redis.host);
        self.sub.subscribe('messageChannel');

        self.sub.on('message', function(channel, data) {
            if (channel == 'messageChannel') {
                try {
                    data = JSON.parse(data);
                    if(typeof callbacks[data.id] == 'function'){
                        callbacks[data.id].apply(this, [data.callbackData]);
                        delete callbacks[data.id];
                    }
                } catch (e){
                    console.error("EXCEPTION in customer channel %s  error: %s", channel || 'CHANNEL NAME NOT DEFINED!', e);
                }
            }
        });
    }
    callback() {
        var args = Array.prototype.slice.call(arguments);
        var data = args[0];
        if(typeof args[args.length - 1] == 'function') {
            data.id = callbackIDCounter++;
            callbacks[data.id] = args[1];
        }
        this.pub.publish('messageChannel',JSON.stringify(data),function(err){
            if(err !== null) {
                console.error('Error in callback()');
            }
        });
    }
}
module.exports = new RedisChannels();

