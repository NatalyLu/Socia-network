import { connect } from "react-redux";
import React from "react";
import { compose } from "redux";
import Profile from "./profile";
import {getProfileThunkCreator, getStatus, updateStatus, savePhoto, saveProfileInfo} from "../../redux/profile-reducer";
import { withAuthRedirect } from "../../hoc/with-auth-redirect";
import { withUrlParams } from "../../hoc/with-url-params";

class ProfileWrapper extends React.Component {

  refreshProfile = () => {
    let id = this.props.params.id || this.props.authorizedUserId;
    this.props.getProfile(id);
    this.props.getStatus(id);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prev) {
    if (this.props.params.id !== prev.params.id) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile {...this.props} isOwner={Number(this.props.params.id) === this.props.authorizedUserId || !this.props.params.id} />
    )
  }
};

let mapStateToProps = (state) => ({
  profile: state.profile.profile,
  isFetchingProfile: state.profile.isFetchingProfile,
  status: state.profile.status,
  authorizedUserId: state.auth.id,
  isAuth: state.auth.isAuth,
  isFetchingPhoto: state.profile.isFetchingPhoto,
  isFetchingProfileInfo: state.profile.isFetchingProfileInfo,
});

export default compose(
  connect(mapStateToProps,{getProfile: getProfileThunkCreator, getStatus, updateStatus, savePhoto, saveProfileInfo}),
  withUrlParams,
  withAuthRedirect
)(ProfileWrapper)
