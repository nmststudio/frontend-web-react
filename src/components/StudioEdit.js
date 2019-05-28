import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withRouter
} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form'
//import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';
import renderTextArea from './renderTextArea';
import { validatePostFields, validatePostFieldsSuccess, validatePostFieldsFailure } from '../actions/posts';
import { createPost, createPostSuccess, createPostFailure, resetNewPost } from '../actions/posts';




//Client side validation
function validate(values) {
    const errors = {};

    if (!values.name || values.name.trim() === '') {
        errors.name = 'Enter a Title';
    }
    return errors;
}



class StudioEdit extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props) {
        super(props);
        console.log(props);


        // Initialize the main object and the edited object

        var studio = { name: '' }
        this.state = { currentStudio: studio, editedStudio: studio };

        // Bind all the form controllers 

        this.resetStudio = this.resetStudio.bind(this);
        this.saveStudio = this.saveStudio.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.saveStudio = this.saveStudio.bind(this);
        this.props.fetchStudio(this.props.id);




    }



    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            ...this.state,
            currentStudio: nextProps.currentStudio,
            editedStudio: nextProps.currentStudio
        });
    }

    handleChange(event) {
        console.log('CHANGE ')
        this.setState({
            ...this.state,
            editedStudio: {
                ...this.state.editedStudio,
                name: event.target.value
            }
        });
    }

    resetStudio(event) {

        this.setState({
            ...this.state,
            editedStudio: this.state.currentStudio
        })
    }
    saveStudio(event) {
        console.log('handler for saving Studio');
        this.props.editStudio(this.state.editedStudio)
    }


    render() {
        console.log('STATE', this.state)
        const { handleSubmit, submitting, currentStudio } = this.props;
        return (<div>
            <h2>{ this.state.currentStudio.name }</h2> 
            <br />
            <input type="text" value={this.state.editedStudio.name || ''} onChange={this.handleChange} /> 
            <br />
            <br /> 
            < button onClick = { this.saveStudio } > Save < /button>
            < button type = "button" onClick = { this.resetStudio }> Reset </button> 
            <br / > 
            <pre>{ JSON.stringify(currentStudio, 0, 2) } </pre> 
            </div>)
    }
}


export default StudioEdit