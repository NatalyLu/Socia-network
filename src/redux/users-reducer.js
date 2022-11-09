import { Actions } from "../const";
import { usersAPI } from "../api/api";

const updateFollowStatus = (state, id, status) => {
  return {
    ...state,
    users: state.users.map((user) => {
      if (user.id === id) {
        return { ...user, followed: status };
      }
      return user;
    }),
  };
};

const initialState = {
  users: [],
  pageSize: 5,
  totalUsersCount: 1,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.FOLLOW:
      return updateFollowStatus(state, action.userId, true);
    case Actions.UNFOLLOW:
      return updateFollowStatus(state, action.userId, false);
    case Actions.SET_USERS:
      return {
        ...state,
        // склеиваем два массива, так юзер не , а action.users также массив, то и для него используем спред оператор
        //users: [...state.users, ...action.users],
        // перезатираем юзеров
        users: action.users,
      };
    case Actions.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage
      };
    case Actions.SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.count
      };
    case Actions.TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.value
      };
    case Actions.TOGGLE_IS_FOLLOWING_PROGRESS:
      return{
        ...state,
        followingInProgress: action.value
        ? [...state.followingInProgress, action.id]
        : state.followingInProgress.filter(id => id !== action.id)
      }
    default:
      return state;
  }
};

export const followSuccess = (userId) => ({ type: Actions.FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: Actions.UNFOLLOW, userId });
export const setUsers = (users) => ({ type: Actions.SET_USERS, users });
export const setCurrentPage = (currentPage) => ({type: Actions.SET_CURRENT_PAGE, currentPage,});
export const setTotalUsersCount = (count) => ({type: Actions.SET_TOTAL_USERS_COUNT, count});
export const toggleIsFetching = (value) => ({type: Actions.TOGGLE_IS_FETCHING, value});
export const toggleFollowingInProgress = (value, id) => ({type: Actions.TOGGLE_IS_FOLLOWING_PROGRESS, value, id});

export const getUsersThunkCreator = (currentPage, pageSize) => (dispatch) => {
  dispatch(toggleIsFetching(true));

  usersAPI
    .getUsers(currentPage, pageSize)
    .then((data) => {
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
      dispatch(toggleIsFetching(false));
    });
};

export const unfollowThunkCreator = (id) => (dispatch) => {
  dispatch(toggleFollowingInProgress(true, id));

  usersAPI
    .deleteFollow(id).then((data) => {
      // если resultCode = 0 => всё ок
      if (data.resultCode === 0) {
        dispatch(unfollowSuccess(id));
      }
      dispatch(toggleFollowingInProgress(false, id));
    }); 
};

export const followThunkCreator = (id) => (dispatch) => {
  dispatch(toggleFollowingInProgress(true, id));

  usersAPI.createFollow(id).then((data) => {
    // если resultCode = 0 => всё ок
    if (data.resultCode === 0) {
      dispatch(followSuccess(id));
    }
    dispatch(toggleFollowingInProgress(false, id));
  });
};



export default usersReducer;
