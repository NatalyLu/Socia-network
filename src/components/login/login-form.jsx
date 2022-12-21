import {useForm} from "react-hook-form";
import { Errors, InputSymbols } from "../../const";
import Field from "../common/field/field";
import s from "./login.module.css";

const LoginForm = ({login}) => {
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
    login(data.email, data.password, data.rememberMe, setError);
    reset();
  };

  const fieldEmailName="email";
  const fieldPasswordName="password";
  const emailRegisterObj= {...register(fieldEmailName, { 
    required: true,
    pattern: {
      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      message: "Please enter the valid email"
    }
  })};
  const passwordRegisterObj= {...register(fieldPasswordName, {
    required: true,
    minLength: InputSymbols.MIN,
    maxLength: InputSymbols.MAX
  })};
  

return(
    <form className={s.login} onSubmit={handleSubmit(FormSubmitClickHandle)}>
      <Field type="email" errors={errors} registerObj={emailRegisterObj} placeholder="Email" fieldName={fieldEmailName} clearErrors={clearErrors}>Enter your email</Field>

      <Field type="password" errors={errors} registerObj={passwordRegisterObj} placeholder="Password" fieldName={fieldPasswordName} clearErrors={clearErrors} errorMessage={Errors.PASSWORD_ERROR}>Enter your password</Field>

      <div className={s.login__checkbox}>
          <input {...register("rememberMe")} type="checkbox" id="remember"></input>
          <label htmlFor="remember">Remember me</label>
      </div>
      <button className={s.login__submit} type="submit" disabled={!isValid}>Login</button>
      {errors.server && <p className="text-error">{errors.server.message}</p>}
    </form>
  )
};

export default LoginForm;
