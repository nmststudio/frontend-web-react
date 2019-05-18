import React from 'react';
import { Component } from 'react';

export default class App extends Component {
    componentWillMount() {
        console.log('LOAD USER FROM TOKEN')
        this.props.loadUserFromToken();
    }

    render() {
        return (
            <div>
            {this.props.children}
          </div>
        );
    }
}