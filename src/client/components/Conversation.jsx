import React from 'react';

export default class Conversation extends React.Component {
    render () {
        return (
            <a onClick={this.props.selectConversation} className="Conversation collection-item">
                <span className="Conversation__field">{this.props.conversation.user}</span>
                <span className="Conversation__field">{this.props.conversation.source}</span>
            </a>
        );
    }
}