import React from 'react'
import moment from 'moment'


class CardEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            edited: {
                ...this.props.event
            }
        };
        this.handleSave = this.handleSave.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {

        if (!this.props.event) {
            return;
        }
        if (this.state.currentEditingId == this.props.event.id) {
            return;
        }
        this.setState({
            ...this.state,
            currentEditingId: this.props.event.id,
            edited: {
                ...this.props.event
            },
            backup: {
                ...this.props.event
            }
        })
    }

    handleTitleChange(event) {
        this.setState({
            ...this.state,
            edited: {
                ...this.state.edited,
                title: event.target.value
            }
        });
    };
    handleReset(event) {
        this.setState({
            ...this.state,
            edited: {
                ...this.state.backup
            }
        })
    }
    handleSave(event) {
        // ACCEPTING AN OBJECT IN THE SHAPE OF { event, start, end, isAllDay: droppedOnAllDaySlot, resourceId }
        this.props.saveHandler(this.state.edited)
    }


    render() {
        return (
            <div className="rbc-edit-layer">
                <div>
                    <input className="rbc-edit-input" type="text" value={this.state.edited.title || ''} onChange={this.handleTitleChange} /> 
                    
                 </div>
                <strong></strong>
                <span> </span>          
                <br />
                <button onClick={this.handleSave}>Save</button>
                <button onClick={this.handleReset}>Reset</button> 
                <br />
            </div>
        );
    }
}


export default CardEditor