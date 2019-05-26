import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import SignInFormContainer from '../containers/SignInFormContainer.js';

class PostsNew extends Component {
    render() {
        return (
            <div> 
                <HeaderContainer />
                <section className="main">
                    <div className="container" >
                        <SignInFormContainer />
                    </div>
                </section>
            </div>
        );
    }
}


export default PostsNew;