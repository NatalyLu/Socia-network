import React from 'react';
import { connect } from 'react-redux';
import Header from './header';
import {getAuthThunkCreator} from '../../redux/auth-reducer'

class HeaderAPI extends React.Component {
  componentDidMount() { 
    this.props.getAuth(); 
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

const HeaderContainer = connect(mapStateToProps, {getAuth: getAuthThunkCreator})(HeaderAPI)
export default HeaderContainer;
