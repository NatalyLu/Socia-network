import user from "../../../images/user.jpg";

const ProfileInfo = (props) => {
  const {styles, profile} = props;
  return (
    <div className={styles.profile__user}>
      <img
        className={styles.profile__avatar}
        src={profile.photos.large != null ? profile.photos.large : user}
        alt="Avatar"
        width="256"
        height="171"
      ></img>
      Description
    </div>
  );
};

export default ProfileInfo;
