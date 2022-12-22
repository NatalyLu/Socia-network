const ProfileDetails = ({styles, profile, isOwner, goToEditModeHandler}) => {
  return (
    <div className={styles.profile__details}>
      <ul className={styles.profile__mainList}>
        <li><b>Full name: </b>{profile.fullName}</li>
        <li><b>About me: </b>{profile.aboutMe}</li>
        <li><b>Looking for a job: </b>{profile.lookingForAJob ? "yes" : "no"}</li>
        {profile.lookingForAJob &&
          <li><b>My skills:</b> {profile.lookingForAJobDescription}</li>
        }
        <li><b>Contacts: </b>
          <ul className={styles.profile__subList}>
            {Object.keys(profile.contacts).map(key => {
              return <li key={key}><span><b>{key}: </b>{profile.contacts[key]}</span></li>
            })}
          </ul>
        </li>
      </ul>
      {isOwner && <button type="button" className="submit" onClick={goToEditModeHandler}>Edit</button>}
    </div>
  );
};

export default ProfileDetails;