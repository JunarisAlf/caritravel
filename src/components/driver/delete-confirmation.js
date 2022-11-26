import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from '@mui/material/Button';
import axios from 'axios'
import localVar from '../../utils/localVar'
import getLocalStorage from '../../utils/getLocalStorage'

export default function DeleteConfirmation({ setOpen, open, confirAtr, setSnackOpen,setSnackAtr, setReFecth, reFetch }) {
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const deleteHandle = (id) => {
    let admin = getLocalStorage("user");
    axios.delete(`${localVar.API_URL}/admin/driver/${id}`, {
        headers: { Authorization: admin.token },
      })
      .then(function (res) {
          let delRes = res.data
        console.log('succes',res);
        setOpen(false)
        setSnackAtr({msg: delRes.message, type: 'success' })
        setSnackOpen(true)
        setReFecth(!reFetch)
      })
      .catch(function (err) {
        let delRes = err.response.data
        setSnackAtr({msg: delRes.message, type: 'warning' })
        setSnackOpen(true)
      });
    console.log(id)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Konfirmasi penghapusan data"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Apakah anda yakin ingin menghapus data 
          <strong> {confirAtr.name} </strong>
          
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">Batalkan</Button>
        <Button onClick={() => { deleteHandle(confirAtr.id) }} color="error">
          Hapus
        </Button>
      </DialogActions>
    </Dialog>
  );
}
