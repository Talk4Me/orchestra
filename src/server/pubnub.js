var PubNub = require('pubnub')

pubnub.subscribe({
    channels: ['my_channel'],
    withPresence: true // also subscribe to presence instances.
})

pubnub.addListener({
    
    message: function(m) {
        // handle message
        var channelName = m.channel; // The channel for which the message belongs
        var channelGroup = m.subscription; // The channel group or wildcard subscription match (if exists)
        var pubTT = m.timetoken; // Publish timetoken
        var msg = m.message; // The Payload
        console.log("m", m);
    },
    presence: function(p) {
        // handle presence
        var action = p.action; // Can be join, leave, state-change or timeout
        var channelName = p.channel; // The channel for which the message belongs
        var occupancy = p.occupancy; // No. of users connected with the channel
        var state = p.state; // User State
        var channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
        var publishTime = p.timestamp; // Publish timetoken
        var timetoken = p.timetoken;  // Current timetoken
        var uuid = p.uuid; // UUIDs of users who are connected with the channel
        console.log("p", p);
    },
    status: function(s) {
        console.log("s", s);
        // handle status
    }
})

pubnub.publish(
    {
        message: { 
            such: 'object'
        },
        channel: 'my_channel',
        sendByPost: false, // true to send via post
        storeInHistory: false, //override default storage options
        meta: { 
            "cool": "meta"
        }   // publish extra meta with the request
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
