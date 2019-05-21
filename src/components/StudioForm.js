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

    if (!values.title || values.title.trim() === '') {
        errors.title = 'Enter a Title';
    }
    if (!values.categories || values.categories.trim() === '') {
        errors.categories = 'Enter categories';
    }
    if (!values.content || values.content.trim() === '') {
        errors.content = 'Enter some content';
    }

    return errors;
}

//For instant async server validation
const asyncValidate = (values, dispatch) => {
    return dispatch(validatePostFields(values))
        .then((result) => {
            //Note: Error's "data" is in result.payload.response.data
            // success's "data" is in result.payload.data
            if (!result.payload.response) { //1st onblur
                return;
            }

            let { data, status } = result.payload.response;
            //if status is not 200 or any one of the fields exist, then there is a field error
            if (response.payload.status != 200 || data.title || data.categories || data.description) {
                //let other components know of error by updating the redux` state
                dispatch(validatePostFieldsFailure(data));
                throw data; //throw error
            } else {
                //let other components know that everything is fine by updating the redux` state
                dispatch(validatePostFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
            }
        });
};





class StudioForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    validateAndCreatePost(values, dispatch) {
        return dispatch(createPost(values, sessionStorage.getItem('jwtToken')))
            .then(result => {
                // Note: Error's "data" is in result.payload.response.data (inside "response")
                // success's "data" is in result.payload.data
                if (result.payload.response && result.payload.response.status !== 200) {
                    dispatch(createPostFailure(result.payload.response.data));
                    throw new SubmissionError(result.payload.response.data);
                }
                //let other components know that everything is fine by updating the redux` state
                dispatch(createPostSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
            });
    }

    componentWillMount() {
        //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
        //always reset that global state back to null when you REMOUNT
        //this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.newPost.post && !nextProps.newPost.error) {
            this.context.router.push('/');
        }
    }


    render() {
        console.log('studio creation form loaded')
        const { handleSubmit, submitting, newPost } = this.props;
        return (
            <div className='container'>
        <Form
           validate={validate}
           initialValues={{ username:Math.floor(Math.random()*10000000)+'@g.com',password:'test' }}
            onSubmit={this.validateAndCreatePost}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit = { handleSubmit }>
                <div>
                  <label>Username</label>
                  <Field
                    name="username"
                    component="input"
                    type="text"
                    placeholder="username"
                  />
                </div> 
                <div>
                  <label>Password</label>
                  <Field
                    name="password"
                    component="input"
                    type="password"
                    placeholder="Password"
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
          />

           </div>

        )
    }
}


export default StudioForm