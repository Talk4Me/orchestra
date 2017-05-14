import React from 'react';

export default class Conversation extends React.Component {
    render () {
        const activeClass = (this.props.active)? 'Conversation__active' : '';

        return (
            <a onClick={this.props.selectConversation} className={`Conversation ${activeClass} collection-item`}>
                <div className="Conversation__field">{this.props.conversation.user}</div>
                <div className="Conversation__field">{this.props.conversation.source}</div>
            </a>
        );
    }
}