import { Actions } from "../const";

const pushPost = (state) => {
  let newPost = {
    id: state.posts.length + 1,
    text: state.newPostText,
    likes: 2,
  };
  return {
    ...state,
    posts: [...state.posts, newPost],
    newPostText: "",
  };
};

const updateNewPostText = (state, text) => {
  return {
    ...state,
    newPostText: text,
  };
};

const initialState = {
  posts: [
    { id: 1, text: "Post1", likes: 12 },
    { id: 2, text: "Post2", likes: 24 },
    { id: 3, text: "Post3", likes: 4 },
    { id: 4, text: "Post4", likes: 6 },
  ],
  newPostText: "It",
  profile: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_POST:
      return pushPost(state);
    case Actions.UPDATE_NEW_POST_TEXT:
      return updateNewPostText(state, action.text);
    case Actions.SET_USER_PROFILE:
      return {...state, profile: action.profile};
    default:
      return state;
  }
};

export const addPost = () => ({ type: Actions.ADD_POST });
export const updateNewPost = (data) => ({type: Actions.UPDATE_NEW_POST_TEXT, text: data,});
export const setUserProfile = (profile) => ({type: Actions.SET_USER_PROFILE, profile,});


export default profileReducer;