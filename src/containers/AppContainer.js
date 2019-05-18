import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveUserFromToken, retrieveUserFromTokenSuccess, retrieveUserFromTokenFailure, resetToken } from '../actions/users';
import App from '../components/App.js';

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserFromToken: () => {
            console.log('trying to see if there is a local token')
            let token = localStorage.getItem('jwtToken');
            if (!token || token === '') { //if there is no token, dont bother
                console.log('no token');
                return;
            }
            console.log('there is a token');
            //fetch user from token (if server deems it's valid token)
            dispatch(retrieveUserFromToken(token))
                .then((response) => {
                    console.log('response')

                    if (false) {
                        localStorage.removeItem('jwtToken'); //remove token from storage
                        dispatch(retrieveUserFromTokenFailure(response.payload));
                    }
                    return response.payload.json()
                }).then((user) => {
                    console.log(user);
                    //localStorage.setItem('jwtToken', response.payload.data.token);
                    dispatch(retrieveUserFromTokenSuccess(user))
                });
        },
        resetMe: () => {
            localStorage.removeItem('jwtToken'); //remove token from storage
            dispatch(resetToken());
        }
    }
}


export default connect(null, mapDispatchToProps)(App);