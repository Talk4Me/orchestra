'use strict';
var PubNub = require('pubnub')
const Wreck = require('wreck');
var request = require('request');

var pubnub = new PubNub({
    publishKey: "pub-c-76e8488a-fde8-47c9-ae8a-b16895b941a1",
    subscribeKey: "sub-c-ab4c26e4-3813-11e7-887b-02ee2ddab7fe",
    ssl: true
})

pubnub.subscribe({
    channels: ['my_channel'],
    withPresence: true 
})

pubnub.addListener({
    
    message: function(m) {
        var channelName = m.channel;
        var channelGroup = m.subscription; 
        var msg = m.message; 
        var pubTT = m.timetoken;
        console.log("m", m);
    },
    presence: function(p) {
        var action = p.action; 
        var channelName = p.channel;
        var occupancy = p.occupancy; 
        var state = p.state; 
        var channelGroup = p.subscription; 
        var publishTime = p.timestamp;
        var timetoken = p.timetoken;
        var uuid = p.uuid;
        console.log("p", p);
    },
    status: function(s) {
        console.log("s", s);
    }
})

module.exports = [
    {
        method: 'POST',
        path: '/watson/api/message',
        handler: {
            proxy: {
                uri: 'http://34.208.47.19:5757/api/message'
            }
        }
    },
    {
        method: 'GET',
        path: '/api/personalize/{text}',
        handler: {
            proxy: {
                uri: 'http://52.42.158.42:5000/PersonaliTyzer?text={text}'
            }
        }
    },
    {
        method: 'GET',
        path: '/api/dumbdata',
        handler: {
            proxy: {
                uri: 'https://chatdb-80b85.firebaseio.com/Messages.json'
            }
        }
    },
    {
        method: 'GET',
        path: '/api/hello',
        handler: function(request, reply) {
            const response = 'hello world';
            reply(respons);
        }
    },

];
