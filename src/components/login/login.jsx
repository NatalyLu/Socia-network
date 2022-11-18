import {useForm} from "react-hook-form";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { InputSymbols } from "../../const";
import s from "./login.module.css";
import {loginThunkCreator, logoutThunkCreator} from "../../redux/auth-reducer";

const EmailBlock = (props) => {
  const {children, placeholder, errors, register, clearErrors} = props;
  return(
    <label className={s.login__label}>
      {children}
      <input
        className={`${s.login__input} ${errors.email ? "error" : ""}`}
        {...register("email", { 
          required: true,
          pattern: {
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Please enter the valid email"
          }
        })}
        onFocus={() => {clearErrors()}}
        type="email"
        placeholder={placeholder}
      ></input>
      {errors.email && <p className="text-error">{errors.email.message}</p>}
    </label>
  )
}

const PasswordBlock = (props) => {
  const {children, placeholder, errors, register, clearErrors} = props;

  return(
    <label className={s.login__label}>
      {children}
      <input
        className={`${s.login__input} ${errors.password ? "error" : ""}`}
        {...register("password", {
          required: true,
          minLength: InputSymbols.MIN, maxLength: InputSymbols.MAX
        })}
        onFocus={() => {clearErrors()}}
        type="password"
        placeholder={placeholder}
      ></input>
      {errors.password && <p className="text-error">Password is required and must contain at least {InputSymbols.MIN} symbols, but no more then {InputSymbols.MAX}</p>}
    </label>
  )
}

const LoginForm = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange"
  });

  const FormSubmitClickHandle = (data) => {
    props.login(data.email, data.password, data.rememberMe,setError);
    reset();
  };

  return(
    <form className={s.login} onSubmit={handleSubmit(FormSubmitClickHandle)}>
      <EmailBlock placeholder="Email" errors={errors} register={register} clearErrors={clearErrors}>Enter your email</EmailBlock>

      <PasswordBlock placeholder="Password" errors={errors} register={register} clearErrors={clearErrors}>Enter your password</PasswordBlock>

      <div className={s.login__checkbox}>
          <input {...register("rememberMe")} type="checkbox" id="remember"></input>
          <label htmlFor="remember">Remember me</label>
      </div>
      <button className={s.login__submit} type="submit" disabled={!isValid}>Login</button>
      {errors.server && <p className="text-error">{errors.server.message}</p>}
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