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



class StudioForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.validateAndCreateStudio = this.validateAndCreateStudio.bind(this);
        this.props.fetchStudios();
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
        const { handleSubmit, submitting } = this.props;
        return (
            <div className='container'>
        <Form
           validate={validate}
           initialValues={{ name:'Yoga '+Math.floor(Math.random()*1000) }}
            onSubmit={this.validateAndCreateStudio}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit = { event => {
              handleSubmit({})
              event.preventDefault();
               }} >
                <div>
                  <label>Username</label>
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
          {this.props.studios.map(function(d, idx){
            return (
                   
              <li key={idx}>
                <Link to={"/admin/studio/edit/"+d.id}>
                  {d.name}
                </Link>
              </li>

              )
         })}
         </ul></pre>
           </div>

        )
    }
}


export default StudioForm