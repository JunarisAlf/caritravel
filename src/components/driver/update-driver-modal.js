import { useState, useEffect } from "react";
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
  Select,
  MenuItem,
  InputLabel
} from "@mui/material";
import LockOpenIcon from '@mui/icons-material/LockOpen';
import EventSeatIcon from '@mui/icons-material/EventSeat';
import { v4 as uuidv4 } from "uuid";
import UpdatePasswordModal from "./update-password-modal";
import UpdateSeatModal from "./update-seat-modal";

import axios from "axios";
import getLocalStorage from "../../utils/getLocalStorage";
import localVar from "../../utils/localVar";

export const UpdateDriverModal = ({
  driverID,
  handleClose,
  setSnackOpen,
  setSnackAtr,
  setReFecth,
  reFetch,
}) => {
  const [password, setPassword] = useState("");
  const [price, setPrice] = useState("");
  const [carType, setCarType] = useState("");
  const [waNumber, setWaNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState([]);
  const [name, setName] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");

  const [pwModal, setPwModal] = useState(false)
  const [seatModal, setSeatModal] = useState(false)

  useEffect(() => {
    let admin = getLocalStorage("user");
    axios
      .get(`${localVar.API_URL}/admin/driver/${driverID}`, {
        headers: { Authorization: admin.token },
      })
      .then(function (res) {
        let resData = res.data.data;
        setFullName(resData.name);
        setWaNumber(resData.wa_number);
        setCarType(resData.car_type);
        setPrice(resData.price);
        setTime(resData.departure);
        setFrom(resData.from.id);
        setTo(resData.to.id);
        console.log(resData);
      })
      .catch(function (err) {
        let errRes = err.response.data;
      });
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
  }, []);
  const submitHandler = () => {
    let admin = getLocalStorage("user");
    axios
      .post(
        `${localVar.API_URL}/admin/driver`,
        { name: fullName, wa_number: waNumber, password: password, car_type: carType },
        {
          headers: { Authorization: admin.token },
        }
      )
      .then(function (res) {
        let resData = res.data;
        handleClose();
        setSnackAtr({ msg: resData.message, type: "success" });
        setSnackOpen(true);
        setReFecth(!reFetch);
      })
      .catch(function (err) {
        let errRes = err.response.data;
        setSnackAtr({ msg: errRes.message, type: "error" });
        setSnackOpen(true);
      });
  };

  return (
    <form autoComplete="off" noValidate>
        <UpdatePasswordModal open={pwModal} setOpen={setPwModal}/>
        <UpdateSeatModal open={seatModal} setOpen={setSeatModal}/>

      <Card>
        <CardHeader subheader="Masukan data dengan sesuai!" title="Update Data Driver" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Masukan nama lengkap driver"
                label="Nama Lengkap"
                name="fullName"
                onChange={(e) => setFullName(e.target.value)}
                required
                value={fullName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Gunakan format +628"
                label="Nomor WA"
                name="waNumber"
                onChange={(e) => setWaNumber(e.target.value)}
                required
                value={waNumber}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="*optional"
                label="Tipe/Model Mobil"
                name="carType"
                onChange={(e) => setCarType(e.target.value)}
                value={carType}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText=""
                label="harga"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                required
                value={price}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl sx={{ m: 1, minWidth: 120, width: '100%' }} size="large">
              <InputLabel id="time-label">Waktu</InputLabel>
                  
                <Select labelId="time-label" label="waktu" value={time} onChange={(e) => setTime(e.target.value)} displayEmpty>
                  <MenuItem value="" disabled>
                    <em>Waktu</em>
                  </MenuItem>
                  {localVar.TIME.map((t) => (
                    <MenuItem key={uuidv4()} value={t}>
                      <em>{t}</em>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl sx={{ m: 1, minWidth: 120 ,width: '100%'}} size="large" >
              <InputLabel id="from-label">Tujuan</InputLabel>
                <Select labelId="from-label"  value={to} onChange={(e) => setTo(e.target.value)} label="Tujuan" displayEmpty>
                  <MenuItem value="" disabled>
                    <em>Tujuan</em>
                  </MenuItem>
                  {location.map((loc) => (
                    <MenuItem key={uuidv4()} value={loc.id}>
                      <em>{loc.name}</em>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl sx={{ m: 1, minWidth: 120, width: '100%'}} size="large">
              <InputLabel id="from-label">Asal</InputLabel>
                <Select  labelId="from-label" value={from} onChange={(e) => setFrom(e.target.value)} label="Asal"displayEmpty>
                  <MenuItem value="" disabled>
                    <em>Asal</em>
                  </MenuItem>
                  {location.map((loc) => (
                    <MenuItem key={uuidv4()} value={loc.id}>
                      <em>{loc.name}</em>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
            <FormControl sx={{ m: 1, minWidth: 120}} size="large">
                <Button onClick={()=>setPwModal(true)} variant="contained" size="large" endIcon={<LockOpenIcon />}>
                    Ubah Password
                </Button>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120}} size="large">
                <Button onClick={()=>setSeatModal(true)} variant="contained" size="large" color="warning" endIcon={<EventSeatIcon />}>
                    Update Seat
                </Button>
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
              handleClose();
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
