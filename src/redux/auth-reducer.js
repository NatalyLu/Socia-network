import { Actions } from "../const";
import { authAPI } from "../api/api";

const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case Actions.TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.value,
      };

    default:
      return state;
  }
};

export const toggleIsFetching = (value) => ({type: Actions.TOGGLE_IS_FETCHING, value});
export const setAuthUserData = (id, email, login, isAuth) => ({ type: Actions.SET_USER_DATA, payload: {id, email, login, isAuth} });

export const getAuthThunkCreator = () => (dispatch) => {
  dispatch(toggleIsFetching(true));
  authAPI.getAuth().then((response) => {
    if (response.data.resultCode === 0) {
      let { login, id, email } = response.data.data;
      dispatch(setAuthUserData(id, email, login, true)); //не забываем про последовательность параметров для setAuthUserData
    }
    dispatch(toggleIsFetching(false));
  });
};

export const loginThunkCreator = (email, password, rememberMe) => (dispatch) => {
  authAPI.login(email, password, rememberMe).then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(getAuthThunkCreator());
    }
  });
};

export const logoutThunkCreator = () => (dispatch) => {
  authAPI.logout().then((response) => {
    if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  });
};

export default authReducer;
