export const Actions = {
  INITIALIZED_SUCCESS: "app/INITIALIZED_SUCCESS",

  SET_USER_PROFILE: "profile/SET_USER_PROFILE",
  ADD_POST: "profile/ADD_POST",
  DELETE_POST: "profile/DELETE_POST",
  TOGGLE_IS_FETCHING_PROFILE: "profile/TOGGLE_IS_FETCHING",
  SET_STATUS: "profile/SET_STATUS",
  SET_PHOTO_SUCCESS: "profile/SET_PHOTO_SUCCESS",
  TOGGLE_IS_FETCHING_PHOTO: "profile/TOGGLE_IS_FETCHING_PHOTO",

  SEND_MESSAGE: "dialogs/SEND_MESSAGE",

  FOLLOW: "users/FOLLOW",
  UNFOLLOW: "users/UNFOLLOW",
  SET_USERS: "users/SET_USERS",
  SET_CURRENT_PAGE: "users/SET_CURRENT_PAGE",
  SET_TOTAL_USERS_COUNT: "users/SET_TOTAL_USERS_COUNT",
  TOGGLE_IS_FETCHING_USERS: "users/TOGGLE_IS_FETCHING",
  TOGGLE_IS_FOLLOWING_PROGRESS: "users/TOGGLE_IS_FOLLOWING_PROGRESS",

  TOGGLE_IS_FETCHING_AUTH: "auth/TOGGLE_IS_FETCHING",
  SET_USER_DATA: "auth/SET_USER_DATA",
};

export const PORTION_OF_PAGES = 10;

export const TextareaSymbols = {
  MIN: 10,
  MAX: 50,
};

export const InputSymbols = {
  MIN: 5,
  MAX: 15,
};

export const DialogSymbols = {
  MIN: 1,
  MAX: 50,
};

export const Errors = {
  DIALOG_TEXTAREA_ERROR: `Message's length must be more then ${DialogSymbols.MIN} symbols, but less then ${DialogSymbols.MAX}`,
  PASSWORD_ERROR: `Password is required and must contain at least ${InputSymbols.MIN} symbols, but no more then ${InputSymbols.MAX}`,
  POST_TEXTAREA_ERROR: `Post's length must be more then ${TextareaSymbols.MIN} symbols and less then ${TextareaSymbols.MAX}.`,
};

export const PathLinks = {
  DIALOGS: "/dialogs",
  LOGIN: "/login",
  PROFILE: "/profile",
  USERS: "/users",
};

