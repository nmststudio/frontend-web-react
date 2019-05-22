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
            const jwtToken = localStorage.getItem('jwtToken')

            dispatch(fetchStudios(jwtToken)).then(response => {
                if (!response.payload.ok) {
                    throw Error(response.payload.statusText);
                }
                return response.payload.json();
            }).then(result => {
                dispatch(fetchStudiosSuccess(result));
            }).catch((err) => dispatch(fetchStudiosFailure(err)));
        },
        createStudio: (values) => {
            const jwtToken = localStorage.getItem('jwtToken')
            console.log(jwtToken)
            dispatch(createStudio(values, jwtToken)).then(response => {
                if (!response.payload.ok) {
                    throw Error(response.payload.statusText);
                }
                return response.payload.json();
            }).then(result => {
                // Note: Error's "data" is in result.payload.response.data (inside "response")
                // success's "data" is in result.payload.data
                //console.log(result)
                dispatch(createStudioSuccess(result));
            }).catch((err) => {
                dispatch(createStudioFailure(err))
            });

        }
    }
}


function mapStateToProps(state, ownProps) {
    return {
        studios: state.studios.studioList.studios
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudioForm);