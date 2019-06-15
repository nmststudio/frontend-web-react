import StudioEdit from '../../components/StudioEdit.js';
import {
    fetchStudios,
    fetchStudiosSuccess,
    fetchStudiosFailure,
    fetchStudio,
    fetchStudioSuccess,
    fetchStudioFailure,
    createStudio,
    createStudioSuccess,
    createStudioFailure,
    editStudio,
    editStudioSuccess,
    editStudioFailure
} from '../../actions/studios';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
    return {
        fetchStudio: (id) => {
            console.log('fatching Studio')
            dispatch(fetchStudio(id)).then(response => {
                if (!response.payload.ok) {
                    throw Error(response.payload.statusText);
                }
                return response.payload.json();
            }).then(result => {
                dispatch(fetchStudioSuccess(result));
            }).catch((err) => dispatch(fetchStudioFailure(err)));
        },
        editStudio: (studio) => {
            const jwtToken = localStorage.getItem('jwtToken')
            console.log(jwtToken)
            dispatch(editStudio(studio, jwtToken)).then(response => {
                if (!response.payload.ok) {
                    throw Error(response.payload.statusText);
                }
                return response.payload.json();
            }).then(result => {
                // Note: Error's "data" is in result.payload.response.data (inside "response")
                // success's "data" is in result.payload.data
                //console.log(result)
                dispatch(editStudioSuccess(result));
            }).catch((err) => {
                dispatch(editStudioFailure(err))
            });
        }
    }
}


function mapStateToProps(state, ownProps) {
    console.log('STUDIO CONTAINER PROPS', ownProps);
    return {
        studios: state.studios.studioList.studios,
        currentStudio: state.studios.currentStudio.studio
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudioEdit);