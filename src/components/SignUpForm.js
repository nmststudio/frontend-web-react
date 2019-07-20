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


const EMAIL_STEP = 'EMAIL_STEP';
const VANITY_URL_STEP = 'VANITY_URL_STEP';
const STUDIO_CREATED = 'STUDIO_CREATED';

class SignUpForm extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback
        this.validateAndSignUpUser = this.validateAndSignUpUser.bind(this);
        this.handleStudioNameChange = this.handleStudioNameChange.bind(this);
        this.submitStudioNameHandler = this.submitStudioNameHandler.bind(this);
        this.state = { current_step: EMAIL_STEP, studioName: 'Studio Name' }
    }

    componentWillMount() {
        //Important! If your component is navigating based on some global state(from say componentWillReceiveProps)
        //always reset that global state back to null when you REMOUNT
        this.props.resetMe();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error) {

            // this.props.history.push('/')
            this.setState({
                current_step: VANITY_URL_STEP
            })
        }
        console.log(nextProps, nextProps.studio)

        if (nextProps.studio && nextProps.studio.length > 0) {
            console.log('REceived')
            this.setState({
                current_step: STUDIO_CREATED
            })
            this.props.history.push('/admin/studio/' + nextProps.studio[0].id)
        }
    }

    validateAndSignUpUser(values, dispatch) {
        return this.props.signUpUser(values)
    };

    // STUDIO NAME


    handleStudioNameChange(event) {
        this.setState({
            ...this.state,
            studioName: event.target.value
        })
    };

    submitStudioNameHandler(event) {
        console.log('button clicked', this.state.studioName)
        this.props.submitStudioName(this.state.studioName)

    }

    render() {
        const { asyncValidating, handleSubmit, submitting, asyncValidate, validate, dispatch } = this.props;
        return (
            <section id="notable-ai" className="benefit product-benefit-1">
          <div className="row row-1 odd">
          <div className="col-md order-md-last justify-content-start">
          { this.state.current_step == EMAIL_STEP && 
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
                      Next
                    </button>
                  </div>
                  <pre>{JSON.stringify(values, 0, 2)}</pre>
                </form>
              )}
            />
          }
          { this.state.current_step === VANITY_URL_STEP && 
            <div>
              <label> Studio Name </label>
              <br />
              <input type="text" value={this.state.studioName || ''} onChange={this.handleStudioNameChange} /> 
              <button className="btn btn-primary" type="submit" onClick={this.submitStudioNameHandler} >
                Finish
              </button>
            </div>       
          }
          </div>
          

          <div className="col-md order-md-first justify-content-start">
            <div className="text-wrapper">
              <h2>It only takes 1 minute</h2>
              <p>{JSON.stringify(this.state)}</p> 
               <p>{JSON.stringify(this.props)}</p> 
            </div>
          </div>
        </div>
      </section>
        )
    }
}

export default withRouter(SignUpForm)