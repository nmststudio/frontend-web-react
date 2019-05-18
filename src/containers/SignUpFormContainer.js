import SignUpForm from '../components/SignUpForm.js';
import { resetValidateUserFields } from '../actions/validateUserFields';
import { connect } from 'react-redux';
import { signUpUser, signUpUserSuccess, signUpUserFailure, } from '../actions/users';



const mapDispatchToProps = (dispatch) => {
    return {
        resetMe: () => {
            dispatch(resetValidateUserFields());
        },
        dispatch: (type) => {
            dispatch(type);
        },
        signUpUser: (values) => {
            dispatch(signUpUser(values)).then(response => {
                console.log('response', response.payload.ok)
                if (!response.payload.ok) {

                    throw Error(response.payload.statusText);
                }
                return response.payload.json();
            }).then(result => {
                console.log('payload', result)
                // Note: Error's "data" is in result.payload.response.data (inside "response")
                // success's "data" is in result.payload.data
                localStorage.setItem('jwtToken', result.token);
                //let other components know that everything is fine by updating the redux` state
                console.log('Dispatch Sign up')
                dispatch(signUpUserSuccess(result.id));
                console.log('Dispatch Sign up')
            }).catch((err) => dispatch(signUpUserFailure(err)));
        }
    }
}


function mapStateToProps(state, ownProps) {
    return {
        user: state.user,
        state: state,
        validateFields: state.validateFields,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);