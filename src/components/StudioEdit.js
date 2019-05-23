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
        // This binding is necessary to make `this` work in the callback
        this.validateAndCreateStudio = this.validateAndCreateStudio.bind(this);
        this.props.fetchStudio(this.props.id);
    }


    validateAndCreateStudio(values, dispatch) {
        this.props.createStudio(values)
    }

    componentWillMount() {
        //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
        //always reset that global state back to null when you REMOUNT
        //this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        // if (nextProps.newPost.post && !nextProps.newPost.error) {
        //     this.context.router.push('/');
        //  }
    }


    render() {
        const { handleSubmit, submitting, currentStudio } = this.props;
        return (
            <div className='container'>
              <h2>{currentStudio.name}</h2>
              {JSON.stringify(currentStudio, 0, 2)}
           </div>
        )
    }
}


export default StudioEdit