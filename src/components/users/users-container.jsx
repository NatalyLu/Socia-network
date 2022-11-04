import { follow, setUsers, unfollow, setCurrentPage, setTotalUsersCount, toggleIsFetching } from "../../redux/users-reducer";
import { connect } from 'react-redux';
import axios from 'axios';
import React from 'react';
import Users from './users';
import Loader from "../loader/loader";

class UsersAPI extends React.Component {
  componentDidMount() { 
    this.props.toggleIsFetching(true);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
      this.props.setUsers(response.data.items);
      this.props.setTotalUsersCount(response.data.totalCount);
      this.props.toggleIsFetching(false);
    }); 
  }

  pageClickHandler = (page) => {
    this.props.toggleIsFetching(true);
    this.props.setCurrentPage(page);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`).then(response => {
      this.props.setUsers(response.data.items);
      this.props.toggleIsFetching(false);
    });
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
            unfollow={this.props.unfollow}
            pageClickHandler={this.pageClickHandler}
            follow={this.props.follow}
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
  }
};

// let mapDispatchToProps = (dispatch) => {
//   return {
//     follow: (userId) => {
//       dispatch(followActionCreator(userId));
//     },
//     unfollow: (userId) => {
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
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalUsersCount,
    toggleIsFetching})(UsersAPI);

export default UsersContainer;
