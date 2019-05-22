//Create new studio
export const CREATE_CLASS = 'CREATE_CLASS';
export const CREATE_CLASS_SUCCESS = 'CREATE_CLASS_SUCCESS';
export const CREATE_CLASS_FAILURE = 'CREATE_CLASS_FAILURE';



const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost' : '/api';

export function createClass(props, tokenFromStorage) {

    const request = fetch(`${ROOT_URL}/class`, {
        method: 'POST',
        body: JSON.stringify(props),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromStorage}`
        }
    });
    console.log('Create Class')
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