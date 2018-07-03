import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const SnackBar = (props) => (
  <Snackbar
    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
    autoHideDuration={6000}
    open={props.isOpen}
    onClose={props.onClose}
    ContentProps={{ 'aria-describedby': 'message-id' }}
    message="Error"
    action={[
    <IconButton
      key="close"
      aria-label="Close"
      color="inherit"
      onClick={props.onClose}
    >
      <CloseIcon />
    </IconButton>,
  ]}
/>
);

export default SnackBar;
