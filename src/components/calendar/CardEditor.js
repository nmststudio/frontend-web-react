import React from 'react'
import moment from 'moment'


class CardEditor extends React.Component {

    constructor(props) {
        super(props);

        let allTrainers = this.props.invitee;
        const addedTrainers = Array.from(this.props.event.trainers);


        for (var i = allTrainers.length - 1; i >= 0; i--) {
            for (var j = 0; j < addedTrainers.length; j++) {
                if (allTrainers[i] && (allTrainers[i].id === addedTrainers[j].id)) {
                    allTrainers.splice(i, 1);
                }
            }
        }

        this.state = {
            availableTrainers: allTrainers,
            backupAvailableTrainers: Array.from(allTrainers),
            edited: {
                ...this.props.event
            },
            backup: {
                ...this.props.event
            },

            currentEditingId: this.props.event.id

        };
        this.handleSave = this.handleSave.bind(this)
        this.handleReset = this.handleReset.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.addTrainer = this.addTrainer.bind(this);
        this.removeTrainer = this.removeTrainer.bind(this);

    }
    componentDidUpdate(prevProps, prevState) {

        if (!this.props.event) {

            return;
        }
        if (this.state.currentEditingId == this.props.event.id) {

            return;
        }

        let allTrainers = this.props.invitee;
        const addedTrainers = Array.from(this.props.event.trainers);


        for (var i = allTrainers.length - 1; i >= 0; i--) {
            for (var j = 0; j < addedTrainers.length; j++) {
                if (allTrainers[i] && (allTrainers[i].id === addedTrainers[j].id)) {
                    allTrainers.splice(i, 1);
                }
            }
        }


        this.setState({
            ...this.state,
            availableTrainers: allTrainers,
            backupAvailableTrainers: Array.from(allTrainers),
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
            },

            function() { console.log(this.state) });

    };
    handleReset(event) {
        this.setState({
            ...this.state,
            edited: {
                ...this.state.backup
            },
            availableTrainers: Array.from(this.state.backupAvailableTrainers)
        })
    }
    handleSave(event) {
        // ACCEPTING AN OBJECT IN THE SHAPE OF { event, start, end, isAllDay: droppedOnAllDaySlot, resourceId }
        this.props.saveHandler(this.state.edited)
    }

    addTrainer(event) {
        let tempAvailableTrainers = this.state.availableTrainers
        let addNewTrainer = null;
        for (var i = tempAvailableTrainers.length - 1; i >= 0; i--) {
            if (tempAvailableTrainers[i].id === parseInt(event.target.id, 10)) {
                addNewTrainer = tempAvailableTrainers.splice(i, 1);
            }
        }



        this.setState({
            ...this.state,
            edited: {
                ...this.state.edited,
                trainers: this.state.edited.trainers.concat(addNewTrainer)
            },
            availableTrainers: this.state.availableTrainers
        })
    }

    removeTrainer(event) {
        let tempAddedTrainers = this.state.edited.trainers;
        let removedTrainer = null;
        for (var i = tempAddedTrainers.length - 1; i >= 0; i--) {
            if (tempAddedTrainers[i].id === parseInt(event.target.id, 10)) {
                removedTrainer = tempAddedTrainers.splice(i, 1);
            }
        }



        this.setState({
            ...this.state,
            edited: {
                ...this.state.edited,
                trainers: tempAddedTrainers
            },
            availableTrainers: this.state.availableTrainers.concat(removedTrainer)
        })
    }

    render() {
        return (
            <div className="container rbc-edit-layer">
                <div>
                    <input autoFocus={true} className="rbc-edit-input" type="text" value={this.state.edited.title || ''} onChange={this.handleTitleChange} /> 
                    
                 </div>
                <strong></strong>
                <span> </span>          
                <br />
                <div> Current Trainers </div>
                {this.state.edited.trainers.map((item, i) => {
                  return(
                    <span className="rbc-invitee" key={i}>
                        <span className="rbc-avatar">
                          <img src={"https://randomuser.me/api/portraits/women/"+(item.id%10)+".jpg"} alt="" />
                        </span> 
                        <span className="rbc-invitee-name" > { item.firstname } { item.lastname } < /span>
                        <span onClick={this.removeTrainer} id={item.id} className="rbc-invitee-remove-button" > x < /span>
                    </span>
                  )
                })}

                <br /><br /><br />
                <div> Other Trainers </div>

                 {this.state.availableTrainers.map((item, i) => {
                  return(
                    <span className="rbc-invitee" key={i}>
                        <span className="rbc-avatar">
                          <img src={"https://randomuser.me/api/portraits/women/"+Math.floor(Math.random()*300%10)+".jpg"} alt="" />
                        </span> 
                        <span className="rbc-invitee-name" > { item.firstname } { item.lastname } < /span>
                        <span onClick={this.addTrainer} id={item.id} className="rbc-invitee-remove-button" > + < /span>
                    </span>
                  )
                })}

                <br /><br />
                <br /><br />

                <button onClick={this.handleSave}>Save</button>
                <button onClick={this.handleReset}>Reset</button> 
                <br />
            </div>
        );
    }
}


export default CardEditor