import React from "react";
import Post from "./post/post";
import s from "./posts.module.css";
import avatar from "../../../images/avatar-1.jpg";
import { Errors, TextareaSymbols } from "../../../const";
import TextareaForm from "../../common/textarea-form/textarea-form";

const Posts = (props) => {
  let addPostHandler = (data) => {
    props.addPost(data.newPost);
  }

  const registerObj = {required: true, minLength: TextareaSymbols.MIN, maxLength: TextareaSymbols.MAX };

  return(
    <section className={s.posts}>
      <TextareaForm
        mode="onChange"
        submitHandler={addPostHandler}
        fieldName="newPost"
        registerObj={registerObj}
        errorText={Errors.POST_TEXTAREA_ERROR}
        buttonText="Add posts"
      />
      <ul className={s.posts__list}>
        {props.posts.map((item) => <Post key={item.id} link={avatar}>{item.text}</Post>)}
      </ul>
    </section>
  )
}

export default Posts;