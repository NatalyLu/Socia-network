import { connect } from 'react-redux';
import React from 'react';
import Profile from './profile';
import {getProfileThunkCreator} from '../../redux/profile-reducer';
import { useParams } from 'react-router-dom';

class ProfileContainer extends React.Component {
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

const TakeParams = (props) => {
  return <ProfileContainer {...props} param={useParams()}/>
}

let mapStateToProps = (state) => ({
  profile: state.profile.profile,
  isFetchingProfile: state.profile.isFetchingProfile
})

const ProfileWrapper = connect(mapStateToProps,{getProfile: getProfileThunkCreator})(TakeParams);

export default ProfileWrapper
