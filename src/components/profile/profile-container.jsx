import { connect } from 'react-redux';
import React from 'react';
import Profile from './profile';
import {getProfileThunkCreator} from '../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/with-auth-redirect';

class ProfileWrapper extends React.Component {
  componentDidMount() {
    let id = this.props.param.id;
    if (!id) {id = 2;}
    this.props.getProfile(id);
  }

  render() {
    return (
      <Profile {...this.props} />
    )
  }
};

let AuthRedirectComponent = withAuthRedirect(ProfileWrapper);

const TakeParams = (props) => {
  return <AuthRedirectComponent {...props} param={useParams()}/>
}

let mapStateToProps = (state) => ({
  profile: state.profile.profile,
  isFetchingProfile: state.profile.isFetchingProfile,
})

const ProfileContainer = connect(mapStateToProps,{getProfile: getProfileThunkCreator})(TakeParams);

export default ProfileContainer
