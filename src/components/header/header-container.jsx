import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import setAuthUserData from '../../redux/auth-reducer';

class HeaderAPI extends React.Component {
  componentDidMount() { 
    // this.props.toggleIsFetching(true);
    axios.get(`https://social-network.samuraijs.com/api/1.0//auth/me`, {
      // разрешаем передачу на сервер наших куков (чтобы кажый раз не подтверждать авторизацию)
      withCredentials: true
    }).then(response => {
      if (response.data.resultCode === 0) {
        let {login, id, email} = response.data.data;
        this.props.setAuthUserData(id, email, login); //не забываем про последовательность параметров для setAuthUserData
      }
      debugger
      // this.props.toggleIsFetching(false);
    }); 
  }

  render() {
    return <Header {...this.props} />
  }
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login
  }
}

const HeaderContainer = connect(mapStateToProps, {setAuthUserData})(HeaderAPI)
export default HeaderContainer;
