import React from "react";
import {useForm} from "react-hook-form";
import Post from "./post/post";
import s from "./posts.module.css";
import avatar from "../../../images/avatar-1.jpg";

const AddPostForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur"
  });

  let addPostHandler = (data) => {
    props.addPost(data.newPost);
  }

  return(
    <form onSubmit={handleSubmit(addPostHandler)} className={s.posts__new}>
      <textarea
        className="textarea"
        {...register("newPost", {required: true, minLength: 50 })}
      />
      {errors.newPost && <p className="error">Post's length must be more then 50 symbols.</p>}
      <button type="submit" className="submit" disabled={!isValid}>Add posts</button>
    </form>
  )
}

const Posts = (props) => {

  return(
    <section className={s.posts}>
      <AddPostForm addPost={props.addPost} />
      <ul className={s.posts__list}>
        {props.posts.map((item) => <Post key={item.id} link={avatar}>{item.text}</Post>)}
      </ul>
    </section>
  )
}

export default Posts;