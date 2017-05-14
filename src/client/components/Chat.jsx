import React from 'react';

export default class Chat extends React.Component {
    constructor (props) {
        super(props);

        this.getMessages = this.getMessages.bind(this);
    }

    getMessages () {
        const messages = this.props.conversation.Messages;
        return messages.map(message => {
            if (message.Sent) {
                return (
                    <div className="Chat__msg-send card">{message.MessageBody}</div>
                );
            } else {
                return (
                    <div className="Chat__msg-receive card">{message.MessageBody}</div>
                );
            }
        })
    }
    render () {
        return (
            <div className="Chat card">
                <div className="Chat__top-bar grey darken-2">
                    817-555-5555
                    <div className="Chat__close" onClick={this.props.closeChat}>x</div>
                </div>
                <div className="Chat__messages grey lighten-2">
                    {this.getMessages()}
                </div>
                <div className="Chat__input-container grey lighten-3">
                    <input className="Chat__input" type="text" />
                    <button className="Chat__send-btn waves-effect waves-light btn">Send</button>
                </div>
            </div>
        );
    }
}