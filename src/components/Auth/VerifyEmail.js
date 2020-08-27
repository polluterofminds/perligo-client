import React, { useState} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Box, Card, makeStyles, createStyles, CardContent, Typography, Button } from "@material-ui/core";
import { resendVerificationEmail } from '../../actions/auth';
import { setAlert } from "../../actions/alert";

const useStyles = makeStyles(() =>
  createStyles({
    card: {
      width: "90%",
      margin: "auto",
      textAlign: "center",      
    },
    spacing: {
      marginTop: '20px',
      marginBottom: '20px'
    }, 
    flex: {
      minHeight: '100vh',
      display: "flex",
      alignItems: "center",
      flexDirection: "row", 
      background: "#eee"
    }
  })
);

const token = localStorage.token;

const VerifyEmail = ({ resendVerificationEmail }) => {
  const [verificationReSent, setVerificationResent] = useState(false);
  const classes = useStyles();

  const handleResend = async () => {
    try {
      await resendVerificationEmail(token);
      setVerificationResent(true);
    } catch (error) {
      console.log(error)
      setAlert('Trouble resending email verification', 'error');
    }
  }

  const VerifyYourEmailContent = () => {
    if(verificationReSent) {
      return (
        <Box>
          <Typography className={classes.spacing} variant="h5"> 
            Check your email!
          </Typography>
          <Typography className={classes.spacing}>
            The verification email has been re-sent.
          </Typography>
        </Box>
      )
    } else {
      return (
        <Box>
          <Typography className={classes.spacing} variant="h5"> 
            Looks like you haven't verified your email address yet.
          </Typography>
          <Typography className={classes.spacing}>
            Click the link in the email you received. If you didn't receive the verification email, click the re-send button below.
          </Typography>
          <Button onClick={handleResend} variant="contained" color="primary">
            Re-Send Verification
          </Button>
        </Box>
    )
    }
  }

  return (
    <div className={classes.flex}>
      <Card className={classes.card}>
        <CardContent>
          {VerifyYourEmailContent()}
        </CardContent>
      </Card>
    </div>
  );
};

VerifyEmail.propTypes = {
  // setAlert: PropTypes.func.isRequired,
  resendVerificationEmail: PropTypes.func.isRequired,
};

export default connect(null, { resendVerificationEmail })(VerifyEmail);
