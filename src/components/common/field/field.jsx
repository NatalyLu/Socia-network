import s from "./field.module.css";

const Field = ({children, errors, registerObj, placeholder, fieldName, clearErrors, errorMessage}) => {
  return(
    <label className={s.label}>
      {children}
      <input
        className={`${s.input} ${errors[fieldName] ? "error" : ""}`}
        {...registerObj}
        onFocus={() => {clearErrors()}}
        type={fieldName}
        placeholder={placeholder}
      ></input>
      {errors[fieldName] && <p className="text-error">{errors[fieldName].message || errorMessage || "Please enter a valid data"}</p>}
    </label>
  )
}

export default Field;
