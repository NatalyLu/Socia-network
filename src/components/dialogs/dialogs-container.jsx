import { connect } from "react-redux";
import { compose } from "redux";
import Dialogs from "./dialogs";
import { sendMessageActionCreator, updateNewMessageBodyActionCreator } from "../../redux/dialogs-reducer";
import { withAuthRedirect } from "../../hoc/with-auth-redirect";

let mapStateToProps = (state) => {
  return {
    newMessage: state.dialogs.newMessageBody,
    dialogs: state.dialogs,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: () => {
      dispatch(sendMessageActionCreator());
    },
    updateNewMessageBody: (body) => {
      dispatch(updateNewMessageBodyActionCreator(body));
    }
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);