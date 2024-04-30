import React, { useState } from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from '../../actions/auth';

const useStyles = makeStyles((theme) => 
  createStyles({
    rightNav: {
      position: 'absolute',
      right: 15
    }
}))

const TopNav = ({ classes, handleDrawerClose, handleDrawerOpen, open, theme, auth: { user }, logout }) => {
  const localClasses = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    logout();
    handleClose();
  }

  return (
    <>
      <AppBar
        position="fixed"
        className={classes.appBar}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Perligo
          </Typography>
          <div className={localClasses.rightNav}>
            <IconButton onClick={handleClick} color="inherit">
              <Avatar alt={`${user.firstName} ${user.lastName}`} src={user.avatar} />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

TopNav.propTypes = {
  login: PropTypes.func
};

export default connect(mapStateToProps, { logout })(TopNav);

