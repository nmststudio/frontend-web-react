import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    withRouter
} from 'react-router-dom'
import { Link } from 'react-router-dom';
import { Form, Field } from 'react-final-form'

//Client side validation
function validate(values) {
    const errors = {};

    if (!values.name || values.name.trim() === '') {
        errors.name = 'Enter a Title';
    }
    return errors;
}



class Studio extends Component {
    static contextTypes = {
        router: PropTypes.object
    };
    constructor(props) {
        super(props);
        console.log(props);


        // Initialize the main object and the edited object

        var studio = { name: '' }
        this.state = { currentStudio: studio, editedStudio: studio };

        // Bind all the form controllers 
        this.props.fetchStudio(this.props.id);




    }



    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState({
            ...this.state,
            currentStudio: nextProps.currentStudio,
        });
    }


    render() {
        console.log('STATE', this.state)
        const { handleSubmit, submitting, currentStudio } = this.props;
        return (<div>
            <h2>{ this.state.currentStudio.name }</h2> 
            <br />
            <Link to={"/admin/studio/edit/"+this.state.currentStudio.id}>
                  Edit { this.state.currentStudio.name }
                </Link>
            </div>)
    }
}


export default Studio