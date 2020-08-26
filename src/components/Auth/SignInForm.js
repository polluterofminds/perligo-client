import React, { useState } from "react";
import { TextField, makeStyles, createStyles, FormControlLabel, Radio, Button, LinearProgress } from "@material-ui/core";
import InputAdornment from '@material-ui/core/InputAdornment';
import { AccountCircle, Mail, Lock } from '@material-ui/icons';
import { register, login } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const useStyles = makeStyles(() =>
  createStyles({
    field: {
      marginTop: "20px", 
      width: "90%!important"
    }, 
    left: {
      maxWidth: "80%", 
      margin: 'auto', 
      marginTop: "15px"
    }
  })
);

const SignInForm = ({ login }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const classes = useStyles();

  const { email, password } = formData;

  const onChangeLogin = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitLogin = async e => {
    e.preventDefault();
    if(password && email) {
      setLoading(true);
      login({ email, password });
    }
  };

  return (
    <form onSubmit={onSubmitLogin} noValidate autoComplete="off">
      <div>
        <TextField
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Mail />
              </InputAdornment>
            ),
          }}
          onChange={e => onChangeLogin(e)}
          className={classes.field}
          value={email}
          autoComplete="email"
          variant="outlined"
          label="Email Address"
          type="email"
          name="email"
          placeholder="Email Address"
        />
      </div>
      <div>
        <TextField
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
          onChange={e => onChangeLogin(e)}
          className={classes.field}
          value={password}
          variant="outlined"
          label="Password"
          autoComplete="password"
          type="password"
          name="password"
          placeholder="Password"
        />
      </div>      
      <div>
      {
        loading ? 
        <LinearProgress /> : 
        <Button type='submit' className={classes.left} variant="contained" color="primary">
          Sign In
        </Button>
      }      
      </div>
    </form>
  );
};

SignInForm.propTypes = {
  // setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(SignInForm);