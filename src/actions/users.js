import axios from 'axios';

//Get current user(me) from token in localStorage
export const RETRIEVE_USER_FROM_TOKEN = 'RETRIEVE_USER_FROM_TOKEN';
export const RETRIEVE_USER_FROM_TOKEN_SUCCESS = 'RETRIEVE_USER_FROM_TOKEN_SUCCESS';
export const RETRIEVE_USER_FROM_TOKEN_FAILURE = 'RETRIEVE_USER_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';

//Sign Up User
export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';
export const RESET_USER = 'RESET_USER';

//Sign In User
export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';


//validate email, if success, then load user and login
export const VALIDATE_EMAIL = 'VALIDATE_EMAIL';
export const VALIDATE_EMAIL_SUCCESS = 'VALIDATE_EMAIL_SUCCESS';
export const VALIDATE_EMAIL_FAILURE = 'VALIDATE_EMAIL_FAILURE';

//called when email is updated in profile to update main user's email state
export const UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';


//log out user
export const LOGOUT_USER = 'LOGOUT_USER';


const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost' : '/api';

export function validateEmail(validateEmailToken) {
    //check if token from welcome email is valid, if so, update email as verified and login the user from response
    const request = axios.get(`${ROOT_URL}/validateEmail/${validateEmailToken}`);

    return {
        type: VALIDATE_EMAIL,
        payload: request
    };
}

export function validateEmailSuccess(currentUser) {
    return {
        type: VALIDATE_EMAIL_SUCCESS,
        payload: currentUser
    };
}

export function validateEmailFailure(error) {
    return {
        type: VALIDATE_EMAIL_FAILURE,
        payload: error
    };
}

export function retrieveUserFromToken(tokenFromStorage) {
    //check if the token is still valid, if so, get me from the server

    const request = fetch(`${ROOT_URL}/signin/token`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${tokenFromStorage}`
        }
    })
    return {
        type: RETRIEVE_USER_FROM_TOKEN,
        payload: request
    };
}

export function retrieveUserFromTokenSuccess(currentUser) {
    console.log('RetrieveUserFromTokenSuccess')
    return {
        type: RETRIEVE_USER_FROM_TOKEN_SUCCESS,
        payload: currentUser
    };
}

export function retrieveUserFromTokenFailure(error) {
    return {
        type: RETRIEVE_USER_FROM_TOKEN_FAILURE,
        payload: error
    };
}


export function resetToken() { //used for logout
    return {
        type: RESET_TOKEN
    };
}


export function signUpUser(formValues) {


    const request = fetch(`${ROOT_URL}/signup`, {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return {
        type: SIGNUP_USER,
        payload: request
    };
}

export function signUpUserSuccess(user) {
    console.log('received action', user)
    return {
        type: SIGNUP_USER_SUCCESS,
        payload: user
    };
}

export function signUpUserFailure(error) {
    return {
        type: SIGNUP_USER_FAILURE,
        payload: error
    };
}


export function resetUser() {
    return {
        type: RESET_USER,
    };
}

export function signInUser(formValues) {

    const request = fetch(`${ROOT_URL}/signin`, {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return {
        type: SIGNIN_USER,
        payload: request
    };
}

export function signInUserSuccess(user) {

    return {
        type: SIGNIN_USER_SUCCESS,
        payload: user
    };
}

export function signInUserFailure(error) {
    return {
        type: SIGNIN_USER_FAILURE,
        payload: error
    };
}

export function logoutUser() {
    return {
        type: LOGOUT_USER
    };
}
export function updateUserEmail(email) {
    return {
        type: UPDATE_USER_EMAIL,
        payload: email
    };
}