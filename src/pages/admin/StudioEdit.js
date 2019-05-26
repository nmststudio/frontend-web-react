import React, { Component } from 'react';
import HeaderContainer from '../../containers/HeaderContainer.js';


import StudioEditContainer from '../../containers/admin/StudioEditContainer.js';

class StudioEdit extends Component {
    componentWillUnmount() {
        console.log('Component will mount', this.props.match.params.id)
    }

    componentDidMount() {
        console.log('POST ID', this.props.match.params.id)
    }


    render() {

            console.log('props', this.props.match.params.id)
            return (<div>
            <HeaderContainer /> <
            section className = "main" >
            <div className="container" >
                        <StudioEditContainer id={this.props.match.params.id} />
                    </div> <
            /section> <
            /div>
        );
    }
}


export default StudioEdit;