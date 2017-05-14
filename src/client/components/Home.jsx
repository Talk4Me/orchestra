import React from 'react';

import Title from './Title';
import ConversationList from './ConversationList';
import Chat from './Chat';
import PubNub from 'pubnub';

export default class Home extends React.Component {
    constructor (props) {
        super(props);

        this.pubnub = new PubNub({
            publishKey: "pub-c-76e8488a-fde8-47c9-ae8a-b16895b941a1",
            subscribeKey: "sub-c-ab4c26e4-3813-11e7-887b-02ee2ddab7fe",
            ssl: true
        })

        this.pubnub.subscribe({
            channels: ['inbound'],
            withPresence: true 
        })

        this.pubnub.addListener({
            
            message: (m => {
                var channelName = m.channel;
                var channelGroup = m.subscription; 
                var msg = m.message; 
                var pubTT = m.timetoken;
                this.AddMessage(m);
            }),
            presence: function(p) {
                var action = p.action; 
                var channelName = p.channel;
                var occupancy = p.occupancy; 
                var state = p.state; 
                var channelGroup = p.subscription; 
                var publishTime = p.timestamp;
                var timetoken = p.timetoken;
                var uuid = p.uuid;
            },
            status: function(s) {
            }
        })

        // this.pubnub.publish(
        //     {
        //         message: { 
        //             such: 'object'
        //         },
        //         channel: 'my_channel',
        //         sendByPost: false,
        //         storeInHistory: false,
        //         meta: { 
        //             "cool": "meta"
        //         }
        //     });

        this.state = {
            conversations: [],
            activeConversation: null
        }

        this.closeChat = this.closeChat.bind(this);
    }

    UpdateState(newState) {
        console.log(newState)
            this.setState({
                conversations: newState
            });
    }

    AddMessage (m) {
        var timeStamp = m.timetoken;
        var messageBody = m.message;
        var content = messageBody["Content"];
        var source = messageBody["SenderType"];
        var user = messageBody["SenderId"];
        var id = (source + user).toLowerCase().replace(/\s+/g, '');

        var uglyassboolean = false;
        var conversations = this.state.conversations;
        console.log('adding message', m);
        conversations.forEach(conversation => {
            if(conversation["id"] == id) {

                console.log('conv', conversation);
                var messageObj = {
                    "Timestamp": timeStamp,
                    "Sent": false,
                    "MessageBody": content
                }
                conversation["Messages"].push(messageObj);
                console.log('new conv', conversation);
                this.UpdateState(conversations);
                if (!conversation.userTakeover) {
                    this.askWatson(content, id);
                }
                uglyassboolean = true;
            }
        })
        if (uglyassboolean) {
            return;
        }
        this.askWatson(content, id);
        var newIdMessageObj = {
            "id": id,
            "source": source,
            "user": user,
            "Messages": [{
                "Timestamp": timeStamp,
                "Sent": false,
                "MessageBody": content
            }]
        };
        conversations.push(newIdMessageObj);
        this.UpdateState(conversations)
    }

componentDidMount () {
        const request = new Request('/api/dumbdata', {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        const text = fetch(request).then((res) => {

            res.json().then(response => {
                console.log("res", response);
                this.setState({
                    conversations: response,
                    activeConversation: response[0].id
                })
            })
        
        });
    }
    
//var throttle = require('lodash.throttle');
askWatson (message, id) {
    var data = new FormData();
        const request = new Request('watson/api/message', {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }),
            body: JSON.stringify({"input": {"text": message}})
        });
        const text = fetch(request).then((res) => {
            res.json().then(response => {
                var textArray = response.output.text;
                this.sendMessage(id, textArray[0], true);
                textArray.shift();
                textArray.forEach(text => {
                        this.sendMessage(id, text, true);
                    }
                )
            })
        });
}

  selectConversation (id) {
      this.setState({
          activeConversation: id
      });
  }

  closeChat () {
      this.setState({
          activeConversation: null
      });
  }

  sendMessage (id, message, watson) {
    const conversations = this.state.conversations;
    const active = conversations.filter(conversation => {
      return conversation.id === id;
    });


    active[0].Messages.push(
        {
            "Timestamp": "05/13/2017 8:16:26PM",
            "Sent": true,
            "MessageBody": message
        }
    );

    if (!watson) {
        active[0].userTakeover = true;
    }

    console.log(active[0].user, message);

    this.pubnub.publish(
    {
        message: {
            "SenderType": active[0].source,
            "SenderId": active[0].user,
            "Content": message
        },
        channel: 'outbound',
        sendByPost: false,
        storeInHistory: false
    });

    this.setState({
      conversations
    });
  }

  getActiveConversation () {
      if (this.state.conversations.length > 0) {
        let activeConversation = this.state.conversations.find(conv => { return conv.id === this.state.activeConversation;})
        activeConversation = activeConversation || this.state.conversations[0];
        console.log(activeConversation);

        return <Chat conversation={activeConversation} closeChat={this.closeChat}  sendMessage={(id, message) => this.sendMessage(id, message)} />;
      }
  }

  render () {
    return (
      <div className="Wrapper">
        <nav className="grey darken-3">
          <div className="nav-wrapper grey darken-3">
            <a href="#" className="brand-logo">Talk4Me</a>
          </div>
        </nav>
        <div className="container">
            <ConversationList activeConversation={this.state.activeConversation} conversations={this.state.conversations} selectConversation={(conversation) => this.selectConversation(conversation.id)} />
            {this.getActiveConversation()}
        </div>
        </div>
        );
    }
}
