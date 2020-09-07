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

const SignUpForm = ({ register, login }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    password2: "",
    terms: false
  });
  const classes = useStyles();

  const { fName, lName, email, password, password2, terms } = formData;

  const onChangeRegister = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmitRegister = async e => {
    e.preventDefault();
    if (password !== password2) {
      console.log("Passwords do not match", "error");
      //  @TODO display error
    } else if (!terms) {
      console.log("You must agree to the terms", "error");
      //  @TODO display error
    } else {
      setLoading(true);
      register({ firstName: fName, lastName: lName, email, password });
    }
  };

  const handleTerms = e =>
    setFormData({ ...formData, terms: e.target.checked });

  return (
    <form onSubmit={onSubmitRegister} noValidate autoComplete="off">
      <div>
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          onChange={e => onChangeRegister(e)}
          autoComplete="first name"
          value={fName}
          required
          className={classes.field}
          variant="outlined"
          label="First Name"
          type="text"
          name="fName"
          placeholder="First Name"
        />
      </div>
      <div>
        <TextField
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          onChange={e => onChangeRegister(e)}
          value={lName}
          autoComplete="last name"
          className={classes.field}
          variant="outlined"
          label="Last Name"
          type="text"
          name="lName"
          placeholder="Last Name"
        />
      </div>
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
          onChange={e => onChangeRegister(e)}
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
          onChange={e => onChangeRegister(e)}
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
        <TextField
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
          }}
          value={password2}
          onChange={e => onChangeRegister(e)}
          className={classes.field}
          variant="outlined"
          autoComplete="password"
          label="Confirm Password"
          type="password"
          name="password2"
          placeholder="Confirm Password"
        />
      </div>
      <div className={classes.left}>
        <FormControlLabel value={terms} onClick={e => handleTerms(e)} control={<Radio color="primary" />} label="Yes, I agree to the terms of service" />
      </div>
      <div>
      {
        loading ? 
        <LinearProgress /> : 
        <Button type='submit' className={classes.left} variant="contained" color="primary">
          Sign Up
        </Button>
      }      
      </div>
    </form>
  );
};

SignUpForm.propTypes = {
  // setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
};

export default connect(null, { register, login })(SignUpForm);