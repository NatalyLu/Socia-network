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
        ...action.data,
        isAuth: true,
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
export const setAuthUserData = (id, email, login) => ({ type: Actions.SET_USER_DATA, data: {id, email, login} });

export const getAuthThunkCreator = () => (dispatch) => {
  dispatch(toggleIsFetching(true));
  authAPI.getAuth().then((data) => {
    if (data.resultCode === 0) {
      let { login, id, email } = data.data;
      dispatch(setAuthUserData(id, email, login)); //не забываем про последовательность параметров для setAuthUserData
    }
    dispatch(toggleIsFetching(false));
  });
};

export default authReducer;
