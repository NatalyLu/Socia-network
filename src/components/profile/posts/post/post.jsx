import s from "./post.module.css";

const Post = (props) => {
  const {link, children} = props;
  return(
    <li className={s.posts__item}>
      <img src={link} alt="User avatar" />
      <p>{children}</p>
    </li>
  )
}

export default Post;