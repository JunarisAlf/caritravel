import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef((props, ref) => (
    <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  ));

export default function SnackBar({msg, type, snackOpen, setSnackOpen }) {

  const snackHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar snackOpen={snackOpen} autoHideDuration={6000} onClose={snackHandleClose}>
        <Alert onClose={snackHandleClose} severity={type} sx={{ width: '100%' }}>
          {msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}