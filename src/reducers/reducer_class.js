import {
    CREATE_CLASS,
    CREATE_CLASS_SUCCESS,
    CREATE_CLASS_FAILURE,
    FETCH_CLASSES,
    FETCH_CLASSES_SUCCESS,
    FETCH_CLASSES_FAILURE,
    EDIT_CLASS,
    EDIT_CLASS_SUCCESS,
    EDIT_CLASS_FAILURE
} from '../actions/classes';

const INITIAL_STATE = {
    classList: [],
    error: null,
    loading: false,
};

export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {

        case CREATE_CLASS: // start fetching posts and set loading = true
            return { ...state, error: null, loading: true };
        case CREATE_CLASS_SUCCESS: // return list of posts and make loading = false
            return { ...state,
                classList: state.classList.concat([action.payload]),
                error: null,
                loading: false
            };
        case CREATE_CLASS_FAILURE: // return error and make loading = false
            error = action.payload || { message: action.payload.message }; //2nd one is network or server down errors
            return { ...state, error: error, loading: false };
            // FETCHING CLASSES
        case FETCH_CLASSES: // start fetching posts and set loading = true
            return { ...state, error: null, loading: true };
        case FETCH_CLASSES_SUCCESS: // return list of posts and make loading = false
            return { ...state,
                classList: action.payload,
                error: null,
                loading: false
            };
        case FETCH_CLASSES_FAILURE: // return error and make loading = false
            error = action.payload || { message: action.payload.message }; //2nd one is network or server down errors
            return { ...state, error: error, loading: false };



        case EDIT_CLASS:
            return { ...state, error: null, loading: true };
        case EDIT_CLASS_SUCCESS:
            //Find and replace existing Trainer:
            console.log('TRYING TO UPDATE--- ', action.payload)
            let idx = -1
            for (var i = 0; i < state.classList.length; i++) {
                if (action.payload.id == state.classList[i].id) {
                    idx = i;
                }
            }

            let newClassList = state.classList.splice(0, idx).concat([action.payload])

            newClassList = newClassList.concat(state.classList.splice(1, state.classList.length))
            console.log('---NEW CLASS LIST- ', newClassList)
            return { ...state, classList: newClassList, error: null, loading: false };

        case EDIT_CLASS_FAILURE:
            error = action.payload || { message: action.payload.message, loading: false };



        default:
            return state;
    }
}