import StudioForm from '../components/StudioForm.js';
import {
    fetchStudios,
    fetchStudiosSuccess,
    fetchStudiosFailure,
    createStudio,
    createStudioSuccess,
    createStudioFailure
} from '../actions/studios';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
    return {
        fetchStudios: () => {
            dispatch(fetchStudios()).then(response => {
                if (!response.payload.ok) {
                    throw Error(response.payload.statusText);
                }
                return response.payload.json();
            }).then(result => {
                dispatch(fetchStudiosSuccess(result));
            }).catch((err) => dispatch(fetchStudiosFailure(err)));
        },
        createStudio: (values) => {
            dispatch(createStudio(values)).then(response => {
                console.log('response', response.payload.ok)
                if (!response.payload.ok) {

                    throw Error(response.payload.statusText);
                }
                return response.payload.json();
            }).then(result => {
                console.log('payload', result)
                // Note: Error's "data" is in result.payload.response.data (inside "response")
                // success's "data" is in result.payload.data

                dispatch(createStudioSuccess(result));
                console.log('Studio created succesffully Sign up')
            }).catch((err) => dispatch(createStudioFailure(err)));
        }
    }
}


function mapStateToProps(state, ownProps) {
    console.log('MAPPING STATE TO PROPS', state.studios.studioList.studios)
    return {
        studios: state.studios.studioList.studios
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudioForm);