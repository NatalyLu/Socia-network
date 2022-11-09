import PostsContainer from './posts/posts-container';
import s from './profile.module.css';
import img from '../../images/lions.jpg'
import ProfileInfo from './profile-info/profile-info'
import Loader from '../loader/loader';
import ErrorBlock from '../error/error-block';

const Profile = (props) => {
  return (
    <section className={s.profile}>
      {props.isFetchingProfile
        ? <Loader /> 
        : props.profile 
            ? <>
                <img
                  className={s.profile__img}
                  src={img}
                  alt="Lions"
                  width="256"
                  height="171"
                ></img>
                <ProfileInfo styles={s} profile={props.profile} />
                <PostsContainer />
              </>
            : <ErrorBlock />
      }
    </section>
  )
};

export default Profile;


// posts={props.profile.posts} dispatch={props.dispatch} newPostText={props.profile.newPostText}