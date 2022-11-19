import { Actions } from "../const";
import { getAuthThunkCreator } from "./auth-reducer";

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };

    default:
      return state;
  }
};

export const initializedSuccess = () => ({ type: Actions.INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthThunkCreator());
  promise.then(() => {
    dispatch(initializedSuccess());
  })
};

export default appReducer;
