import React from 'react';
import ReactDOM from 'react-dom';

export default class Chat extends React.Component {
    constructor (props) {
        super(props);

        this.getMessages = this.getMessages.bind(this);
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        const node = ReactDOM.findDOMNode(this.messagesEnd);
        node.scrollIntoView({ behavior: "smooth" });
    }

    getMessages () {
        const messages = this.props.conversation.Messages;
        return messages.map((message, idx) => {
            if (message.Sent) {
                return (
                    <div className="Chat__msg-send card" key={`message${idx}`}>{message.MessageBody}</div>
                );
            } else {
                return (
                    <div className="Chat__msg-receive card" key={`message${idx}`}>{message.MessageBody}</div>
                );
            }
        })
    }

    sendMessage (message) {
        this.props.sendMessage(this.props.conversation.id, this.input.value);
        this.input.value = '';

    }

    render () {
        return (
            <div className="Chat card">
                <div className="Chat__top-bar grey darken-2">
                    {this.props.conversation.user}
                    <div className="Chat__close" onClick={this.props.closeChat}>x</div>
                </div>
                <div className="Chat__messages grey lighten-2">
                    {this.getMessages()}
                    <div 
                        style={ {float:"left", clear: "both"} }
                        ref={(el) => { this.messagesEnd = el; }}></div>
                    </div>
                <div className="Chat__input-container grey lighten-3">
                    <input 
                        ref={(el) => { this.input = el; }}
                        className="Chat__input" 
                        type="text" 
                    />
                    <button 
                        className="Chat__send-btn waves-effect waves-light btn"
                        onClick={() => this.sendMessage('hey')}
                    >
                        Send
                    </button>
                </div>
            </div>
        );
    }
}