import { connect } from 'react-redux';
import React from 'react';
import { compose } from 'redux';
import Profile from './profile';
import {getProfileThunkCreator} from '../../redux/profile-reducer';
import { withAuthRedirect } from '../../hoc/with-auth-redirect';
import { withUrlParams } from '../../hoc/with-url-params';

class ProfileWrapper extends React.Component {
  componentDidMount() {
    let id = this.props.params.id;
    if (!id) {id = 2;}
    this.props.getProfile(id);
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
});

export default compose(
  connect(mapStateToProps,{getProfile: getProfileThunkCreator}),
  withUrlParams,
  withAuthRedirect
)(ProfileWrapper)
