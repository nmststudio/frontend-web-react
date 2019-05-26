//Create new studio
export const CREATE_STUDIO = 'CREATE_STUDIO';
export const CREATE_STUDIO_SUCCESS = 'CREATE_STUDIO_SUCCESS';
export const CREATE_STUDIO_FAILURE = 'CREATE_STUDIO_FAILURE';

export const FETCH_STUDIOS = 'FETCH_STUDIOS';
export const FETCH_STUDIOS_SUCCESS = 'FETCH_STUDIOS_SUCCESS';
export const FETCH_STUDIOS_FAILURE = 'FETCH_STUDIOS_FAILURE';

export const FETCH_STUDIO = 'FETCH_STUDIO';
export const FETCH_STUDIO_SUCCESS = 'FETCH_STUDIO_SUCCESS';
export const FETCH_STUDIO_FAILURE = 'FETCH_STUDIO_FAILURE';

export const EDIT_STUDIO = 'EDIT_STUDIO';
export const EDIT_STUDIO_SUCCESS = 'EDIT_STUDIO_SUCCESS';
export const EDIT_STUDIO_FAILURE = 'EDIT_STUDIO_FAILURE';







const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost' : '/api';
// Fetch all Studios of a user

export function fetchStudios(tokenFromStorage) {
    const request = fetch(ROOT_URL + '/studios', {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromStorage}`
        }
    })
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


// Fetch specific studio

export function fetchStudio(id) {
    const request = fetch(ROOT_URL + '/studio/' + id)
    return {
        type: FETCH_STUDIO,
        payload: request
    };
}

export function fetchStudioSuccess(studios) {
    return {
        type: FETCH_STUDIO_SUCCESS,
        payload: studios
    };
}

export function fetchStudioFailure(error) {
    return {
        type: FETCH_STUDIO_FAILURE,
        payload: error
    };
}

// POST NEW STUDIO

export function createStudio(props, tokenFromStorage) {

    const request = fetch(`${ROOT_URL}/studio`, {
        method: 'POST',
        body: JSON.stringify(props),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromStorage}`
        }
    });
    console.log('Create studio')
    return {
        type: CREATE_STUDIO,
        payload: request
    };
}

export function createStudioSuccess(newStudio) {
    console.log('Studio created successfully', newStudio)
    return {
        type: CREATE_STUDIO_SUCCESS,
        payload: newStudio
    };
}

export function createStudioFailure(error) {
    console.log('Error creating studio', error)
    return {
        type: CREATE_STUDIO_FAILURE,
        payload: error
    };
}


// PUT EXISTING STUDIO 

export function editStudio(newStudio, tokenFromStorage) {

    const request = fetch(`${ROOT_URL}/studio`, {
        method: 'PUT',
        body: JSON.stringify(newStudio),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromStorage}`
        }
    });
    console.log('Create studio')
    return {
        type: EDIT_STUDIO,
        payload: request
    };
}

export function editStudioSuccess(newStudio) {
    console.log('Studio created successfully', newStudio)
    return {
        type: EDIT_STUDIO_SUCCESS,
        payload: newStudio
    };
}

export function editStudioFailure(error) {
    console.log('Error creating studio', error)
    return {
        type: EDIT_STUDIO_FAILURE,
        payload: error
    };
}