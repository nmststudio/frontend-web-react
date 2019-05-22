import {
    CREATE_CLASS,
    CREATE_CLASS_SUCCESS,
    CREATE_CLASS_FAILURE,
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

        default:
            return state;
    }
}