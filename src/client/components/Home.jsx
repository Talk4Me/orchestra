import React from 'react';

import Title from './Title';
import ConversationList from './ConversationList';
import Chat from './Chat';

export default class Home extends React.Component {
  constructor (props) {
    super(props);
    const request = new Request('/api/hello', {
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
    const text = fetch(request).then((res) => {
      return res.text();
    });

    text.then((res) => console.log(res));

        this.state = {
            conversations: [
                {
                    id: 1,
                    source: 'Text',
                    user: 'Dayne Davis',
                    timestamp: '12:00'
                },
                {
                    id: 2,
                    source: 'Text',
                    user: 'Eric Slater',
                    timestamp: '12:00'
                }
            ],
            activeConversation: null
        }

        this.closeChat = this.closeChat.bind(this);
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
