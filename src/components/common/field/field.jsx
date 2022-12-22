import { Errors } from "../../../const";
import s from "./field.module.css";

const Field = ({children, type, errors, registerObj, placeholder, fieldName, clearErrors, errorMessage}) => {
  if (type === "checkbox") {
    return(
      <label className={s.labelCheckbox}>
        {children}
        <input
          className={s.checkbox}
          type={type}
          {...registerObj}
          name={fieldName}
        ></input>
      </label>
    )
  } else if (type === "textarea") {
    return(
      <label className={s.label}>
        {children}
        <textarea
          className={`${s.textarea} ${errors[fieldName] ? "error" : ""}`}
          {...registerObj}
          type={type}
          placeholder={placeholder}
        ></textarea>
        {errors[fieldName] && <p className="text-error">{errors[fieldName].message || errorMessage || Errors.DEFAULT_FIELD_ERROR}</p>}
      </label>
    )
  }else {
    return(
      <label className={s.label}>
        {children}
        <input
          className={`${s.input} ${errors[fieldName] ? "error" : ""}`}
          {...registerObj}
          onFocus={() => {clearErrors()}}
          type={type}
          placeholder={placeholder}
        ></input>
        {errors[fieldName] && <p className="text-error">{errors[fieldName].message || errorMessage || Errors.DEFAULT_FIELD_ERROR}</p>}
      </label>
    )
  } 
}

export default Field;
