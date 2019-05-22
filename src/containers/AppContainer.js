import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveUserFromToken, retrieveUserFromTokenSuccess, retrieveUserFromTokenFailure, resetToken } from '../actions/users';
import App from '../components/App.js';

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserFromToken: () => {

            const token = localStorage.getItem('jwtToken');
            if (!token || token === '' || token === 'undefined' || token === undefined) { //if there is no token, dont bother
                return;
            }

            //fetch user from token (if server deems it's valid token)
            dispatch(retrieveUserFromToken(token))
                .then((response) => {

                    if (false) {
                        localStorage.removeItem('jwtToken'); //remove token from storage
                        dispatch(retrieveUserFromTokenFailure(response.payload));
                    }
                    var jsonReturn = response.payload.json()
                    return jsonReturn
                }).then((user) => {
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