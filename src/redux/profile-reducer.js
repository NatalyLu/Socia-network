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
    // DELETE_POST using only for tests
    case Actions.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    case Actions.SET_USER_PROFILE:
      return { ...state, profile: action.profile };
    case Actions.TOGGLE_IS_FETCHING_PROFILE:
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

export const toggleIsFetching = (value) => ({type: Actions.TOGGLE_IS_FETCHING_PROFILE, value});
export const addPost = (post) => ({ type: Actions.ADD_POST, post });
export const deletePost = (postId) => ({ type: Actions.DELETE_POST, postId });
export const setUserProfile = (profile) => ({type: Actions.SET_USER_PROFILE, profile,});
export const setStatus = (status) => ({type: Actions.SET_STATUS, status,});

export const getProfileThunkCreator = (id) => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  const response = await usersAPI.getProfile(id);

  dispatch(setUserProfile(response.data));
  dispatch(toggleIsFetching(false));
};

export const getStatus = (id) => async (dispatch) => {
  const response = await profileAPI.getStatus(id);

  dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
  const response = await profileAPI.updateStatus(status);

  if (response.data.resultCode === 0) {
    dispatch(setStatus(status));
  }
};

export default profileReducer;
