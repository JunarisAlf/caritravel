import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function UpdatePasswordModal({open, setOpen}) {
  return (
    <React.Fragment>
      <Modal
        hideBackdrop
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Ubah Password Driver</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Isikan password baru driver di kolom dibawah, pastikan password di isi dengan benar.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password Baru"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={() => setOpen(false)}>Batalkan</Button>
          <Button onClick={() => setOpen(false)}>Simpan Perubahan</Button>
        </DialogActions>
      </Dialog>
      </Modal>
    </React.Fragment>
  );
}
