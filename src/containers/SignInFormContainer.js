import SignInForm from '../components/SignInForm.js';
import { connect } from 'react-redux';
import { signInUser, signInUserSuccess, signInUserFailure } from '../actions/users';

const mapDispatchToProps = (dispatch) => {
    return {
        signInUser: (values) => {
            dispatch(signInUser(values)).then(response => {
                console.log('response', response)
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
                dispatch(signInUserSuccess(result));
                console.log('Dispatch Sign up')
            }).catch((err) => dispatch(signInUserFailure(err)));
        },
        resetMe: () => {
            //sign up is not reused, so we dont need to resetUserFields
            //in our case, it will remove authenticated users
        }
    }
}

function mapStateToProps(state, ownProps) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInForm);