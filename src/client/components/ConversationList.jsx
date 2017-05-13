import React from 'react';

import Conversation from './Conversation';
import Chat from './Chat';

export default class ConversationList extends React.Component {

    getConversations () {
        return this.props.conversations.map((conversation, idx) => {
          return  (
            <Conversation 
                conversation={conversation} 
                selectConversation={() => this.props.selectConversation(conversation)} 
                key={`conversation_${idx}`} 
            />
          );
        });
    }

    render () {
        return (
            <div className="ConversationList collection">
                <div className="collection-item Conversation">
                    <span className="Conversation__field">User</span>
                    <span className="Conversation__field">Source</span>
                </div>
                {this.getConversations()}
            </div>
        );
    }
}
