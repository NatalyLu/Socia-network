
const ProfileImg = ({styles, savePhoto}) => {

  const inputFileHandler = (evt) => {
    if (evt.target.files.length) {
      savePhoto(evt.target.files[0]);
    }
  }

  return (
    <div className={styles.profile__file}>
      <input id="avatar" className="visually-hidden" name="avatar" type="file" accept="image/png, image/jpeg" onChange={inputFileHandler} />
      <label for="avatar" className="submit">Choose a profile picture</label>
    </div>
  );
};

export default ProfileImg;
