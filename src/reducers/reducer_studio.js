import {
    CREATE_STUDIO,
    CREATE_STUDIO_SUCCESS,
    CREATE_STUDIO_FAILURE,
    FETCH_STUDIOS,
    FETCH_STUDIOS_SUCCESS,
    FETCH_STUDIOS_FAILURE,
    FETCH_STUDIO,
    FETCH_STUDIO_SUCCESS,
    FETCH_STUDIO_FAILURE,
    EDIT_STUDIO,
    EDIT_STUDIO_SUCCESS,
    EDIT_STUDIO_FAILURE
} from '../actions/studios';


const INITIAL_STATE = {
    studioList: { studios: [], error: null, loading: false },
    currentStudio: { studio: {}, error: null, loading: false }
};

export default function(state = INITIAL_STATE, action) {
    let error;
    switch (action.type) {

        case CREATE_STUDIO: // start fetching posts and set loading = true
            return { ...state, studioList: { studios: state.studioList.studios, error: null, loading: true } };
        case CREATE_STUDIO_SUCCESS: // return list of posts and make loading = false
            return { ...state,
                studioList: { studios: state.studioList.studios.concat([action.payload]), error: null, loading: false }
            };
        case CREATE_STUDIO_FAILURE: // return error and make loading = false
            error = action.payload || { message: action.payload.message }; //2nd one is network or server down errors
            return { ...state, studioList: { studios: state.studioList, error: error, loading: false } };
            // FETCH STUDIOS 
        case FETCH_STUDIOS:
            return { ...state, studioList: { studios: state.studioList.studios, loading: true } }
        case FETCH_STUDIOS_SUCCESS:
            return { ...state, studioList: { studios: action.payload, error: null, loading: false } }
        case FETCH_STUDIOS_FAILURE:
            error = action.payload || { message: action.payload.message }; //2nd one is network or server down errors
            return { ...state, studioList: { studios: [], error: error, loading: false } }
            // FETCH STUDIO
        case FETCH_STUDIO:
            return { ...state, currentStudio: { studio: {}, loading: true } }
        case FETCH_STUDIO_SUCCESS:
            return { ...state, currentStudio: { studio: action.payload, error: null, loading: false } }
        case FETCH_STUDIO_FAILURE:
            error = action.payload || { message: action.payload.message }; //2nd one is network or server down errors
            return { ...state, currentStudio: { studio: {}, error: error, loading: false } }
            // FETCH STUDIO
        case EDIT_STUDIO:
            return { ...state, currentStudio: { studio: state.currentStudio.studio, error: null, loading: true } }
        case EDIT_STUDIO_SUCCESS:
            console.log('EDIT STUDIO REDUCER', action.payload)
            return { ...state, currentStudio: { studio: action.payload, error: null, loading: false } }
        case EDIT_STUDIO_FAILURE:
            error = action.payload || { message: action.payload.message }; //2nd one is network or server down errors
            return { ...state, currentStudio: { studio: {}, error: error, loading: false } }
        default:
            return state;
    }
}