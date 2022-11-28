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
    setSeat, 
    driverID, 
    }) {

    let [isLoading, setIsLoading] = React.useState(true)
    let [carSeat, setCarSeat] = React.useState()
    const [selectedSeat, setSelectedSeat] = React.useState([])
    const [seatStatus, setSeatStatus] = React.useState(['avalaible', 'not-avalaible', "not-used"])
    
    
    React.useEffect(()=>{
        const admin = getLocalStorage('user')
        axios.get(`${localVar.API_URL}/customer/driver-seat/${driverID}`)
        .then(function(res){
            let seats = res.data.data
            let newSeats = {}
            if(seats.length == 0 || seats == null ){
                let id = ['A1', 'B1', 'B2', 'B3', 'C1', "C2", 'C3']
                id.forEach((e) => {
                    newSeats[e] = 
                    {
                        id: `${driverID}-${e}`,
                        status: 'avalaible',
                        color: 'info',
                        isDisabled: false
                    }
                })
            }else{
                seats.forEach((seat, i) => {
                    let color;
                    let isDisabled;
                    if(seat.status == 'avalaible'){
                        color = 'info'
                        isDisabled = false
                    }else if(seat.status == 'not-avalaible'){
                        color = 'success'
                        isDisabled =true
                    }else{
                        color = 'error'
                        isDisabled =true
                    }
                    newSeats[seat.seat_id] = 
                    {
                        id: seat.id,
                        status: seat.status,
                        color,
                        isDisabled
                    }
                })
            }
            setCarSeat(newSeats);
            setIsLoading(false)
        })
        .catch(function(err){
            console.log(err)
        })  
        
    }, [driverID])

    const handleSeatClick = (e) => {        
        let id = e.currentTarget.id
        let newSeat = {...carSeat}

        // Togle array value
        if(selectedSeat.includes(id)){
            let tmp = selectedSeat.filter((e) => {
                return e !== id
            })
            console.log('tmp', tmp)
            setSelectedSeat(tmp)

            newSeat[id].status = 'avalaible'
            newSeat[id].color = 'info'
        }else{
            console.log([...selectedSeat, id])
            setSelectedSeat([...selectedSeat, id])

            newSeat[id].status = 'not-avalaible'
            newSeat[id].color = 'success'
        }

        setCarSeat(newSeat)
    }
 
    const handleSubmit = () => {
        setSeat(selectedSeat)
        setOpen(false)
    }

    if(isLoading){
        return <span></span>
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
            <DialogTitle>Pilih Kursi</DialogTitle>
            <DialogContent>
              <DialogContentText>Tekan kursi untuk memilih atau membatalkan</DialogContentText>
              <Grid container sx={{ width: "200px", height: "200px", margin: "20px" }}>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.A1.color}  ariaValueNow={0} disabled={carSeat.A1.isDisabled} id="A1" onClick={(e) => handleSeatClick(e)}>
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
                  <Button variant="contained" color={carSeat.B1.color} disabled={carSeat.B1.isDisabled} ariaValueNow={0} id="B1" onClick={(e) => handleSeatClick(e) }>
                    <EventSeatIcon />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.B2.color} ariaValueNow={0} disabled={carSeat.B2.isDisabled} id="B2" onClick={(e) => handleSeatClick(e) }>
                    <EventSeatIcon />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.B3.color} ariaValueNow={0} disabled={carSeat.B3.isDisabled} id="B3" onClick={(e) => handleSeatClick(e) }>
                    <EventSeatIcon />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.C1.color} ariaValueNow={0} disabled={carSeat.C1.isDisabled} id="C1" onClick={(e) => handleSeatClick(e) }>
                    <EventSeatIcon />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.C2.color} ariaValueNow={0} disabled={carSeat.C2.isDisabled} id="C2" onClick={(e) => handleSeatClick(e) }>
                    <EventSeatIcon />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.C3.color} ariaValueNow={0} disabled={carSeat.C3.isDisabled} id="C3" onClick={(e) => handleSeatClick(e) }>
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
                  DIPILIH
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button size="small" disabled variant="contained" color="error">
                  TIDAK DIPAKAI/TERISI
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
              <Button onClick={() => handleSubmit()}>Terapkan pilihan</Button>
            </DialogActions>
          </Dialog>
        </Modal>
      </React.Fragment>
        )
    }
}
