import React, { Component } from 'react';
import StudioCreationContainer from '../containers/StudioCreationContainer.js';
import HeaderContainer from '../containers/HeaderContainer.js';
import ClassForm from '../components/ClassForm.js';


class StudioCreation extends Component {
    render() {
        console.log('page loaded studio')
        return (
            <div> 
                    <HeaderContainer type="posts_new"/>
        <StudioCreationContainer />
        <hr />
        <ClassForm />
      </div>
        );
    }
}


export default StudioCreation;