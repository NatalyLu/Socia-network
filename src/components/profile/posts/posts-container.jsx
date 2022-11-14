import Posts from "./posts";
import { addPost, updateNewPost } from "../../../redux/profile-reducer";
import { connect } from "react-redux";

// конектим Posts к стору
// connect передаст в функцию state из стора, т.е. store.getState();
let mapStateToProps = (state) => {
  return {
    posts: state.profile.posts,
    newPostText: state.profile.newPostText
  }
};

// а тут колбэки, т.е. connect закинет сюда dispatch
let mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostText: (text) => {
      dispatch(updateNewPost(text));
    },
    addPost: () => {
      dispatch(addPost());
    }
  }
};

const PostsContainer = connect(mapStateToProps, mapDispatchToProps)(Posts);

export default PostsContainer;