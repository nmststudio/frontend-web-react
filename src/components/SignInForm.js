import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withRouter
} from 'react-router-dom'

import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form'
//import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';

//Client side validation
function validate(values) {
    var errors = {};
    var hasErrors = false;
    if (!values.username || values.username.trim() === '') {
        errors.username = 'Enter username';
        hasErrors = true;
    }
    if (!values.password || values.password.trim() === '') {
        errors.password = 'Enter password';
        hasErrors = true;
    }
    return hasErrors && errors;
}





class SignInForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    componentWillMount() {
        //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
        //always reset that global state back to null when you REMOUNT
        this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {
            console.log(this.props.history)
            this.props.history.push('/')
            //this.context.router.push('/');
        }
        console.log(nextProps)
        //error
        //Throw error if it was not already thrown (check this.props.user.error to see if alert was already shown)
        //If u dont check this.props.user.error, u may throw error multiple times due to redux-form's validation errors
        if (nextProps.user.status === 'signin' && !nextProps.user.user && nextProps.user.error && !this.props.user.error) {
            alert('HERe', nextProps.user.error.message);
        }
    }

    //For any field errors upon submission (i.e. not instant check)
    validateAndSignInUser = (values, dispatch) => {
        return this.props.signInUser(values)
    };

    render() {
        const { asyncValidating, handleSubmit, submitting } = this.props;
        return (
            <div className="container">
                       <Form
           validate={validate}
           initialValues={{ username:'info@nicolabortignon.com',password:'1234' }}
            onSubmit={this.validateAndSignInUser}
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

export default withRouter(SignInForm)