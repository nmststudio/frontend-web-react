import React from 'react'

import AddTrainer from './AddTrainer';
import EditTrainer from './EditTrainer';
import ReactTable from 'react-table'

const propTypes = {}
const resourceMap = [
    { resourceId: 1, resourceTitle: 'ClassRoom' },
]

class TrainerEditor extends React.Component {
    constructor(...args) {
        super(...args)
        this.state = { ...this.state, isAddingTrainer: false, isEditingTrainer: false }

        this.props.fetchTrainers(this.props.studioId)
        this.showAddTrainerModule = this.showAddTrainerModule.bind(this)
        this.addTrainerCallback = this.addTrainerCallback.bind(this)
        this.showEditTrainerModule = this.showEditTrainerModule.bind(this)
        this.editTrainerCallback = this.editTrainerCallback.bind(this)
    }


    componentDidUpdate(prevProps, prevState) {
        console.log('UPDATE PROPS IN CALENDAR', this.props)
        let idx = 0;
        if (this.state.areEventsOutOfDate && this.props.trainers.length > 0) {
            let events = this.props.trainers.map(obj => {
                return {
                    id: ++idx,
                    remoteId: obj.id,
                    title: obj.name,
                    start: moment(obj.startTime).toDate(),
                    end: moment(obj.endTime).toDate(),
                    resourceId: 1,
                }
            })
            console.log('UPDATE EVENTS ', events.length)
            this.setState({
                ...this.state,
                events: events,
                areEventsOutOfDate: false,
            })
        }
    }




    showAddTrainerModule(event) {
        this.setState({
            ...this.state,
            isAddingTrainer: true,
            isEditingTrainer: false
        })
    }

    addTrainerCallback(trainer) {
        this.setState({
            ...this.state,
            isAddingTrainer: false,
        })
        this.props.createTrainer(trainer, this.props.studioId)
    }

    showEditTrainerModule(event) {
        console.log(event.target.id)


        let editedTrainer = null
        for (let i = 0; i < this.props.trainers.length; i++) {
            if (this.props.trainers[i].id == event.target.id) {
                editedTrainer = this.props.trainers[i];
            }
        }


        this.setState({
            ...this.state,
            currentEditingTrainer: editedTrainer,
            isAddingTrainer: false,
            isEditingTrainer: true
        })
    }

    editTrainerCallback(newTrainer) {
        this.props.editTrainer(newTrainer);
        this.setState({
            ...this.state,
            isEditingTrainer: false,
        })
    }

    render() {
        const columns = [{
            Header: 'First Name',
            accessor: 'firstname' // String-based value accessors!
        }, {
            Header: 'Last Name',
            accessor: 'lastname',
        }, {
            Header: 'Edit',
            id: 'edit',
            accessor: d => d, // Custom value accessors!
            Cell: props => <button onClick={this.showEditTrainerModule} id={props.value.id} className="btn-sm btn-primary ">Edit Trainer {JSON.stringify(props.value.id)}</button>
        }]

        console.log('---RENDER', this.props.trainers)
        return (
            <div> 
            {!this.state.isAddingTrainer && 
                <button className="btn btn-primary" onClick={this.showAddTrainerModule}> Add Trainer </button>
            }
            {this.state.isAddingTrainer && <AddTrainer addCallback={this.addTrainerCallback} />}
            <br /><br />
            {this.state.isEditingTrainer && <EditTrainer editCallback={this.editTrainerCallback} editingTrainer={this.state.currentEditingTrainer}/> }
            <ReactTable
              defaultPageSize= {10}
              data = { this.props.trainers }
              columns={columns}
            />
            <br /><br />

            </div>)
    }
}

TrainerEditor.propTypes = propTypes

export default TrainerEditor