import React from 'react';

export default class Chat extends React.Component {
    render () {
        return (
            <div className="Chat card">
                <div className="Chat__top-bar grey darken-2">
                    817-555-5555
                </div>
                <div className="Chat__messages grey lighten-2">
                    <div className="Chat__msg-send card">Hey</div>
                    <div className="Chat__msg-receive card">Hey there</div>
                </div>
                <div className="Chat__input-container grey lighten-3">
                    <input className="Chat__input" type="text" />
                    <button className="Chat__send-btn waves-effect waves-light btn">Send</button>
                </div>
            </div>
        );
    }
}