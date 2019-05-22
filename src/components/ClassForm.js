import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withRouter
} from 'react-router-dom'
import { Link } from 'react-router-dom';
import DatePicker from "react-datepicker";
import setMinutes from "date-fns/setMinutes";
import setHours from "date-fns/setHours";

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



class ClassForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.validateAndCreateClass = this.validateAndCreateClass.bind(this);
        this.handleStartDateChange = this.handleStartDateChange.bind(this);
        this.handleEndDateChange = this.handleEndDateChange.bind(this);

        this.state = {
            startDate: new Date(),
            endDate: new Date()
        };

    }

    handleStartDateChange(date) {
        this.setState({
            startDate: date
        });
    }
    handleEndDateChange(date) {
        this.setState({
            endDate: date
        });
    }



    validateAndCreateClass(values, dispatch) {
        // this.props.createStudio(values)
        console.log(values, this.state.startDate, this.state.endDate)
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
        const { handleSubmit, submitting } = this.props;
        return (
            <div className='container'>
             <DatePicker
                  onChange={this.handleStartDateChange}
                  selected={this.state.startDate}
                  showTimeSelect
                  minTime={setHours(setMinutes(new Date(), 0), 17)}
                  maxTime={setHours(setMinutes(new Date(), 30), 20)}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeFormat="HH:mm"
                />
                             <DatePicker
                  onChange={this.handleEndDateChange}
                  selected={this.state.endDate}
                  showTimeSelect
                  minTime={setHours(setMinutes(new Date(), 0), 17)}
                  maxTime={setHours(setMinutes(new Date(), 30), 20)}
                  dateFormat="MMMM d, yyyy h:mm aa"
                  timeFormat="HH:mm"
                />

        <Form
           validate={validate}
           initialValues={{ name:'Class '+Math.floor(Math.random()*1000) }}
            onSubmit={this.validateAndCreateClass}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit = { event => {
              handleSubmit({})
              event.preventDefault();
               }} >
                <div>
                  <label>Class Name</label>
                  <Field
                    name="name"
                    component="input"
                    type="text"
                    placeholder="name"
                  />
                </div> 
                
               
                <div className="buttons">
                  <button type="submit" disabled={submitting}>
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </button>
                </div>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
                <pre>{JSON.stringify(this.props.state, 0, 2)}</pre>
              </form>
            )}
          /><pre>
          <ul>
           
         </ul></pre>
           </div>

        )
    }
}


export default ClassForm