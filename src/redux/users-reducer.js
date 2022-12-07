import { Actions } from "../const";
import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helper";

const updateFollowStatus = (state, id, status) => {
  return {
    ...state,
    users: updateObjectInArray(state.users, id, "id", { followed: status }),
  };
};

const initialState = {
  users: [],
  pageSize: 10,
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
        currentPage: action.page,
      };
    case Actions.SET_TOTAL_USERS_COUNT:
      return {
        ...state,
        totalUsersCount: action.count,
      };
    case Actions.TOGGLE_IS_FETCHING_USERS:
      return {
        ...state,
        isFetching: action.value,
      };
    case Actions.TOGGLE_IS_FOLLOWING_PROGRESS:
      return {
        ...state,
        followingInProgress: action.value
          ? [...state.followingInProgress, action.id]
          : state.followingInProgress.filter((id) => id !== action.id),
      };
    default:
      return state;
  }
};

const followUnfollowFlow = async (dispatch, id, apiMethod, action) => {
  dispatch(toggleFollowingInProgress(true, id));

  const response = await apiMethod(id);
  // если resultCode = 0 => всё ок
  if (response.data.resultCode === 0) {
    dispatch(action(id));
  }
  dispatch(toggleFollowingInProgress(false, id));
};

export const followSuccess = (userId) => ({ type: Actions.FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: Actions.UNFOLLOW, userId });
export const setUsers = (users) => ({ type: Actions.SET_USERS, users });
export const setCurrentPage = (page) => ({ type: Actions.SET_CURRENT_PAGE, page });
export const setTotalUsersCount = (count) => ({type: Actions.SET_TOTAL_USERS_COUNT, count});
export const toggleIsFetching = (value) => ({type: Actions.TOGGLE_IS_FETCHING_USERS, value});
export const toggleFollowingInProgress = (value, id) => ({type: Actions.TOGGLE_IS_FOLLOWING_PROGRESS, value, id});

export const getUsersThunkCreator = (page, pageSize) => async (dispatch) => {
  dispatch(toggleIsFetching(true));

  const response = await usersAPI.getUsers(page, pageSize);

  dispatch(setUsers(response.data.items));
  dispatch(setCurrentPage(page));
  dispatch(setTotalUsersCount(response.data.totalCount));
  dispatch(toggleIsFetching(false));
};

export const unfollowThunkCreator = (id) => async (dispatch) => {
  followUnfollowFlow(dispatch, id, usersAPI.deleteFollow, unfollowSuccess);
};

export const followThunkCreator = (id) => async (dispatch) => {
  followUnfollowFlow(dispatch, id, usersAPI.createFollow, followSuccess);
};

export default usersReducer;
