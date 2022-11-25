import user from "../../../images/user.jpg";
import ProfileStatus from "../profile-status/profile-status";

const ProfileInfo = ({styles, profile, status, updateStatus}) => {
  return (
    <div className={styles.profile__user}>
      <img
        className={styles.profile__avatar}
        src={profile.photos.large != null ? profile.photos.large : user}
        alt="Avatar"
        width="256"
        height="171"
      ></img>
      <ProfileStatus status={status} updateStatus={updateStatus} />
    </div>
  );
};

export default ProfileInfo;
