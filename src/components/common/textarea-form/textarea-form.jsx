import { useEffect } from "react";
import {useForm} from "react-hook-form";
import Field from "../field/field";
import s from "./textarea-form.module.css";

const TextareaForm = ({children, submitHandler, fieldName, registerObj, placeholder, errorText, buttonText, mode}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    reset,
  } = useForm({mode: mode});

  const formSubmitHandler = (data) => {
    submitHandler(data);
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return(
    <form onSubmit={handleSubmit(formSubmitHandler)} className={s.form}>
      <Field
        type="textarea"
        errors={errors}
        fieldName={fieldName}
        registerObj={{ ...register(fieldName, {...registerObj}) }}
        placeholder={placeholder}
        errorMessage={errorText}
      >{children}</Field>
      
      <button type="submit" className="submit" disabled={!isValid}>{buttonText}</button>
    </form>
  )
}

export default TextareaForm;
