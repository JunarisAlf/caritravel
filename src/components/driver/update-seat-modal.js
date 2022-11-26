import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import Alert from "@mui/material/Alert";

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

const seatStyle = {
  width: "50px",
  height: "50px",
};
export default function UpdateSeatModal({ open, setOpen }) {
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
          <DialogTitle>Update Driver Seat</DialogTitle>
          <DialogContent>
            <DialogContentText>Update driver seat</DialogContentText>
            <Grid container sx={{ width: "200px", height: "200px", margin: "20px" }}>
              <Grid item xs={4}>
                <Button variant="contained" color="success">
                  <EventSeatIcon />
                </Button>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="warning">
                  <DriveEtaIcon />
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="success">
                  <EventSeatIcon />
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="success">
                  <EventSeatIcon />
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="info">
                  <EventSeatIcon />
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="info">
                  <EventSeatIcon />
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="error">
                  <EventSeatIcon />
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="info">
                  <EventSeatIcon />
                </Button>
              </Grid>
            </Grid>
            <Grid container sx={{ width: "200px", height: "200px", margin: "20px" }} spacing={1}>
            <Grid item xs={12}>
              <Button size="small" variant="contained" color="info">
                TERSEDIA
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button size="small" variant="contained" color="success">
                TERISI
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button size="small" variant="contained" color="error">
                TIDAK DIPAKAI
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button size="small" variant="contained" color="warning">
                SUPIR
              </Button>
            </Grid>
          </Grid>
          </DialogContent>

         
          <DialogActions>
            <Button color="error" onClick={() => setOpen(false)}>
              Batalkan
            </Button>
            <Button onClick={() => setOpen(false)}>Simpan Perubahan</Button>
          </DialogActions>
        </Dialog>
      </Modal>
    </React.Fragment>
  );
}
