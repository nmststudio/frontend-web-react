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



// //For instant async server validation
const asyncValidate = (values, dispatch) => {

    return dispatch(validateUserFields(values))
        .then((result) => {
            //Note: Error's "data" is in result.payload.response.data
            // success's "data" is in result.payload.data
            if (!result.payload.response) { //1st onblur
                return;
            }

            let { data, status } = result.payload.response;

            //if status is not 200 or any one of the fields exist, then there is a field error
            if (status != 200 || data.username || data.email) {
                //let other components know of error by updating the redux` state
                dispatch(validateUserFieldsFailure(data));
                throw data;
            } else {
                //let other components know that everything is fine by updating the redux` state
                dispatch(validateUserFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
            }
        });
};

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
            <div className='container'>
           <Form
           validate={validate}
           initialValues={{ username:Math.floor(Math.random()*10000000)+'@g.com',password:'test' }}
            onSubmit={this.validateAndSignUpUser}
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

export default withRouter(SignUpForm)