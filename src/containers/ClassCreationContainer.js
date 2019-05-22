import ClassForm from '../components/ClassForm.js';
import {
    createClass,
    createClassSuccess,
    createClassFailure
} from '../actions/classes';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
    return {
        createClass: (values) => {
            const jwtToken = localStorage.getItem('jwtToken')
            console.log(jwtToken)
            dispatch(createClass(values, jwtToken)).then(response => {
                if (!response.payload.ok) {
                    throw Error(response.payload.statusText);
                }
                return response.payload.json();
            }).then(result => {
                // Note: Error's "data" is in result.payload.response.data (inside "response")
                // success's "data" is in result.payload.data
                //console.log(result)
                dispatch(createClassSuccess(result));
            }).catch((err) => {
                dispatch(createClassFailure(err))
            });

        }
    }
}


function mapStateToProps(state, ownProps) {
    return {
        classes: state.classes.classList
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClassForm);