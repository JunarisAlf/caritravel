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
  InputLabel,
} from "@mui/material";

import axios from "axios";
import getLocalStorage from "../../utils/getLocalStorage";
import localVar from "../../utils/localVar";

export const UpdateOrderModal = ({
  orderID,
  open,
  setOpen,
  setSnackOpen,
  setSnackAtr,
  setReFecth,
  reFetch,
}) => {

    const [adminName, setAdminName] = useState("");
    const [adminID, setAdminID] = useState("");
    const [driverID, setDriverID] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [location, setLocation] = useState([]);
    const [to, setTo] = useState("");
    const [from, setFrom] = useState("");
    const [time, setTime] = useState("");
    const [catatan, setCatatan] = useState("");


  useEffect(() => {
    let admin = getLocalStorage("user");
    axios
      .get(`${localVar.API_URL}/admin/order/${orderID}`, {
        headers: { Authorization: admin.token },
      })
      .then(function (res) {
        let resData = res.data.data;
        setAdminName(resData.Admin.name)
        setAdminID(resData.Admin.id)
        setDriverID(resData.driver_id)
        setCustomerName(resData.customer)
        setTo(resData.to.id)
        setFrom(resData.location_from.id)
        setTime(resData.departure)
        setCatatan(resData.catatan)
        console.log(resData);
      })
      .catch(function (err) {
        // let errRes = err.response.data;
        console.log(err)
      });

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
  }, []);

  const submitHandler = () => {
    let admin = getLocalStorage("user");
    axios
      .put(
        `${localVar.API_URL}/admin/order/${orderID}`,
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
        setOpen(false);
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
      <Card>
        <CardHeader subheader="Masukan data dengan sesuai!" title="Update data lokasi" />
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

            <Grid item md={12} xs={12}>
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
              setOpen(false);
            }}
            sx={{ marginRight: "10px" }}
            color="warning"
            variant="contained"
          >
            Cancel
          </Button>
          <Button onClick={submitHandler} color="primary" variant="contained">
            Simpan perubahan
          </Button>
        </Box>
      </Card>
    </form>
  );
};
