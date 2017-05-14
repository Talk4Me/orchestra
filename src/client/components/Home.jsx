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
            this.setState({
                newState
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
        this.askWatson();
        conversations.forEach(conversation => {
            if(conversation["id"] == id) {
                var messageObj = {
                    "Timestamp": timeStamp,
                    "Sent": false,
                    "MessageBody": content
                }
                conversation["Messages"].push(messageObj)
                this.UpdateState(conversations);
                uglyassboolean = true;
            }
        })
        if (uglyassboolean) {
            return;
        }

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
                    conversations: response
                })
            })
        
        });
    }

askWatson (message, id) {
    var data = new FormData();
    data.append( "json", JSON.stringify({"input": {"text": "hey"}}));
        const request = new Request('watson/api/message', {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }),
            body: JSON.stringify({"input": {"text": "hey"}})
        });
        const text = fetch(request).then((res) => {

            res.json().then(response => {
                console.log("res", response.output.text[0]);
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

  sendMessage (id, message) {
    const conversations = this.state.conversations;
    const active = conversations.filter(conversation => {
      return conversation.id === id;
    });

    console.log(active, conversations);

    active[0].Messages.push(
        {
            "Timestamp": "05/13/2017 8:16:26PM",
            "Sent": true,
            "MessageBody": message
        }
    );

    this.setState({
      conversations
    });
  }

  getActiveConversation () {
      if (this.state.activeConversation) {
        const activeConversation = this.state.conversations.find(conv => { return conv.id === this.state.activeConversation;})

        return <Chat conversation={activeConversation} closeChat={this.closeChat}  sendMessage={(id, message) => this.sendMessage(id, message)} />;
      }
  }

  render () {
    return (
      <div className="Wrapper">
        <nav className="grey darken-2">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo">Talk4Me</a>
          </div>
        </nav>
        <div className="container">
            <ConversationList conversations={this.state.conversations} selectConversation={(conversation) => this.selectConversation(conversation.id)} />
            {this.getActiveConversation()}
        </div>
        </div>
        );
    }
}
