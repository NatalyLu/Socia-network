import user from "../../../images/user.jpg";
import Loader from "../../loader/loader";
import ProfileImg from "../profile-img/profile-img";
import ProfileStatus from "../profile-status/profile-status";

const ProfileInfo = ({styles, profile, status, updateStatus, isOwner, savePhoto, isFetchingPhoto}) => {
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
      <ProfileStatus status={status} updateStatus={updateStatus} />
    </div>
  );
};

export default ProfileInfo;
