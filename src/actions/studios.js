//Create new studio
export const CREATE_STUDIO = 'CREATE_STUDIO';
export const CREATE_STUDIO_SUCCESS = 'CREATE_STUDIO_SUCCESS';
export const CREATE_STUDIO_FAILURE = 'CREATE_STUDIO_FAILURE';

export const FETCH_STUDIOS = 'FETCH_STUDIOS';
export const FETCH_STUDIOS_SUCCESS = 'FETCH_STUDIOS_SUCCESS';
export const FETCH_STUDIOS_FAILURE = 'FETCH_STUDIOS_FAILURE';





const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost' : '/api';
export function fetchStudios() {
    const request = fetch(ROOT_URL + '/studios')
    return {
        type: FETCH_STUDIOS,
        payload: request
    };
}

export function fetchStudiosSuccess(studios) {
    return {
        type: FETCH_STUDIOS_SUCCESS,
        payload: studios
    };
}

export function fetchStudiosFailure(error) {
    return {
        type: FETCH_STUDIOS_FAILURE,
        payload: error
    };
}

export function createStudio(props, tokenFromStorage) {

    const request = fetch(`${ROOT_URL}/studio`, {
        method: 'POST',
        body: JSON.stringify(props),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromStorage}`
        }
    });

    return {
        type: CREATE_STUDIO,
        payload: request
    };
}

export function createStudioSuccess(newStudio) {
    return {
        type: CREATE_STUDIO_SUCCESS,
        payload: newStudio
    };
}

export function createPostFailure(error) {
    return {
        type: CREATE_STUDIO_FAILURE,
        payload: error
    };
}