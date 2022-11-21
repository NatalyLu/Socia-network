import { connect } from "react-redux";
import React from "react";
import { compose } from "redux";
import { setCurrentPage, getUsersThunkCreator, followThunkCreator, unfollowThunkCreator } from "../../redux/users-reducer";
import Users from "./users";
import Loader from "../loader/loader";
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from "../../redux/users-selectors";
// import { withAuthRedirect } from "../../hoc/with-auth-redirect";

class UsersAPI extends React.Component {
  componentDidMount() { 
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  pageClickHandler = (page) => {
    this.props.setCurrentPage(page);
    this.props.getUsers(page, this.props.pageSize);
  }

  render() {
    return(
      <>
      { this.props.isFetching
        ? <Loader /> : null }
        <Users
            usersCount={this.props.usersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            users={this.props.users}
            pageClickHandler={this.pageClickHandler}
            followingInProgress={this.props.followingInProgress}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
          />
      </>)
  }
};

// const mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     usersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress,
//   }
// };

const mapStateToProps = (state) => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    usersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  }
};

export default compose(
  // withAuthRedirect,
  connect(mapStateToProps, {
    setCurrentPage,
    getUsers: getUsersThunkCreator,
    follow: followThunkCreator,
    unfollow: unfollowThunkCreator}),
)(UsersAPI);
