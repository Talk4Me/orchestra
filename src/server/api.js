'use strict';
var PubNub = require('pubnub')

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
    method: 'GET',
    path: '/api/sendMessage',
    handler: function (request, reply) {
      const response = 'hello world';
      pubnub.publish();
      reply(response);
    }
  }
];

module.exports = [
  {
    method: 'GET',
    path: '/api/hello',
    handler: function (request, reply) {
      const response = 'hello world';
      reply(response);
    }
  }
];
