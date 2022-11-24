import  profileReducer, {addPost, deletePost} from "./profile-reducer";

let state = {
  posts: [
    { id: 1, text: "Post1", likes: 12 },
    { id: 2, text: "Post2", likes: 24 },
    { id: 3, text: "Post3", likes: 2 },
  ],
};

describe("Profile Reducer's tests", () => {

test('Length of post array should be incremented', () => {
  const post = "Test text";
  let action = addPost(post);
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(4);
});

test("New text of post should be added", () => {
  const post = "Test text";
  let action = addPost(post);
  let newState = profileReducer(state, action);
  expect(newState.posts[3].text).toBe(post);
});

test("Length of posts should be decrement (after deleting post)", () => {
  let action = deletePost(1);
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(2);
});

test("Length of posts shouldn't be decrement if id was incorrect", () => {
  let action = deletePost(1000);
  let newState = profileReducer(state, action);
  expect(newState.posts.length).toBe(3);
});
});
