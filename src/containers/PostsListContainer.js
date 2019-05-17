import { connect } from 'react-redux'
import { fetchPosts, fetchPostsSuccess, fetchPostsFailure } from '../actions/posts';
import PostsList from '../components/PostsList';


const mapStateToProps = (state) => {
    return {
        postsList: state.posts.postsList
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPosts: () => {
            dispatch(fetchPosts()).then(response => {
                    if (!response.ok) {
                        throw Error(response.payload.statusText);
                    }
                    return response;
                }).then(function(response) {

                    dispatch(fetchPostsSuccess(response.payload.data))
                })
                .catch(error => {
                    dispatch(fetchPostsFailure(error))
                });
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);