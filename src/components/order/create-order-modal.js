import { useState, useEffect} from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography
} from "@mui/material";
import EventSeatIcon from '@mui/icons-material/EventSeat';
import UpdateSeatModal from "./update-seat-modal";

import axios from "axios";
import getLocalStorage from "../../utils/getLocalStorage";
import localVar from "../../utils/localVar";

export const CreateOrderModal = ({ handleClose , setSnackOpen, setSnackAtr, setReFecth, reFetch}) => {
    const [seatModal, setSeatModal] = useState(false)
    let [seat, setSeat] = useState({})

    const [adminName, setAdminName] = useState("");
    const [adminID, setAdminID] = useState("");
    const [driverID, setDriverID] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [location, setLocation] = useState([]);
    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [time, setTime] = useState("");
    const [catatan, setCatatan] = useState("");

    useEffect(()=> {
        let admin = getLocalStorage("user");
        setAdminID(admin.id)
        setAdminName(admin.user)
        
        // get location
        axios
        .get(`${localVar.API_URL}/admin/location`, {
          headers: { Authorization: admin.token },
        })
        .then(function (res) {
          let locs = res.data.data;
          locs = locs.map((loc) => {
            return { id: loc.id, name: loc.kabupaten + " - " + loc.kecamatan };
          });
          setLocation(locs);
        })
        .catch(function (err) {
          console.log(err);
        });
    })
  const submitHandler = () => {
    let admin = getLocalStorage("user");
    try{
        axios
      .post(
        `${localVar.API_URL}/admin/order`,
        { 
            admin_id: adminID,
            driver_id: driverID,
            customer: customerName,
            destination: to,
            from: from,
            catatan: catatan,
            departure: time,
        },
        {
          headers: { Authorization: admin.token },
        }
      )
      .then(function (res) {
        let resData = res.data;
        handleClose()
        setSnackAtr({msg: resData.message, type: 'success'})
        setSnackOpen(true)
        setReFecth(!reFetch)
        // console.log(resData);
      })
      .catch(function (err) {
        let errRes = err.response.data
        setSnackAtr({msg: errRes.message, type: 'error'})
        setSnackOpen(true)
      });

      axios
          .put(`${localVar.API_URL}/admin/driver-seat/${driverID}`, {
                seats: seat
          },
          {
            headers: { Authorization: admin.token},
          })
          .then(function (res) {
            let resData = res.data;
            console.log('succes update seat',resData)
            // setOpen(false);
            // setSnackAtr({ msg: resData.message, type: "success" });
            // setSnackOpen(true);
            // setReFecth(!reFetch);
          })
          .catch(function (err) {
            console.log(err)
            // let errRes = err.response.data;
            // setSnackAtr({ msg: errRes.message, type: "error" });
            // setSnackOpen(true);
          });
    }catch(err){
        console.log('catch block:',err)
    }
    
  };

  return (
    <form autoComplete="off" noValidate>
         <UpdateSeatModal open={seatModal} setOpen={setSeatModal} driverID={driverID} setSeat={setSeat}/>
      <Card>
        <CardHeader subheader="Masukan data dengan sesuai!" title="Tambah Order" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            
            <Grid item md={6} xs={12}>
                <TextField
                    fullWidth
                    helperText="Masukan nama admin"
                    label="Admin"
                    name="admin"
                    required
                    disabled
                    value={adminName}
                    variant="outlined"
                />
            </Grid>

            <Grid item md={6} xs={12}>
                <TextField
                    fullWidth
                    helperText="PASTIKAN ID DRIVER DI ISI DENGAN BENAR"
                    label="Driver ID"
                    name="driverID"
                    onChange={(e) => setDriverID(e.target.value)}
                    required
                    value={driverID}
                    variant="outlined"
                />
            </Grid>

            <Grid item md={6} xs={12}>
                <TextField
                    fullWidth
                    helperText="Masukan nama pelanggan"
                    label="Nama pelanggan"
                    name="customerName"
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                    value={customerName}
                    variant="outlined"
                />
            </Grid>

            <Grid item md={6} xs={12}>
                <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }} size="large">
                <InputLabel id="time-label">Waktu</InputLabel>
                    
                    <Select labelId="time-label" label="waktu" value={time} onChange={(e) => setTime(e.target.value)} displayEmpty>
                    
                    {localVar.TIME.map((t) => (
                        <MenuItem key={t} value={t}>
                        <em>{t}</em>
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl sx={{ m: 1, minWidth: 120, width: '100%'}} size="large">
              <InputLabel id="from-label">Asal</InputLabel>
                <Select  labelId="from-label" value={from} onChange={(e) => setFrom(e.target.value)} label="Asal"displayEmpty>
                  
                  {location.map((loc) => (
                    <MenuItem key={loc.id} value={loc.id}>
                      <em>{loc.name}</em>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
              <FormControl sx={{ m: 1, minWidth: 120 ,width: '100%'}} size="large" >
              <InputLabel id="from-label">Tujuan</InputLabel>
                <Select labelId="from-label"  value={to} onChange={(e) => setTo(e.target.value)} label="Tujuan" displayEmpty>
                  
                  {location.map((loc) => (
                    <MenuItem key={loc.id} value={loc.id}>
                      <em>{loc.name}</em>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item md={6} xs={12}>
                <TextField
                    fullWidth
                    helperText="Masukan catatan *optional"
                    label="Catatan"
                    name="catatan"
                    onChange={(e) => setCatatan(e.target.value)}
                    required
                    value={catatan}
                    variant="outlined"
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <FormControl sx={{ m: 1, minWidth: 120}} size="large">
                    <Button onClick={()=> setSeatModal(true)} variant="contained" size="large" color="warning" endIcon={<EventSeatIcon />}>
                        Pilih Seat
                    </Button>
                    <Typography variant="caption" display="block" gutterBottom>
                        Masukan ID Driver terlebih dahulu sebelum memilih seat
                    </Typography>
                </FormControl>
                
            </Grid>

          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button
            onClick={() => {
                handleClose()
                
            }}
            sx={{ marginRight: "10px" }}
            color="warning"
            variant="contained"
          >
            Cancel
          </Button>
          <Button onClick={submitHandler} color="primary" variant="contained">
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};
