import {useForm} from "react-hook-form";
import { connect } from "react-redux";
import { InputSymbols } from "../../const";
import s from "./login.module.css";
import {loginThunkCreator, logoutThunkCreator} from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";

const LoginForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange"
  });

  const FormSubmitClickHandle = (data) => {
    props.login(data.email, data.password, data.rememberMe);
    reset();
  };

  return(
    <form className={s.login} onSubmit={handleSubmit(FormSubmitClickHandle)}>
      <label className={s.login__label}>
        Enter your email
        <input className={`${s.login__input} ${errors.email ? "error" : ""}`} {...register("email", { required: true })} type="email" placeholder="Email"></input>
        {errors.email && <p className="text-error">Email is required.</p>}
      </label>
      <label className={s.login__label}>
        Enter your password
        <input className={`${s.login__input} ${errors.password ? "error" : ""}`} {...register("password", { required: true, minLength: InputSymbols.MIN, maxLength: InputSymbols.MAX })} type="password" placeholder="Password"></input>
        {errors.password && <p className="text-error">Password is required and must contain at least {InputSymbols.MIN} symbols, but no more then {InputSymbols.MAX}</p>}
      </label>
      <div className={s.login__checkbox}>
          <input {...register("rememberMe")} type="checkbox" id="remember"></input>
          <label htmlFor="remember">Remember me</label>
      </div>
      <button className={s.login__submit} type="submit" disabled={!isValid}>Login</button>
    </form>
  )
};

const Login = (props) => {
  if (props.isAuth) {
    return <Navigate to={`/profile/${props.id}`} />
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
  id: state.auth.id
})

export default connect(mapStateToProps, {login: loginThunkCreator, logout: logoutThunkCreator})(Login);