import {useForm} from "react-hook-form";
import { Errors, PROFILE_FORM_FIELD_MAX_LENGTH } from "../../../const";
import Field from "../../common/field/field";


const ProfileDataForm = ({styles, profile, formSubmitClickHandle, isFetchingProfileInfo}) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: profile.fullName,
      aboutMe: profile.aboutMe,
      lookingForAJob: profile.lookingForAJob,
      lookingForAJobDescription: profile.lookingForAJobDescription,
      "contacts.facebook": profile.contacts.facebook,
      "contacts.github": profile.contacts.github,
      "contacts.instagram": profile.contacts.instagram,
      "contacts.mainLink": profile.contacts.mainLink,
      "contacts.twitter": profile.contacts.twitter,
      "contacts.vk": profile.contacts.vk,
      "contacts.website": profile.contacts.website,
      "contacts.youtube": profile.contacts.youtube,
    },
    mode: "onChange",
  });

  const createRegisterObj = (name) => {
    return {...register(name, {
      maxLength: PROFILE_FORM_FIELD_MAX_LENGTH
    })};
  } 

  const createTextInput = (type, fieldName, placeholder, labelText) => {
    return <Field type={type} errors={errors} registerObj={createRegisterObj(fieldName)} fieldName={fieldName} placeholder={placeholder} errorMessage={Errors.PROFILE_FIELD_TOO_LONG} clearErrors={clearErrors}>{labelText}</Field>
  }

  return (
    <form className={styles.profile__form} onSubmit={handleSubmit(formSubmitClickHandle)}>
      <span className={styles.profile__title}>Main information:</span>
      {createTextInput("text","fullName", "Enter your full name", "Full name")}
      {createTextInput("text","aboutMe", "Enter description", "About me")}
      <Field type="checkbox" fieldName="lookingForAJob" registerObj={{...register("lookingForAJob")}} >Looking for a job</Field>
      {createTextInput("textarea", "lookingForAJobDescription", "Enter your skills", "My skills")}

      <span className={styles.profile__title}>Contacts:</span>
      <ul className={styles.profile__list}>
        {Object.keys(profile.contacts).map(key => {
          return <li key={key}>{createTextInput("text", `contacts.${key}`, "", `${key}`)}</li>
        })}
      </ul>
      <button type="submit" className="submit" disabled={!isValid || isFetchingProfileInfo}>Save</button>
    </form>
  );
};

export default ProfileDataForm;
