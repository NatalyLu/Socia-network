import s from "./dialogs.module.css";
import Dialog from "./dialog/dialog";
import Messages from "./messages/messages";
import { DialogSymbols, Errors } from "../../const";
import TextareaForm from "../common/textarea-form/textarea-form";

const Dialogs = (props) => {
  let addMessageHandler = (data) => {
    props.sendMessage(data.newMessage);
  }
  const registerObj = {required: true, minLength: DialogSymbols.MIN, maxLength:DialogSymbols.MAX };

  return (
    <div className={s.dialogs}>
      <Dialog users={props.dialogs.users} />
      <div className={`${s.dialogs__messages} ${s.messages}`}>
        <Messages messages={props.dialogs.messages} />
        <TextareaForm
          mode="onChange"
          submitHandler={addMessageHandler}
          fieldName="newMessage"
          registerObj={registerObj}
          placeholder="Enter your message"
          errorText={Errors.DIALOG_TEXTAREA_ERROR}
          buttonText="Send"
        />
      </div>
    </div>
  );
};

export default Dialogs;