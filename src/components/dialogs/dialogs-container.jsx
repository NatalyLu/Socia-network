import Dialogs from './dialogs';
import { sendMessageActionCreator, updateNewMessageBodyActionCreator } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/with-auth-redirect';

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

const AuthRedirectComponent = withAuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;