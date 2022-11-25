import PostsContainer from "./posts/posts-container";
import s from "./profile.module.css";
import ProfileInfo from "./profile-info/profile-info"
import Loader from "../loader/loader";
import ErrorBlock from "../error/error-block";

const Profile = (props) => {
  return (
    <section className={s.profile}>
      {props.isFetchingProfile
        ? <Loader /> 
        : props.profile 
            ? <>
                <ProfileInfo styles={s} profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
                <PostsContainer />
              </>
            : <ErrorBlock />
      }
    </section>
  )
};

export default Profile;
