import React, { useState } from "react";
import { Box, Card, makeStyles, createStyles, CardContent, Grid, Typography, Button } from "@material-ui/core";
import SignUpForm from "./SignUpForm";
import LogoFull from "../Shared/LogoFull";
import SignInForm from "./SignInForm";

const useStyles = makeStyles((theme) =>
  createStyles({
    background: {
      backgroundColor: "#4d61fc",
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      height: "100vh",
      width: "100vw",
      overflow: "hidden", 
      position: "fixed", 
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    authButtons: {
      textAlign: 'right'
    }, 
    main: {
      textAlign: "left", 
      width: "85%", 
      margin: "auto"
    },
    card: {
      width: "90%",
      margin: "auto", 
      textAlign: "center"
    }, 
    form: {
      width: "90%", 
      margin: 'auto'
    }, 
    active: {
      background: "#282828", 
      color: "#fff"
    }
  })
);

const Auth = () => {
  const [signUp, setSignUp] = useState(true);

  const classes = useStyles();

  const formToDisplay = () => {
    if(signUp) {
      return <SignUpForm />
    } else {
      return <SignInForm />
    }
  }
  return (
    <div className={classes.background}>
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid className={classes.card} item xs={12} md={6}>
              <Box className={classes.main}>
                <LogoFull />    
                <Typography>Perligo is your creative community. Join a public critique group or create private one and invite people.</Typography>            
              </Box> 
            </Grid>
            <Grid className={classes.card} item xs={12} md={6}>
              <Box className={classes.form}>
                <Box className={classes.authButtons}>
                  <Button onClick={() => setSignUp(true)} className={signUp ? classes.active : ''}>Sign Up</Button>
                  <Button onClick={() => setSignUp(false)} className={signUp ? '' : classes.active}>Sign In</Button>
                </Box>
                {formToDisplay()}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
