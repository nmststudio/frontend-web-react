//Fetch Classes 
export const FETCH_CLASSES = 'FETCH_CLASSES'
export const FETCH_CLASSES_SUCCESS = 'FETCH_CLASSES_SUCCESS'
export const FETCH_CLASSES_FAILURE = 'FETCH_CLASSES_FAILURE'
//Create new Class
export const CREATE_CLASS = 'CREATE_CLASS';
export const CREATE_CLASS_SUCCESS = 'CREATE_CLASS_SUCCESS';
export const CREATE_CLASS_FAILURE = 'CREATE_CLASS_FAILURE';



const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost' : '/api';



export function fetchClasses(studioId, jwtToken) {
    const request = fetch(`${ROOT_URL}/studio/${studioId}/class`, {
        method: 'GET',
        body: JSON.stringify(props),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    });
    console.log('Fetching Classes')
    return {
        type: FETCH_CLASSES,
        payload: request
    };
}

export function fetchClassesSuccess(classes) {
    return {
        type: FETCH_CLASSES_SUCCESS,
        payload: classes
    };
}

export function fetchClassesFailure(error) {
    console.log('Error creating Class', error)
    return {
        type: FETCH_CLASSES_FAILURE,
        payload: error
    };
}


export function createClass(event, studioId, tokenFromStorage) {
    console.log('ACTION -- CREATE CLASS --------', studioId)
    const request = fetch(`${ROOT_URL}/class`, {
        method: 'POST',
        body: JSON.stringify({
            event: event,
            studioId: studioId
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromStorage}`
        }
    });
    return {
        type: CREATE_CLASS,
        payload: request
    };
}

export function createClassSuccess(newClass) {
    console.log('Class created successfully', newClass)
    return {
        type: CREATE_CLASS_SUCCESS,
        payload: newClass
    };
}

export function createClassFailure(error) {
    console.log('Error creating Class', error)
    return {
        type: CREATE_CLASS_FAILURE,
        payload: error
    };
}