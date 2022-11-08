import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import setAuthUserData from '../../redux/auth-reducer';
import { getAuth } from '../../api/api';

class HeaderAPI extends React.Component {
  componentDidMount() { 
    // this.props.toggleIsFetching(true);
    getAuth().then(data => {
      if (data.resultCode === 0) {
        let {login, id, email} = data.data;
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
