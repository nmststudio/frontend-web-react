import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withRouter
} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form'
import { validateUserFields, validateUserFieldsSuccess, validateUserFieldsFailure, resetValidateUserFields } from '../actions/validateUserFields';
import { signUpUserSuccess, signUpUserFailure, } from '../actions/users';

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


class SignUpForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.validateAndSignUpUser = this.validateAndSignUpUser.bind(this);
    }

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
    }

    validateAndSignUpUser(values, dispatch) {
        return this.props.signUpUser(values)
    };

    render() {
        const { asyncValidating, handleSubmit, submitting, asyncValidate, validate, dispatch } = this.props;
        return (
            <section id="notable-ai" className="benefit product-benefit-1">
          <div className="row row-1 odd">
          <div className="col-md order-md-last justify-content-start">
           <Form
           validate={validate}
           initialValues={{ username:Math.floor(Math.random()*10000000)+'@g.com',password:'test' }}
            onSubmit={this.validateAndSignUpUser}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit = { handleSubmit }>
                <div>
                  <label>Email:</label>
                  <Field
                    name="username"
                    component="input"
                    type="text"
                    placeholder="email"
                  />
                </div> 
                <div>
                  <label>Password:</label>
                  <Field
                    name="password"
                    component="input"
                    type="password"
                    placeholder="Password"
                  />
                </div>
               
                <div className="buttons">

              

                  <button className="btn btn-primary" type="submit" disabled={submitting}>
                    Submit
                  </button>
                
                </div>
                <pre>{JSON.stringify(values, 0, 2)}</pre>
              </form>
            )}
          /></div>
          <div className="col-md order-md-first justify-content-start">
            <div className="text-wrapper">
              <h2>It takes only 1 minute</h2>
              <p>Copy to Signup</p>
            </div>
          </div>
        </div>
      </section>
        )
    }
}

export default withRouter(SignUpForm)