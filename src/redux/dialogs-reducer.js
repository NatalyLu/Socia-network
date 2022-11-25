import { Actions } from "../const";

const sendMessage = (state, message) => {
  state.messages.push({
    id: state.messages.length + 1,
    message: message,
  });
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
};

const dialogsReducer = (state = initialState, action) => {
  let stateCopy = {
    ...state,
    messages: [...state.messages]
  };

  switch (action.type) {
    case Actions.SEND_MESSAGE:
      return sendMessage(stateCopy, action.message);
    default:
      return state;
  }
};

export const sendMessageActionCreator = (message) => ({ type: Actions.SEND_MESSAGE, message });

export default dialogsReducer;
