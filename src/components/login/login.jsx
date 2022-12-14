import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import {loginThunkCreator, logoutThunkCreator} from "../../redux/auth-reducer";
import LoginForm from "./login-form";
import { PathLinks } from "../../const";

const Login = ({isAuth, id, ...props}) => {
  if (isAuth) {
    return <Navigate to={`${PathLinks.PROFILE}/${id}`} />
  }

  return(
    <div>
      <h1>Login</h1>
      <LoginForm {...props} />
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
  id: state.auth.id
})

export default connect(mapStateToProps, {login: loginThunkCreator, logout: logoutThunkCreator})(Login);