import Studio from '../../components/Studio.js';
import {
    fetchStudio,
    fetchStudioSuccess,
    fetchStudioFailure,
} from '../../actions/studios';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
    return {
        fetchStudio: (id) => {
            dispatch(fetchStudio(id)).then(response => {
                if (!response.payload.ok) {
                    throw Error(response.payload.statusText);
                }
                return response.payload.json();
            }).then(result => {
                dispatch(fetchStudioSuccess(result));
            }).catch((err) => dispatch(fetchStudioFailure(err)));
        },
    }
}


function mapStateToProps(state, ownProps) {
    return {
        currentStudio: state.studios.currentStudio.studio
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Studio);