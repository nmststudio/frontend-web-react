import React from 'react'
import moment from 'moment'


class Card extends React.Component {

    constructor(props) {
        super(props);
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

        // ACCEPTING AN OBJECT IN THE SHAPE OF { event, start, end, isAllDay: droppedOnAllDaySlot, resourceId }
        this.props.event.saveEdit(this.state.edited)
    }


    render() {


        return (
            <div>
	        	<span className="rbc-card-title"> {this.props.event.title}</span>
	        	{this.props.event.trainers && this.props.event.trainers.map((item, i) => {
				  return(
				    <span className="rbc-invitee" key={i}>
					    <span className="rbc-avatar">
						  <img src={"https://randomuser.me/api/portraits/women/"+item.id%10+".jpg"} alt="" />
						</span> 
						<span className = "rbc-invitee-name" > { item.firstname } { item.lastname } < /span>

				    </span>
				  )
				})}
	    	</div>
        );
    }
}


export default Card