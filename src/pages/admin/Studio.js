import React, { Component } from 'react';
import HeaderContainer from '../../containers/HeaderContainer.js';
import StudioContainer from '../../containers/admin/StudioContainer.js';

class Studio extends Component {
    componentWillUnmount() {
        console.log('Component will mount', this.props.match.params.id)
    }

    componentDidMount() {
        console.log('POST ID', this.props.match.params.id)
    }


    render() {
        return (
            <div>
                <HeaderContainer />
                <section className = "main" >
                    <div className="container" >
                        <StudioContainer id={this.props.match.params.id} />
                    </div> 
                </section> 
            </div>
        );
    }
}


export default Studio;