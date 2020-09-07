import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '@material-ui/lab/Alert';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }),
);

const Message = ({ alerts }) => {
  const classes = useStyles();
  if(alerts && alerts.length > 0) {
    return (
      alerts.map((alert) => {
        return <div key={alert.id} className={classes.root}><Alert severity={alert.alertType}>{alert.msg}</Alert></div>
      })
    )
  } else {
    return <></>
  }
}
  
Message.propTypes = {
  alerts: PropTypes.array
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Message);