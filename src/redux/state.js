import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";

let store = {
  _state: {
    dialogs: {
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
    },

    profile: {
      posts: [
        { id: 1, text: "Post1", likes: 12 },
        { id: 2, text: "Post2", likes: 24 },
        { id: 3, text: "Post3", likes: 4 },
        { id: 4, text: "Post4", likes: 6 },
      ],
      newPostText: "It",
      profile: null,
    },
  },

  _callSubscriber() {
    console.log("state was changed");
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  getState() {
    return this._state;
  },

  dispatch(action) {
    this._state.profile = profileReducer(this._state.profile, action);
    this._state.dialogs = dialogsReducer(this._state.dialogs, action);

    this._callSubscriber(this._state);
  },
};

export default store;

// window.store = store;
