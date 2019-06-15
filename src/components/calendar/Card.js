import React from 'react'
import moment from 'moment'


class Card extends React.Component {
    render() {
        return (
            <div>
            <strong>{moment(this.props.event.start).format('hh:mma')}</strong> {this.props.event.title}
	        	<span>{this.props.event.title}</span>
	        	{JSON.stringify(this.props.event.editing) &&
	        		<div> Editing </div>
	        	}
	        	<br /><br />
	        	{JSON.stringify(this.props.event)}
	    	</div>
        );
    }
}


export default Card