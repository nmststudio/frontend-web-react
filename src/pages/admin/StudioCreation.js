import React, { Component } from 'react';
import StudioCreationContainer from '../../containers/admin/StudioCreationContainer.js';
import HeaderContainer from '../../containers/HeaderContainer.js';
import ClassCreationContainer from '../../containers/admin/ClassCreationContainer.js';

class StudioCreation extends Component {
    render() {
        console.log('page loaded studio')
        return (


            <div className="home"> 
                <HeaderContainer />
                    <div id="main" className="container">
                        <StudioCreationContainer />
                        <hr />
                        <ClassCreationContainer />
                    </div>
            </div>


        );
    }
}


export default StudioCreation;