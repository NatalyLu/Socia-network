import { connect } from 'react-redux';
import React from 'react';
import Profile from './profile';
import {setUserProfile} from '../../redux/profile-reducer';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../api/api';

class ProfileContainer extends React.Component {
  componentDidMount() {
    let id = this.props.param.id;
    if (!id) {id = 2;}
    debugger;
    // this.props.toggleIsFetching(true);
    getProfile(id).then(data => {
        this.props.setUserProfile(data);
        // this.props.toggleIsFetching(false);
      }); 
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
  profile: state.profile.profile
})

const ProfileWrapper = connect(mapStateToProps,{setUserProfile})(TakeParams);

export default ProfileWrapper
