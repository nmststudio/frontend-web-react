import React from 'react'


class EditTrainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            backup: this.props.editingTrainer,
            edited: this.props.editingTrainer
        };
        this.handleSave = this.handleSave.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
    }
    componentDidUpdate(prevProps, prevState) {
        console.log('comparingId', prevProps, this.props.id)
        if (prevProps.editingTrainer.id != this.props.editingTrainer.id) {
            this.setState({
                backup: this.props.editingTrainer,
                edited: this.props.editingTrainer
            })
        }

    }

    handleFirstNameChange(event) {
        this.setState({
            ...this.state,
            edited: {
                ...this.state.edited,
                firstname: event.target.value
            }
        })
    };
    handleLastNameChange(event) {
        this.setState({
            ...this.state,
            edited: {
                ...this.state.edited,
                lastname: event.target.value
            }
        })
    };
    handleReset(event) {
        console.log('reset fron', this.state)
        this.setState({
            ...this.state,
            edited: {
                ...this.state.backup
            }
        })
    }
    handleSave(event) {
        // ACCEPTING AN OBJECT IN THE SHAPE OF { event, start, end, isAllDay: droppedOnAllDaySlot, resourceId }

        this.props.editCallback(this.state.edited)
    }


    render() {
        return (
            <div className="row row-1 odd">
                <div className="col-md order-md-last">
                    <img src="http://notablehealth.com/images/company-problem-2.svg" />
                </div>
                <div className="col-md order-md-first justify-content-start">
                    <div className="text-wrapper">
                        <h4>Edit Trainer</h4>
                        <input  autoFocus={true} className="rbc-edit-input" type="text" value={this.state.edited.firstname || ''} onChange={this.handleFirstNameChange} /> 
                        <br />
                        <input  className="rbc-edit-input" type="text" value={this.state.edited.lastname || ''} onChange={this.handleLastNameChange} /> 
                        <br /> 
                        <br /> 
                        <button className="btn btn-primary" onClick={this.handleSave}>Save</button>
                        <button className="btn btn-info" onClick={this.handleReset}>Reset</button> 
                    </div>
                </div>
            </div>


        );
    }
}


export default EditTrainer