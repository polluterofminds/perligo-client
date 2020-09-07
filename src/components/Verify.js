import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { verifyEmail } from '../actions/auth';
import PropTypes from "prop-types";

const Verify = ({ verifyEmail }) => {
  useEffect(() => {
    //Grab the token
    const token = window.location.href.split('token=')[1];
    verifyEmail(token);  
    //  eslint-disable-next-line  
  }, [])
  return (
    <div>
      Verifying...
    </div>
  )
}

Verify.propTypes = {
  verifyEmail: PropTypes.func.isRequired
};

export default connect(null, { verifyEmail })(Verify);
