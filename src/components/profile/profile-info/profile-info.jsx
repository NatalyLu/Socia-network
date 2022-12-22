import { useState } from "react";
import { Errors } from "../../../const";
import user from "../../../images/user.jpg";
import Loader from "../../loader/loader";
import ProfileDataForm from "../profile-data-form/profile-data-form";
import ProfileDetails from "../profile-details/profile-details";
import ProfileImg from "../profile-img/profile-img";
import ProfileStatus from "../profile-status/profile-status";

const ShowErrors = ({errors, styles}) => {
  return(
    <div class={styles.profile__errors}>
      <p class="text-error">{Errors.DEFAULT_ERROR}</p>
      <ol>
        {Object.keys(errors).map(err => {
          return (<li key={err} class="text-error">{errors[err]}</li>)
        })}
      </ol>
    </div>
  );
}

const ProfileInfo = ({styles, profile, status, updateStatus, isOwner, savePhoto, isFetchingPhoto, saveProfileInfo, isFetchingProfileInfo}) => {
  let [editMode, setEditMode] = useState(false);
  let [profileErrors, setProfileErrors] = useState([]);

  const FormSubmitClickHandle = (data) => {
    saveProfileInfo(data).then(() => {
      setProfileErrors([]);
      setEditMode(false);
    })
    .catch((err) => {
      setProfileErrors(err);
    })
  };

  return (
    <div className={styles.profile__user}>
      {isFetchingPhoto
        ? <Loader />
        : <img
            className={styles.profile__avatar}
            src={profile.photos.large || user}
            alt="Avatar"
            width="256"
            height="171"
          />
      }
      {isOwner && <ProfileImg savePhoto={savePhoto} styles={styles} />}
      {isFetchingProfileInfo && <Loader />}
      {editMode
        ? <ProfileDataForm styles={styles} profile={profile} formSubmitClickHandle={FormSubmitClickHandle} isFetchingProfileInfo={isFetchingProfileInfo} />
        : <ProfileDetails styles={styles} profile={profile} isOwner={isOwner} goToEditModeHandler={() => {setEditMode(!editMode);}} />}
      {profileErrors.length !== 0 && <ShowErrors errors={profileErrors} styles={styles} />}
      <ProfileStatus status={status} updateStatus={updateStatus} />
    </div>
  );
};

export default ProfileInfo;
