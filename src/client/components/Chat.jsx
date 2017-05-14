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

    sendMessage () {
        this.props.sendMessage(this.props.conversation.id, this.input.value);
        this.input.value = '';
    }

    handleKeyPress (ev) {
        if (ev.key === 'Enter') {
            this.sendMessage();
        }
    }

    render () {
        return (
            <div className="Chat card">
                <div className="Chat__top-bar grey darken-3">
                    {this.props.conversation.user}
                    <div className="Chat__close" onClick={this.props.closeChat}>x</div>
                    <span className="Chat__user">{(this.props.conversation.userTakeover) ? 'User Active' : 'Bot Active' }</span>
                </div>
                <div className="Chat__messages grey lighten-2">
                    {this.getMessages()}
                    <div 
                        style={ {float:"left", clear: "both"} }
                        ref={(el) => { this.messagesEnd = el; }}></div>
                    </div>
                <div className="Chat__input-container">
                    <input 
                        ref={(el) => { this.input = el; }}
                        className="Chat__input" 
                        type="text" 
                        onKeyPress={(ev) => this.handleKeyPress(ev)}
                    />
                    <button 
                        className="Chat__send-btn waves-effect waves-light btn teal darken-3"
                        onClick={() => this.sendMessage('hey')}
                    >
                        Send
                    </button>
                </div>
            </div>
        );
    }
}