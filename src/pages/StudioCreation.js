import React, { Component } from 'react';
import StudioCreationContainer from '../containers/StudioCreationContainer.js';
import HeaderContainer from '../containers/HeaderContainer.js';
import ClassCreationContainer from '../containers/ClassCreationContainer.js';

class StudioCreation extends Component {
    render() {
        console.log('page loaded studio')
        return (
            <div> 
                <HeaderContainer type="posts_new"/>
                <StudioCreationContainer />
                <hr />
                <ClassCreationContainer />
            </div>
        );
    }
}


export default StudioCreation;