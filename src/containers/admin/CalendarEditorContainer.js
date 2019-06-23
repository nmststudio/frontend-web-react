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
import {
    fetchTrainers,
    fetchTrainersSuccess,
    fetchTrainersFailure,
} from '../../actions/trainers';

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
        editClass: (editedClass) => {
            const jwtToken = localStorage.getItem('jwtToken')
            dispatch(editClass(editedClass, jwtToken)).then(response => {
                if (!response.payload.ok) {
                    throw Error(response.payload.statusText);
                }
                return response.payload.json();
            }).then(result => {
                // Note: Error's "data" is in result.payload.response.data (inside "response")
                // success's "data" is in result.payload.data
                //console.log(result)
                console.log('RESULT RECEIVED FROM API')
                dispatch(editClassSuccess(result));
            }).catch((err) => {
                dispatch(editClassFailure(err))
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
        },
        fetchTrainers: (studioId) => {
            console.log('FETCH TRAINERS ----')
            const jwtToken = localStorage.getItem('jwtToken')
            dispatch(fetchTrainers(studioId, jwtToken)).then(response => {
                if (!response.payload.ok) {
                    throw Error(response.payload.statusText);
                }

                return response.payload.json();
            }).then(result => {
                console.log(result)
                // Note: Error's "data" is in result.payload.response.data (inside "response")
                // success's "data" is in result.payload.data
                //console.log(result)
                dispatch(fetchTrainersSuccess(result));
            }).catch((err) => {
                dispatch(fetchTrainersFailure(err))
            });
        }

    }
}


function mapStateToProps(state, ownProps) {
    console.log('RECEIVED NEW STATE', state)
    if (!ownProps.studioId) return {};
    return {
        studioId: ownProps.studioId,
        classes: state.classes.classList,
        isLoadingClasses: state.classes.loading,
        trainers: state.trainers.trainers
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);