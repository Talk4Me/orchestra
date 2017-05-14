import React from 'react';

import Conversation from './Conversation';
import Chat from './Chat';

export default class ConversationList extends React.Component {

    getConversations () {
        return this.props.conversations.map((conversation, idx) => {
          return  (
            <Conversation 
                active={conversation.id === this.props.activeConversation}
                conversation={conversation} 
                selectConversation={() => this.props.selectConversation(conversation)} 
                key={`conversation_${idx}`} 
            />
          );
        });
    }

    render () {
        return (
            <div className="ConversationList__wrapper grey lighten-2">
            <div className="ConversationList collection">
                {this.getConversations()}
            </div>
            </div>
        );
    }
}
