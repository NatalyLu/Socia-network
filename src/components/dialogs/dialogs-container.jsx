import { connect } from "react-redux";
import { compose } from "redux";
import Dialogs from "./dialogs";
import { sendMessageActionCreator } from "../../redux/dialogs-reducer";
import { withAuthRedirect } from "../../hoc/with-auth-redirect";

let mapStateToProps = (state) => {
  return {
    dialogs: state.dialogs,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (message) => {
      dispatch(sendMessageActionCreator(message));
    },
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);