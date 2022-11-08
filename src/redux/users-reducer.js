import { Actions } from "../const";

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

export const follow = (userId) => ({ type: Actions.FOLLOW, userId });
export const unfollow = (userId) => ({ type: Actions.UNFOLLOW, userId });
export const setUsers = (users) => ({ type: Actions.SET_USERS, users });
export const setCurrentPage = (currentPage) => ({type: Actions.SET_CURRENT_PAGE, currentPage,});
export const setTotalUsersCount = (count) => ({type: Actions.SET_TOTAL_USERS_COUNT, count});
export const toggleIsFetching = (value) => ({type: Actions.TOGGLE_IS_FETCHING, value});
export const toggleFollowingInProgress = (value, id) => ({type: Actions.TOGGLE_IS_FOLLOWING_PROGRESS, value, id});

export default usersReducer;
