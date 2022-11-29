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

import axios from "axios";
import getLocalStorage from "../../utils/getLocalStorage";
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

const seatStyle = {
  width: "50px",
  height: "50px",
};
export default function UpdateSeatModal({ 
    open, 
    setOpen, 
    seats, 
    driverID,
    refresh,
    setRefresh}) {

    let [isLoading, setIsLoading] = React.useState(true)
    let [carSeat, setCarSeat] = React.useState()
    const [seatStatus, setSeatStatus] = React.useState(['avalaible', 'not-avalaible', "not-used"])
    React.useEffect(()=>{
        let newSeats = {}
        if(seats == null || seats.length == 0 ){
            let id = ['A1', 'B1', 'B2', 'B3', 'C1', "C2", 'C3']
            id.forEach((e) => {
                newSeats[e] = 
                {
                    id: `${driverID}-${e}`,
                    status: 'avalaible',
                    color: 'info'
                }
            })
        }else{
            seats.forEach((seat, i) => {
                let color;
                if(seat.status == 'avalaible'){
                    color = 'info'
                }else if(seat.status == 'not-avalaible'){
                    color = 'success'
                }else{
                    color = 'error'
                }
                newSeats[seat.seat_id] = 
                {
                    id: seat.id,
                    status: seat.status,
                    color
                }
            })
        }
        setCarSeat(newSeats);
        setIsLoading(false)
    }, [seats])

    const handleSeatClick = (e) => {
        let id = e.currentTarget.id
        let counter = e.currentTarget.ariaValueNow++
        if (counter == 2){
            e.currentTarget.ariaValueNow = 0
        }
        let newSeat = {...carSeat}
        newSeat[id].status = seatStatus[counter]
        let color;
        if(newSeat[id].status == 'avalaible'){
            color = 'info'
        }else if(newSeat[id].status == 'not-avalaible'){
            color = 'success'
        }else{
            color = 'error'
        }
        newSeat[id].color = color
        setCarSeat(newSeat)
    }
 
    const handleSubmit = () => {
        let updatedSeats = []
        for (const key in carSeat){
            updatedSeats.push({id: carSeat[key].id, seat_id: key ,status: carSeat[key].status})
        }
        let driver = getLocalStorage("user");
        axios
          .put(`${localVar.API_URL}/driver/seat`, {
                seats: updatedSeats
          },
          {
            headers: { Authorization: driver.token},
          })
          .then(function (res) {
            setOpen(false);
            setRefresh(!refresh)
          })
          .catch(function (err) {
              console.log(err)
          });
    }

    if(isLoading){
        return <span>loading...</span>
    }else{
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
              <DialogContentText>Selalu update data bangku mobil anda</DialogContentText>
              <Grid container sx={{ width: "200px", height: "200px", margin: "20px" }}>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.A1.color} ariaValueNow={0} ariaValueNow={0} id="A1" onClick={(e) => handleSeatClick(e) }>
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
                  <Button variant="contained" color={carSeat.B1.color} ariaValueNow={0} id="B1" onClick={(e) => handleSeatClick(e) }>
                    <EventSeatIcon />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.B2.color} ariaValueNow={0} id="B2" onClick={(e) => handleSeatClick(e) }>
                    <EventSeatIcon />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.B3.color} ariaValueNow={0} id="B3" onClick={(e) => handleSeatClick(e) }>
                    <EventSeatIcon />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.C1.color} ariaValueNow={0} id="C1" onClick={(e) => handleSeatClick(e) }>
                    <EventSeatIcon />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.C2.color} ariaValueNow={0} id="C2" onClick={(e) => handleSeatClick(e) }>
                    <EventSeatIcon />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.C3.color} ariaValueNow={0} id="C3" onClick={(e) => handleSeatClick(e) }>
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
              <Button onClick={() => handleSubmit()}>Simpan Perubahan</Button>
            </DialogActions>
          </Dialog>
        </Modal>
      </React.Fragment>
        )
    }
}
