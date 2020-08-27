import React from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import VerifyEmail from './Auth/VerifyEmail';

const Home = ({ auth: { emailVerified } }) => {
  if(emailVerified) {
    return (
      <div>
        Let's get started
      </div>
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