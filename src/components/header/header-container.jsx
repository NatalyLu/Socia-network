import React from "react";
import { connect } from "react-redux";
import Header from "./header";
import {logoutThunkCreator} from "../../redux/auth-reducer"

class HeaderAPI extends React.Component {
  render() {
    return <Header {...this.props} />
  }
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }
}

const HeaderContainer = connect(mapStateToProps, {logout: logoutThunkCreator})(HeaderAPI)
export default HeaderContainer;
