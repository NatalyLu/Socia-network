import {useForm} from "react-hook-form";
import s from "./dialogs.module.css";
import Dialog from "./dialog/dialog";
import Messages from "./messages/messages";
import { DialogSymbols } from "../../const";

const AddMessageForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({});

  let addMessageHandler = (data) => {
    props.sendMessage(data.newMessage);
  }

  return(
    <form onSubmit={handleSubmit(addMessageHandler)} className={s.messages__new}>
      <textarea
        className={`textarea ${errors.newMessage && "error"}`}
        {...register("newMessage", {required: true, minLength: DialogSymbols.MIN, maxLength:DialogSymbols.MAX })}
        placeholder="Enter your message"></textarea>
        {errors.newMessage && <p className="text-error">Message's length must be more then {DialogSymbols.MIN} symbols, but less then {DialogSymbols.MAX}.</p>}
      <button type="submit" className="submit" disabled={!isValid}>Send</button>
    </form>
  )
}

const Dialogs = (props) => {

  return (
    <div className={s.dialogs}>
      <Dialog users={props.dialogs.users} />
      <div className={`${s.dialogs__messages} ${s.messages}`}>
        <Messages messages={props.dialogs.messages} />
        <AddMessageForm sendMessage={props.sendMessage}/>
      </div>
    </div>
  );
};

export default Dialogs;