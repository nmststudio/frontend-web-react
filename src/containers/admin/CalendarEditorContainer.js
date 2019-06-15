import Calendar from '../../components/calendar/Calendar.js';
import {
    createClass,
    createClassSuccess,
    createClassFailure,
    fetchClasses,
    fetchClassesSuccess,
    fetchClassesFailure,
    editClass,
    editClassSuccess,
    editClassFailure
} from '../../actions/classes';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
    return {
        createClass: (event, studioId) => {
            const jwtToken = localStorage.getItem('jwtToken')
            dispatch(createClass(event, studioId, jwtToken)).then(response => {
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

        },
        editClass: (event) => {
            const jwtToken = localStorage.getItem('jwtToken')
            dispatch(editClass(event, jwtToken)).then(response => {
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

        },
        fetchClasses: (studioId) => {
            console.log('FETCH CLASSES ----')
            const jwtToken = localStorage.getItem('jwtToken')
            dispatch(fetchClasses(studioId, jwtToken)).then(response => {
                if (!response.payload.ok) {
                    throw Error(response.payload.statusText);
                }

                return response.payload.json();
            }).then(result => {
                console.log(result)
                // Note: Error's "data" is in result.payload.response.data (inside "response")
                // success's "data" is in result.payload.data
                //console.log(result)
                dispatch(fetchClassesSuccess(result));
            }).catch((err) => {
                dispatch(fetchClassesFailure(err))
            });
        }

    }
}


function mapStateToProps(state, ownProps) {

    if (!ownProps.studioId) return {};
    return {
        studioId: ownProps.studioId,
        classes: state.classes.classList
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);