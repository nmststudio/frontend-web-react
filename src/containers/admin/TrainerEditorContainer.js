import TrainerEditor from '../../components/trainer/TrainerEditor.js';
import {
    createTrainer,
    createTrainerSuccess,
    createTrainerFailure,
    fetchTrainers,
    fetchTrainersSuccess,
    fetchTrainersFailure,
    editTrainer,
    editTrainerSuccess,
    editTrainerFailure
} from '../../actions/trainers';
import { connect } from 'react-redux';





const mapDispatchToProps = (dispatch) => {
    return {
        createTrainer: (trainer, studioId) => {
            console.log(trainer)
            const jwtToken = localStorage.getItem('jwtToken')
            dispatch(createTrainer(trainer, studioId, jwtToken)).then(response => {
                if (!response.payload.ok) {
                    throw Error(response.payload.statusText);
                }
                return response.payload.json();
            }).then(result => {
                // Note: Error's "data" is in result.payload.response.data (inside "response")
                // success's "data" is in result.payload.data
                //console.log(result)
                dispatch(createTrainerSuccess(result));
            }).catch((err) => {
                dispatch(createTrainerFailure(err))
            });

        },
        editTrainer: (event) => {
            const jwtToken = localStorage.getItem('jwtToken')
            dispatch(editTrainer(event, jwtToken)).then(response => {
                if (!response.payload.ok) {
                    throw Error(response.payload.statusText);
                }
                return response.payload.json();
            }).then(result => {
                // Note: Error's "data" is in result.payload.response.data (inside "response")
                // success's "data" is in result.payload.data
                console.log(result)
                dispatch(editTrainerSuccess(result));
            }).catch((err) => {
                dispatch(editTrainerFailure(err))
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

    if (!ownProps.studioId) return {};
    console.log('TRAINERS', state.trainers)
    return {
        studioId: ownProps.studioId,
        trainers: state.trainers.trainers
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainerEditor);