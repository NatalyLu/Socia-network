import { Routes, Route } from "react-router-dom";
import './App.css';
import DialogsContainer from "./components/dialogs/dialogs-container";
import HeaderContainer from "./components/header/header-container";
import Login from "./components/login/login";
import Navigation from './components/navigation/navigation';
import ProfileContainer from "./components/profile/profile-container";
import UsersContainer from "./components/users/users-container";

const App = () => {
  // const { dialogs } = props.state;

  return (
    <div className="app">
      <HeaderContainer />
      <Navigation />
      <main className="app__main">
        <Routes>
          <Route path="/dialogs" element={<DialogsContainer />} />
          <Route path="/profile/:id" element={<ProfileContainer />} />
          <Route path="/users" element={<UsersContainer />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<div>404 Page not found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

{/* <Route
            path="/dialogs"
            element={<Dialogs dialogs={dialogs} dispatch={props.dispatch} />}
          />
          <Route
            path="/profile"
            element={<Profile profile={profile} dispatch={props.dispatch} />}
          /> */}
