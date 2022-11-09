import { setCurrentPage, getUsersThunkCreator, followThunkCreator, unfollowThunkCreator } from "../../redux/users-reducer";
import { connect } from 'react-redux';
import React from 'react';
import Users from './users';
import Loader from "../loader/loader";

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

const mapStateToProps = (state) => {
  return {
    users: state.usersPage.users,
    pageSize: state.usersPage.pageSize,
    usersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  }
};

// let mapDispatchToProps = (dispatch) => {
//   return {
//     followSuccess: (userId) => {
//       dispatch(followActionCreator(userId));
//     },
//     unfollowSuccess: (userId) => {
//       dispatch(unfollowActionCreator(userId));
//     },
//     setUsers: (users) => {
//       dispatch(setUsersActionCreator(users));
//     },
//     setCurrentPage: (page) => {
//       dispatch(setCurrentPageActionCreator(page));
//     },
//     setTotalUsersCount: (count) => {
//       dispatch(setTotalUsersCountActionCreator(count));
//     },
//     toggleIsFetching: (value) => {
//       dispatch(toggleIsFetchingActionCreator(value));
//     }
//   }
// };

// let name = 'v';
// let obj = {
//   name: name, // тоже самое, что 
//   //name => сокращение, значит мы создадим свойство name со значением из переменной name
// // переименовав toggleIsFetchingActionCreator в toggleIsFetching можем использовать это сокращение при образении к mapDispatchToProps
// }


const UsersContainer = connect(mapStateToProps, {
    setCurrentPage,
    getUsers: getUsersThunkCreator,
    follow: followThunkCreator,
    unfollow: unfollowThunkCreator})(UsersAPI);

export default UsersContainer;
