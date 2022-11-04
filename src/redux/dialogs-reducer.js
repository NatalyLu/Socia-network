import { Actions } from "../const";

const sendMessage = (state) => {
  let body = state.newMessageBody;
  state.newMessageBody = "";
  state.messages.push({
    id: state.messages.length + 1,
    message: body,
  });
  return (state);
};

const updateNewMessageBody = (state, message) => {
  state.newMessageBody = message;
  return (state);
};

const initialState = {
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How is your Project?" },
    { id: 3, message: "Wow" },
  ],

  users: [
    { id: 1, name: "Sveta" },
    { id: 2, name: "Ksenia" },
    { id: 3, name: "Vlad" },
    { id: 4, name: "Sasha" },
    { id: 5, name: "Masha" },
  ],

  newMessageBody: "",
};

const dialogsReducer = (state = initialState, action) => {
  let stateCopy = {
    ...state,
    messages: [...state.messages]
  };

  switch (action.type) {
    case Actions.UPDATE_NEW_MESSAGE_BODY:
      return updateNewMessageBody(stateCopy, action.body);
    case Actions.SEND_MESSAGE:
      return sendMessage(stateCopy);
    default:
      return state;
  }
};

export const sendMessageActionCreator = () => ({ type: Actions.SEND_MESSAGE });
export const updateNewMessageBodyActionCreator = (data) => ({
  type: Actions.UPDATE_NEW_MESSAGE_BODY,
  body: data,
});

export default dialogsReducer;
