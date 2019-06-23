//Fetch Trainers 

import {
    FETCH_TRAINERS,
    FETCH_TRAINERS_SUCCESS,
    FETCH_TRAINERS_FAILURE,
    CREATE_TRAINER,
    CREATE_TRAINER_SUCCESS,
    CREATE_TRAINER_FAILURE,
    EDIT_TRAINER,
    EDIT_TRAINER_SUCCESS,
    EDIT_TRAINER_FAILURE
} from '../actions/trainers';

const INITIAL_STATE = {
    trainers: [],
    error: null,
    loading: false,
};

export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {
        case EDIT_TRAINER:
            return { ...state, error: null, loading: true };
        case EDIT_TRAINER_SUCCESS:
            //Find and replace existing Trainer:
            console.log('TRYING TO UPDATE--- ', action.payload)
            let idx = -1
            for (var i = 0; i < state.trainers.length; i++) {
                if (action.payload.id == state.trainers[i].id) {
                    idx = i;
                }
            }
            console.log(idx)
            let newTrainersList = state.trainers.splice(0, idx).concat([action.payload])
            console.log(idx, state.trainers.length)
            newTrainersList = newTrainersList.concat(state.trainers.splice(1, state.trainers.length))
            return { ...state, trainers: newTrainersList, error: null, loading: false };

        case EDIT_TRAINER_FAILURE:
            error = action.payload || { message: action.payload.message }; //2nd one is network or server down errors
            return { ...state, error: error, loading: false };
        case CREATE_TRAINER: // start fetching posts and set loading = true
            return { ...state, error: null, loading: true };
        case CREATE_TRAINER_SUCCESS: // return list of posts and make loading = false
            console.log('PAYLOAD', action.payload)
            return { ...state,
                trainers: state.trainers.concat([action.payload]),
                error: null,
                loading: false
            };
        case CREATE_TRAINER_FAILURE: // return error and make loading = false
            error = action.payload || { message: action.payload.message }; //2nd one is network or server down errors
            return { ...state, error: error, loading: false };
            // FETCHING CLASSES
        case FETCH_TRAINERS: // start fetching posts and set loading = true
            return { ...state, error: null, loading: true };
        case FETCH_TRAINERS_SUCCESS: // return list of posts and make loading = false
            return { ...state,
                trainers: action.payload,
                error: null,
                loading: false
            };
        case FETCH_TRAINERS_FAILURE: // return error and make loading = false
            error = action.payload || { message: action.payload.message }; //2nd one is network or server down errors
            return { ...state, error: error, loading: false };

        default:
            return state;
    }
}