import React, { useEffect, useState } from 'react'
import { fetchGroups, createGroup } from '../../actions/groups';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import YourGroups from './components/YourGroups';
import PublicGroups from './components/PublicGroups'; 
import NewGroupOverlay from './components/NewGroupOverlay';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const Groups = ({ fetchGroups, groups, createGroup }) => {
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState(true);
  const [groupName, setGroupName] = useState('');

  useEffect(() => {
    fetchGroups();
  }, []);

  const newGroupOverlay = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleCreate = () => {
    createGroup({name: groupName, privateGroup: checked})
    handleClose();
  }

  const handleChecked = () => {
    setChecked(!checked);
  }

  const handleName = (e) => {
    setGroupName(e.target.value);
  }
  return (
    <div className='top_margin container'>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <div>
            <h1>Your Groups
            <Button onClick={newGroupOverlay} className="margin-left" variant="contained" color="primary">
              New Group
            </Button>
            </h1>
            <YourGroups yourGroups={groups.groups} />
          </div>
        </Grid> 
        <Grid item xs={12} md={6} lg={6}>  
          <div>
            <h1>Public Groups</h1>
            <PublicGroups publicGroups={groups.publicGroups} />
          </div>
        </Grid>
      </Grid>  
      <NewGroupOverlay open={open} checked={checked} groupName={groupName} handleChecked={handleChecked} handleName={handleName} handleClose={handleClose} handleCreate={handleCreate} />    
    </div>
  )
}

const mapStateToProps = state => ({
  groups: state.groups
});

Groups.propTypes = {
  fetchGroups: PropTypes.func.isRequired,
  createGroup: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { fetchGroups, createGroup })(Groups);