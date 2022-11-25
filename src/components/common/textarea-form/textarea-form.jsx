import {useForm} from "react-hook-form";
import s from "./textarea-form.module.css";

const TextareaForm = ({submitHandler, fieldName, registerObj, placeholder, errorText, buttonText, mode}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({mode: mode});

  return(
    <form onSubmit={handleSubmit(submitHandler)} className={s.form}>
      <textarea
        className={`textarea ${errors[fieldName] && "error"}`}
        {...register(fieldName , {...registerObj})}
        placeholder={placeholder}
      ></textarea>
      
      {errors[fieldName] && <p className="text-error">{errorText}</p>}
      
      <button type="submit" className="submit" disabled={!isValid}>{buttonText}</button>
    </form>
  )
}

export default TextareaForm;
