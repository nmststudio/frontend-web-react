import React from 'react'
import moment from 'moment'


class Card extends React.Component {

    constructor(props) {
        super(props);
        console.log('existing Props', this)
        this.state = {
            edited: {
                ...this.props.event
            }
        };
        this.handleSave = this.handleSave.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }

    handleTitleChange(event) {
        this.setState({
            ...this.state,
            edited: {
                ...this.props.event,
                title: event.target.value
            }
        });
    };

    handleSave(event) {
        console.log(this.props)

        // ACCEPTING AN OBJECT IN THE SHAPE OF { event, start, end, isAllDay: droppedOnAllDaySlot, resourceId }
        this.props.event.saveEdit(this.state.edited)
    }


    render() {


        return (
            <div>
            {this.props.event.editing  &&
	        		<div className="rbc-edit-popup">
	        			<input type="text" value={this.state.edited.title || ''} onChange={this.handleTitleChange} /> 
      			  		<button onClick={this.handleSave}>Save</button>
      			 	</div>
	        	}
          
	        	<span> {this.props.event.title}</span><br />
	      <span>{//moment(this.props.event.start).format('hh:mma')
	  }  	</span>
	        	<br /> 
	        	 
	    	</div>
        );
    }
}


export default Card