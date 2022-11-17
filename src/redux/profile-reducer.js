import { Actions } from "../const";
import { usersAPI, profileAPI } from "../api/api";

const pushPost = (state, post) => {
  let newPost = {
    id: state.posts.length + 1,
    text: post,
    likes: 2,
  };
  return {
    ...state,
    posts: [...state.posts, newPost],
  };
};

const initialState = {
  posts: [
    { id: 1, text: "Post1", likes: 12 },
    { id: 2, text: "Post2", likes: 24 },
    { id: 3, text: "Post3", likes: 4 },
    { id: 4, text: "Post4", likes: 6 },
  ],
  profile: null,
  isFetchingProfile: false,
  status: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.ADD_POST:
      return pushPost(state, action.post);
    case Actions.SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case Actions.TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetchingProfile: action.value,
      };
    case Actions.SET_STATUS:
      return { ...state, status: action.status };
    default:
      return state;
  }
};

export const toggleIsFetching = (value) => ({type: Actions.TOGGLE_IS_FETCHING, value});
export const addPost = (post) => ({ type: Actions.ADD_POST, post });
export const setUserProfile = (profile) => ({type: Actions.SET_USER_PROFILE, profile,});
export const setStatus = (status) => ({type: Actions.SET_STATUS, status,});

export const getProfileThunkCreator = (id) => (dispatch) => {
  dispatch(toggleIsFetching(true));
  usersAPI.getProfile(id).then((response) => {
    dispatch(setUserProfile(response.data));
    dispatch(toggleIsFetching(false));
  });
};

export const getStatus = (id) => (dispatch) => {
  profileAPI.getStatus(id).then((response) => {
    dispatch(setStatus(response.data));
  });
};

export const updateStatus = (status) => (dispatch) => {
  profileAPI.updateStatus(status).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
};


export default profileReducer;
