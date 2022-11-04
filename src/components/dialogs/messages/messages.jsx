import s from '../dialogs.module.css';

const MessageComponent = (props) => {
  return <li>{props.children}</li>;
}

const Messages = (props) => {
 const {messages} = props;

  return (
    <ul className={s.messages__list}>
      {messages.map((item) => <MessageComponent key={item.id}>{item.message}</MessageComponent> )}
    </ul>
  );
};

export default Messages;