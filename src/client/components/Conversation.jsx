import React from 'react';

export default class Conversation extends React.Component {
    PrettyPrintPhoneNumber(stringg) {
            if (isNaN(stringg))
                return stringg;
            if (typeof(stringg) != "string")
                return stringg;
            return '+ ' + stringg[0] + ' (' + stringg.substring(1,4) + ') ' + stringg.substring(4,7) + '-' + stringg.substring(7);
        }
    render () {
        const activeClass = (this.props.active)? 'Conversation__active' : '';
        const compatibility = this.props.conversation.compatibility || 0;
        return (
            <a onClick={this.props.selectConversation} className={`Conversation ${activeClass} collection-item`}>
                <div className="Conversation__field">{this.PrettyPrintPhoneNumber(this.props.conversation.user)}</div>
                <div className="Conversation__field">{`Compatibility: ${Math.round(compatibility*1000)/1000}`}</div>
                <div className="Conversation__field">{this.props.conversation.source}</div>
            </a>
        );
    }
}