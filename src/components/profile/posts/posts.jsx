import React from 'react';
import Post from './post/post';
import s from './posts.module.css';
import avatar from '../../../images/avatar-1.jpg';

const Posts = (props) => {
  let newPost = React.createRef();

  let addPostsHandler = () => {
    // props.dispatch(addPost());
    props.addPost();
  }

  let postChangeHandler = () => {
    // props.dispatch(updateNewPost(newPost.current.value));
    props.updateNewPostText(newPost.current.value);
  }

  return(
    <section className={s.posts}>
      <div className={s.posts__new}>
        <textarea
          className='textarea'
          ref={newPost}
          value={props.newPostText}
          onChange={postChangeHandler}
        />
        <button type="submit" className='submit' onClick={addPostsHandler}>Add posts</button>
      </div>
      <ul className={s.posts__list}>
        {props.posts.map((item) => <Post key={item.id} link={avatar}>{item.text}</Post>)}
      </ul>
    </section>
  )
}

export default Posts;