import React from "react";
import {useForm} from "react-hook-form";
import Post from "./post/post";
import s from "./posts.module.css";
import avatar from "../../../images/avatar-1.jpg";
import { TextareaSymbols } from "../../../const";

const AddPostForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange"
  });

  let addPostHandler = (data) => {
    props.addPost(data.newPost);
  }

  return(
    <form onSubmit={handleSubmit(addPostHandler)} className={s.posts__new}>
      <textarea
        className={`textarea ${errors.newPost && "error"}`}
        {...register("newPost", {required: true, minLength: TextareaSymbols.MIN, maxLength: TextareaSymbols.MAX })}
      />
      {errors.newPost && <p className="text-error">Post's length must be more then {TextareaSymbols.MIN} symbols and less then {TextareaSymbols.MAX}.</p>}
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