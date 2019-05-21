import React, { Component } from 'react';
import StudioCreationContainer from '../containers/StudioCreationContainer.js';
import HeaderContainer from '../containers/HeaderContainer.js';

class StudioCreation extends Component {
    render() {
        console.log('page loaded studio')
        return (
            <div>
            	<span> TEST </span>
                    <HeaderContainer type="posts_new"/>

        <StudioCreationContainer />
      </div>
        );
    }
}


export default StudioCreation;