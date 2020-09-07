import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import VerifyEmail from './Auth/VerifyEmail';
import Feed from '../components/Feed/index';

const Home = ({ auth: { emailVerified } }) => {
  if(emailVerified) {
    return (
      <Feed />
    )
  } else {
    return (
      <VerifyEmail />
    )
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);