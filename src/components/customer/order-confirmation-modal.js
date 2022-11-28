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
import { useRouter } from 'next/router'
import localVar from "../../utils/localVar";

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

export default function OrderConfirmationModal({ open, setOpen, driver, selectedSeat }) {
    const router = useRouter()

  const [customerName, setCustomerName] = React.useState("");
  const submitHandler = () => {

      let msg = `Hallo Admin! %0A*${customerName}* mau pesan travel nih, keberangkatan *${driver.departure}* hari, tujuannya ke *${driver.to.kabupaten} - ${driver.to.kecamatan}*, keberangkatan dari *${driver.from.kabupaten} - ${driver.from.kecamatan}*, tempat duduknya di *${selectedSeat}*, supirnya saudara *${driver.name} [${driver.id}]*. %0ALokasi titik jemput saya share via chat whasapp ya!%0ATerimaksih.`
    router.push(`https://wa.me/${localVar.WA[0]}?text=${msg}`)
  };
  
  return (
    <React.Fragment>
      <Modal hideBackdrop open={open} onClose={() => setOpen(false)}>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Konfirmasi Pesanan Anda!</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Supir anda ${driver.name}, berangkat ${driver.departure} hari, tujuan ${driver.to.kabupaten} - ${driver.to.kecamatan}, berangkat dari ${driver.from.kabupaten} - ${driver.from.kecamatan}, biaya Rp. ${driver.price}, dengan tempat duduk ${selectedSeat}`}
              <br/><br/>

                <strong> [Daftar tempat duduk]: </strong><br/>

                A1: kursi depan samping supir <br/>
                B1: Kursi baris kedua, pojok kiri <br/>
                B2: Kursi baris kedua, tengah <br/>
                B3: Kursi baris kedua, pojok kanan <br/>
                C1: Kursi baris ketiga, pojok kiri <br/>
                C2: Kursi baris ketiga, tengah <br/>
                C3: Kursi barus ketiga, pojok kanan 

            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="customerName"
              label="Isikan nama anda"
              type="text"
              fullWidth
              required
              variant="standard"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={() => setOpen(false)}>
              Batalkan
            </Button>
            <Button onClick={() => submitHandler()}>Buat Pesanan</Button>
          </DialogActions>
        </Dialog>
      </Modal>
    </React.Fragment>
  );
}
