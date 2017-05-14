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
        channels: ['my_channel'],
        withPresence: true 
    })

    this.pubnub.addListener({
        
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

    this.pubnub.publish(
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

   

        this.state = {
            conversations: [],
            activeConversation: null
        }

        this.closeChat = this.closeChat.bind(this);
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

  getActiveConversation () {
      if (this.state.activeConversation) {
          return <Chat conversation={this.state.conversations[0]} closeChat={this.closeChat} />;
      }
  }

  render () {
    return (
      <div className="Wrapper">
        <nav className="grey darken-2">
          <div class="nav-wrapper">
            <a href="#" class="brand-logo">Talk4Me</a>
          </div>
        </nav>
        <div className="container">
          <ConversationList 
            conversations={this.state.conversations} 
            selectConversation={(conversation) => this.selectConversation(conversation.id)} 
          />
          {this.getActiveConversation()}
        </div>
      </div>
    );
  }
}
