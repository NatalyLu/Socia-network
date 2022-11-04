import s from './dialogs.module.css';
import Dialog from './dialog/dialog';
import Messages from './messages/messages';

const Dialogs = (props) => {
  const {newMessage} = props.newMessage;

  let sendMessageClickHandler = () => {
    props.sendMessage();
  };

  let messageChangeHandler = (evt) => {
    props.updateNewMessageBody(evt.target.value);
  };

  return (
    <div className={s.dialogs}>
      <Dialog users={props.dialogs.users} />
      <div className={`${s.dialogs__messages} ${s.messages}`}>
        <Messages messages={props.dialogs.messages} />
        <div className={s.messages__new}>
          <textarea
            className='textarea'
            value={newMessage}
            onChange={(evt) => {messageChangeHandler(evt)}}
            placeholder='Enter your message'></textarea>
          <button type="submit" className='submit' onClick={sendMessageClickHandler}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Dialogs;