import PostsContainer from './posts/posts-container';
import s from './profile.module.css';
import img from '../../images/lions.jpg'
import ProfileInfo from './profile-info/profile-info'
import Loader from '../loader/loader';

const Profile = (props) => {
  return (
    <section className={s.profile}>
      {!props.profile
        ? <Loader />
        : <>
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
      }
    </section>
  )
};

export default Profile;


// posts={props.profile.posts} dispatch={props.dispatch} newPostText={props.profile.newPostText}