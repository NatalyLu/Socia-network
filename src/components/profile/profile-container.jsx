import { connect } from "react-redux";
import React from "react";
import { compose } from "redux";
import Profile from "./profile";
import {getProfileThunkCreator, getStatus, updateStatus} from "../../redux/profile-reducer";
// import { withAuthRedirect } from "../../hoc/with-auth-redirect";
import { withUrlParams } from "../../hoc/with-url-params";

class ProfileWrapper extends React.Component {
  componentDidMount() {
    let id = this.props.params.id;
    if (!id) {id = 2;}
    this.props.getProfile(id);
    this.props.getStatus(id);
  }

  render() {
    return (
      <Profile {...this.props} />
    )
  }
};

let mapStateToProps = (state) => ({
  profile: state.profile.profile,
  isFetchingProfile: state.profile.isFetchingProfile,
  status: state.profile.status
});

export default compose(
  connect(mapStateToProps,{getProfile: getProfileThunkCreator, getStatus, updateStatus}),
  withUrlParams,
  // withAuthRedirect
)(ProfileWrapper)
