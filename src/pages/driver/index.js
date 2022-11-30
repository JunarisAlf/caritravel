import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";


import axios from "axios";
import localVar from "../../utils/localVar";
import useAuth from "../../utils/useAuth";
import getLocalStorage from "../../utils/getLocalStorage";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import {UpdateDriverModal} from '../../components/account/update-driver-modal'
import UpdateSeatModal from '../../components/account/update-seat-modal'


const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  
export default function index() {
  const [refresh, setRefresh] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [driver, setDriver] = useState({});
  const [seatModal, setSeatModal] = useState(false)
  const [updateOpen,setUpdateOpen] = useState(false)
  const [carSeat, setCarSeat] = useState({
    A1:{
        id: "-",
        status: "-",
        color: "info",
        isDisabled: false
    },
    B1:{
        id: "-",
        status: "-",
        color: "info",
        isDisabled: false
    },
    B2:{
        id: "-",
        status: "-",
        color: "info",
        isDisabled: false
    },
    B3:{
        id: "-",
        status: "-",
        color: "info",
        isDisabled: false
    },
    C1:{
        id: "-",
        status: "-",
        color: "info",
        isDisabled: false
    },
    C2:{
        id: "-",
        status: "-",
        color: "info",
        isDisabled: false
    },
    C3:{
        id: "-",
        status: "-",
        color: "info",
        isDisabled: false
    }
})
  useEffect(() => {
      console.log(refresh)
    const [loading] = useAuth({
      key: "user",
      roleIsNot: "driver",
      redirectTo: "/driver/login",
    });

    let driver = getLocalStorage("user");
    axios
      .get(`${localVar.API_URL}/driver/data`, {
        headers: { Authorization: driver?.token },
      })
      .then(function (res) {
        setDriver(res.data.data);
        setIsLoading(false);

        // set seat
        let seats = res.data.data?.seats
        let driverID = res.data.data.id
        let newSeats = {}
        if(seats.length == 0 || seats == null ){
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
      })
      .catch(function (err) {
        console.log(err);
      });
    setIsLoading(loading);
  }, [refresh]);


    return (
      <div className="flex flex-col w-full items-center py-4">
        <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm w-full">
          <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{driver?.name}</h5>
          <p className="text-gray-700 text-base mb-2">
            <strong>Berangkat : </strong> {driver.departure == null ? "-" : driver.departure}
          </p>
          <p className="text-gray-700 text-base mb-2">
            <strong>Tujuan : </strong>{" "}
            {driver.to == null ? "-" : driver.to.kabupaten + " - " + driver.to.kecamatan}
          </p>
          <p className="text-gray-700 text-base mb-2">
            <strong>Berangkat dari : </strong>{" "}
            {driver.from == null ? "-" : driver.from.kabupaten + " - " + driver.from.kecamatan}
          </p>
          <p className="text-gray-700 text-base mb-2">
            <strong>Harga : </strong> Rp. {driver.price == null ? "-" : driver.price}
          </p>
          <p className="text-gray-700 text-base mb-2">
            <strong>Tipe Mobil : </strong> {driver.car_type ? driver.car_type : "-"}
          </p>
          <p className="text-gray-700 text-xl mb-2">
            <strong>Bangku: </strong>
          </p>

          <div className="mb-4">
            <Grid container sx={{ width: "200px", height: "200px", margin: "20px" }}>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.A1.color} id="A1" >
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
                  <Button variant="contained" color={carSeat.B1.color }id="B1" >
                    <EventSeatIcon />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.B2.color}  id="B2">
                    <EventSeatIcon />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.B3.color}  id="B3">
                    <EventSeatIcon />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.C1.color}  id="C1">
                    <EventSeatIcon />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.C2.color}  id="C2">
                    <EventSeatIcon />
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <Button variant="contained" color={carSeat.C3.color} id="C3">
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
          </div>

          <Modal
            open={updateOpen}
            onClose={()=> setUpdateOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <UpdateDriverModal refresh={refresh} setRefresh={setRefresh} driverID={driver.id} open={updateOpen} setOpen={setUpdateOpen}/>
            </Box>
          </Modal>
          {!isLoading &&  <UpdateSeatModal refresh={refresh} setRefresh={setRefresh} open={seatModal} setOpen={setSeatModal} seats={driver.seats} driverID={driver.id}/>}
         
          
          <Button sx={{marginRight: '10px'}} onClick={()=>setUpdateOpen(true)} variant="contained" size="medium" color="primary">
                Update Data
            </Button>
          <Button onClick={()=>setSeatModal(true)} variant="contained" size="medium"     color="warning" endIcon={<EventSeatIcon />}>
                Update Seat
            </Button>
        </div>
      </div>
    );
  
}
