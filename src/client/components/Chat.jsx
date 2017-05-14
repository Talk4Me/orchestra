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
            const bad = (message.Tone.anger > 0.5) || (message.Tone.sadness > 0.5)
            const badder = (message.Tone.anger > 0.65) || (message.Tone.sadness > 0.65)
            const worst = (message.Tone.anger > 0.8) || (message.Tone.sadness > 0.8)
            const good = (message.Tone.joy > 0.5)
            const better = (message.Tone.joy > 0.65)
            const best = (message.Tone.joy > 0.8)
            if (message.Sent) {
                if (best) {
                    return (
                        <div className="Chat__msg-send card Chat__msg-best-tone" key={`message${idx}`}>{message.MessageBody}</div>
                    );
                }                             
                else if (better) {
                    return (
                        <div className="Chat__msg-send card Chat__msg-better-tone" key={`message${idx}`}>{message.MessageBody}</div>
                    );
                }                                    
                else if (good) {
                    return (
                        <div className="Chat__msg-send card Chat__msg-good-tone" key={`message${idx}`}>{message.MessageBody}</div>
                    ); 
                }                   
                else if (worst) {
                    return (
                        <div className="Chat__msg-send card Chat__msg-worst-tone" key={`message${idx}`}>{message.MessageBody}</div>
                    );                                        
                }
                else if (badder) {
                    return (
                        <div className="Chat__msg-send card Chat__msg-badder-tone" key={`message${idx}`}>{message.MessageBody}</div>
                    );                                        
                }
                else if (bad) {
                    return (
                        <div className="Chat__msg-send card Chat__msg-bad-tone" key={`message${idx}`}>{message.MessageBody}</div>
                    );                                        
                }
                else {
                    return (
                        <div className="Chat__msg-send card" key={`message${idx}`}>{message.MessageBody}</div>
                    );
                }
            } else {
                if (best) {
                    return (
                        <div className="Chat__msg-receive card Chat__msg-best-tone" key={`message${idx}`}>{message.MessageBody}</div>
                    );
                }                
                else if (better) {
                    return (
                        <div className="Chat__msg-receive card Chat__msg-better-tone" key={`message${idx}`}>{message.MessageBody}</div>
                    );
                }                
                else if (good) {
                    return (
                        <div className="Chat__msg-receive card Chat__msg-good-tone" key={`message${idx}`}>{message.MessageBody}</div>
                    );
                }
                else if (worst) {
                    return (
                        <div className="Chat__msg-receive card Chat__msg-worst-tone" key={`message${idx}`}>{message.MessageBody}</div>
                    );
                }                
                else if (badder) {
                    return (
                        <div className="Chat__msg-receive card Chat__msg-badder-tone" key={`message${idx}`}>{message.MessageBody}</div>
                    );
                }
                else if (bad) {
                    return (
                        <div className="Chat__msg-receive card Chat__msg-bad-tone" key={`message${idx}`}>{message.MessageBody}</div>
                    );
                }
                else {
                    return (
                        <div className="Chat__msg-receive card" key={`message${idx}`}>{message.MessageBody}</div>
                    );
                }                
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
                <div className="Chat__top-bar grey darken-3">
                    <span className="Chat__Responder-Name">{this.props.conversation.user}</span>
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
                        //onKeyPress={onKeyPress={(e) => {(e.key === 'Enter' ? doSomething(this.refs.reference.value) : null)}}}
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

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            console.log('do validate');
        }
    }
}