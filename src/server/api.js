'use strict';
var PubNub = require('pubnub')
const Wreck = require('wreck');
var http = require('request');

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

pubnub.publish(
    {
        message: { 
            such: 'object'
        },
        channel: 'my_channel',
        sendByPost: false,
        storeInHistory: false,
        meta: { 
            "cool": "meta"
        }
    }, 
    function (status, response) {
        if (status.error) {
            // handle error
            console.log(status)
        } else {
            console.log("message Published w/ timetoken", response.timetoken)
        }
    }
);

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
    path: '/api/hello',
    handler: function (request, reply) {
      const response = 'hello world';
      reply(respons);
    }
  },
  
  {
    //method: 'GET',
    //path: '/api/dumbdata',
    //handler: function (request, reply) {
    ////var json = require('./dumbdata.json');
    //console.log("json", json);
    //  reply(json);
      //}

      request('https://chatdb-80b85.firebaseio.com/Messages.json', function (error, response, body) {
          reply(body);
      });
  }
];
