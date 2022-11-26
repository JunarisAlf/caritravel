import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

import axios from "axios";
import getLocalStorage from "../../utils/getLocalStorage";
import localVar from "../../utils/localVar";

export const CreateDriverModal = ({ handleClose , setSnackOpen, setSnackAtr, setReFecth, reFetch}) => {
  const [password, setPassword] = useState("");
  const [carType, setCarType] = useState("");
  const [waNumber, setWaNumber] = useState("");
  const [fullName, setFullName] = useState("");

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
        handleClose()
        setSnackAtr({msg: resData.message, type: 'success'})
        setSnackOpen(true)
        setReFecth(!reFetch)
        console.log(resData);
      })
      .catch(function (err) {
        let errRes = err.response.data
        setSnackAtr({msg: errRes.message, type: 'error'})
        setSnackOpen(true)
      });
  };

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="Masukan data dengan sesuai!" title="Tambah Driver" />
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
                helperText="Pastikan password sudah benar"
                label="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                value={password}
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
