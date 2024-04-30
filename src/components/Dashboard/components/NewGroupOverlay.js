import React, { useState } from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Switch from "@material-ui/core/Switch";
import Button from '@material-ui/core/Button';

const NewGroupOverlay = ({ open, handleClose, handleCreate, groupName, checked, handleChecked, handleName }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Create New Group</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Once you create a group, you'll be able to invite others to join the group with you.
        </DialogContentText>
        <div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Group name"
            type="text"
            fullWidth
            value={groupName}
            onChange={handleName}
          />
        </div>
        <div>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChecked}
                name="private"
                color="primary"
              />
            }
            label="Private"
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewGroupOverlay;
