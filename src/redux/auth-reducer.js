import { Actions } from "../const";
import { authAPI, securityAPI } from "../api/api";

const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: false,
  captchaUrl: null,
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
    case Actions.GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        captchaUrl: action.payload.url,
      };
    default:
      return state;
  }
};

export const toggleIsFetching = (value) => ({type: Actions.TOGGLE_IS_FETCHING_AUTH, value});
export const setAuthUserData = (id, email, login, isAuth) => ({ type: Actions.SET_USER_DATA, payload: {id, email, login, isAuth} });
export const setCaptchaUrlSuccess = (url) => ({ type: Actions.GET_CAPTCHA_URL_SUCCESS, payload: {url} });

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

export const loginThunkCreator = (email, password, rememberMe, captcha, setError) => async (dispatch) => {
  const response = await authAPI.login(email, password, rememberMe, captcha);

  if (response.data.resultCode === 0) {
    dispatch(getAuthThunkCreator());
    dispatch(setCaptchaUrlSuccess(null));
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrlThunkCreator());
    }
    setError("server", {
      message: response.data.messages.length > 0
        ? response.data.messages[0]
        : "Some error",
    });
  }
};

export const getCaptchaUrlThunkCreator = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    dispatch(setCaptchaUrlSuccess(response.data.url));
  };

export const logoutThunkCreator = () => async (dispatch) => {
  const response = await authAPI.logout();

  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
