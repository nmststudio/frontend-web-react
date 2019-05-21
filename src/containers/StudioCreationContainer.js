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
            dispatch(fetchStudios());
        }
    }
}


function mapStateToProps(state, ownProps) {
    console.log(state.studios)
    return {
        studios: state.studios.studioList.studios
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(StudioForm);