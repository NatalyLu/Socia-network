import React, { Suspense, Component } from "react";
import { connect, Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./App.css";
import store from "./redux/redux-store";
import { initializeApp } from "./redux/app-reducer";
import HeaderContainer from "./components/header/header-container";
import Navigation from "./components/navigation/navigation";
import Loader from "./components/loader/loader";

const DialogsContainer = React.lazy(() => import("./components/dialogs/dialogs-container"));
const ProfileContainer = React.lazy(() => import("./components/profile/profile-container"));
const UsersContainer = React.lazy(() => import("./components/users/users-container"));
const Login = React.lazy(() => import("./components/login/login"));

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
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/dialogs" element={<DialogsContainer />} />
                {["/profile", "/profile/:id"].map((path) => (
                  <Route key={path} path={path} element={<ProfileContainer />} />
                ))}
                <Route path="/users" element={<UsersContainer />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<h1>Hello!</h1>} />
                <Route path="*" element={<div>404 Page not found</div>} />
              </Routes>
            </Suspense>
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
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
  // </React.StrictMode>
}

export default App
