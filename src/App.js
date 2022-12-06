import { Component } from "react";
import { connect, Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import store from "./redux/redux-store";
import { initializeApp } from "./redux/app-reducer";
import HeaderContainer from "./components/header/header-container";
import Navigation from "./components/navigation/navigation";
import DialogsContainer from "./components/dialogs/dialogs-container";
import ProfileContainer from "./components/profile/profile-container";
import UsersContainer from "./components/users/users-container";
import Login from "./components/login/login";
import Loader from "./components/loader/loader";

class MainApp extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {return (<Loader />)}
    else {
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
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
})

const AppContainer = connect(mapStateToProps, { initializeApp })(MainApp);

const App = () => {
  // <React.StrictMode>
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
  // </React.StrictMode>
}

export default App
