import React from 'react';
import { Component } from 'react';
import AppContainer from '../containers/AppContainer';
import HeaderContainer from '../containers/HeaderContainer.js';

export default class App extends Component {
    render() {
        return (

            <AppContainer>		        
		    {this.props.children}
			</AppContainer>

        );
    }
}