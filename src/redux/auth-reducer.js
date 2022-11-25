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
    case Actions.TOGGLE_IS_FETCHING_AUTH:
      return {
        ...state,
        isFetching: action.value,
      };

    default:
      return state;
  }
};

export const toggleIsFetching = (value) => ({type: Actions.TOGGLE_IS_FETCHING_AUTH, value});
export const setAuthUserData = (id, email, login, isAuth) => ({ type: Actions.SET_USER_DATA, payload: {id, email, login, isAuth} });

// getAuthThunkCreator вернет промис
export const getAuthThunkCreator = () => async (dispatch) => {
  dispatch(toggleIsFetching(true));
  const response = await authAPI.getAuth();

  if (response.data.resultCode === 0) {
    let { login, id, email } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true)); //не забываем про последовательность параметров для setAuthUserData
  }
  dispatch(toggleIsFetching(false));
};

export const loginThunkCreator = (email, password, rememberMe, setError) => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe);

  if (response.data.resultCode === 0) {
    dispatch(getAuthThunkCreator());
  } else {
    setError("server", {
      message: response.data.messages.length > 0
        ? response.data.messages[0]
        : "Some error",
    });
  }
};

export const logoutThunkCreator = () => async (dispatch) => {
  const response = await authAPI.logout();

  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
