//Fetch Trainers 
export const FETCH_TRAINERS = 'FETCH_TRAINERS'
export const FETCH_TRAINERS_SUCCESS = 'FETCH_TRAINERS_SUCCESS'
export const FETCH_TRAINERS_FAILURE = 'FETCH_TRAINERS_FAILURE'
//Create new Train
export const CREATE_TRAINER = 'CREATE_TRAINER';
export const CREATE_TRAINER_SUCCESS = 'CREATE_TRAINER_SUCCESS';
export const CREATE_TRAINER_FAILURE = 'CREATE_TRAINER_FAILURE';

export const EDIT_TRAINER = 'EDIT_TRAINER';
export const EDIT_TRAINER_SUCCESS = 'EDIT_TRAINER_SUCCESS';
export const EDIT_TRAINER_FAILURE = 'EDIT_TRAINER_FAILURE';


const ROOT_URL = location.href.indexOf('localhost') > 0 ? 'http://localhost' : '/api';


export function fetchTrainers(studioId, jwtToken) {
    const request = fetch(`${ROOT_URL}/studio/${studioId}/trainer`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`
        }
    });
    return {
        type: FETCH_TRAINERS,
        payload: request
    };
}

export function fetchTrainersSuccess(trainers) {
    return {
        type: FETCH_TRAINERS_SUCCESS,
        payload: trainers
    };
}

export function fetchTrainersFailure(error) {
    return {
        type: FETCH_TRAINERS_FAILURE,
        payload: error
    };
}


export function editTrainer(editedTrainer, tokenFromStorage) {
    const request = fetch(`${ROOT_URL}/trainer/${editedTrainer.id}`, {
        method: 'PUT',
        body: JSON.stringify(editedTrainer),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromStorage}`
        }
    });
    return {
        type: EDIT_TRAINER,
        payload: request
    };
}
export function editTrainerSuccess(newTrainer) {
    return {
        type: EDIT_TRAINER_SUCCESS,
        payload: newTrainer
    };
}

export function editTrainerFailure(error) {
    return {
        type: EDIT_TRAINER_FAILURE,
        payload: error
    };
}


export function createTrainer(trainer, studioId, tokenFromStorage) {
    const request = fetch(`${ROOT_URL}/trainer`, {
        method: 'POST',
        body: JSON.stringify({
            trainer: trainer,
            studioId: studioId
        }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenFromStorage}`
        }
    });
    return {
        type: CREATE_TRAINER,
        payload: request
    };
}

export function createTrainerSuccess(newTrainer) {
    return {
        type: CREATE_TRAINER_SUCCESS,
        payload: newTrainer
    };
}

export function createTrainerFailure(error) {
    console.log('Error creating Trainer', error)
    return {
        type: CREATE_TRAINER_FAILURE,
        payload: error
    };
}