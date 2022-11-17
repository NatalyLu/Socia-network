import {useForm} from "react-hook-form";
import s from "./login.module.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: "onChange"
  });

  const ButtonClickHandle = (data) => {
    console.log(data);
    reset();
  };

  return(
    <form className={s.form} onSubmit={handleSubmit(ButtonClickHandle)}>
      <label className={s.form__input}>
        Enter your login
        <input {...register("login", { required: true })} type="text" placeholder="Login"></input>
        {errors.login && <p className="error">Login is required.</p>}
      </label>
      <label className={s.form__input}>
        Enter your password
        <input {...register("password", { required: true, minLength: 5 })} type="password" placeholder="Password"></input>
        {errors.password && <p className="error">Password is required and must contain at least 5 symbols</p>}
      </label>
      <div className={s.form__checkbox}>
          <input {...register("remember")} type="checkbox" id="remember"></input>
          <label htmlFor="remember">Remember me</label>
      </div>
      <button className={s.form__submit} type="submit" disabled={!isValid}>Login</button>
    </form>
  )
};

const Login = () => {
  return(
    <div>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
}

export default Login;