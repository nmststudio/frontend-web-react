import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withRouter
} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form'

import CalendarEditorContainer from './../containers/admin/CalendarEditorContainer.js';


import moment from 'moment'


//Client side validation
function validate(values) {
    const errors = {};

    if (!values.name || values.name.trim() === '') {
        errors.name = 'Enter a Title';
    }
    return errors;
}



class Studio extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props) {
        super(props);
        // Initialize the main object and the edited object

        var studio = { name: '' }
        this.state = { currentStudio: studio, editedStudio: studio };

        // Bind all the form controllers 
        this.props.fetchStudio(this.props.id);
    }





    componentWillReceiveProps(nextProps) {
        this.setState({
            ...this.state,
            currentStudio: nextProps.currentStudio,
        });
    }


    render() {
        const { handleSubmit, submitting, currentStudio } = this.props;
        if (!currentStudio) { return (<div></div>); }
        return (<div>
            <h1>{ this.props.currentStudio.name }</h1> 
            <br />
            <Link to={"/admin/studio/edit/"+this.props.id}>
                Edit { this.state.currentStudio.name }
            </Link>
            <hr />
            <h2>Classes</h2>
            <div>
                <CalendarEditorContainer studioId={this.props.id} />
            </div>
            <h2>Trainers</h2>
          
            </div>)
    }
}


export default Studio