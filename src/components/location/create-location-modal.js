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

export const CreateLocationModal = ({ handleClose , setSnackOpen, setSnackAtr, setReFecth, reFetch}) => {
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [catatan, setCatatan] = useState("");

  const submitHandler = () => {
    let admin = getLocalStorage("user");
    axios
      .post(
        `${localVar.API_URL}/admin/location`,
        { kabupaten, kecamatan, catatan},
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
  };

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="Masukan data dengan sesuai!" title="Tambah Lokasi" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
                <TextField
                    fullWidth
                    helperText="Masukan nama kabupaten"
                    label="Kabupaten"
                    name="kabupaten"
                    onChange={(e) => setKabupaten(e.target.value)}
                    required
                    value={kabupaten}
                    variant="outlined"
                />
            </Grid>
            <Grid item md={6} xs={12}>
                <TextField
                    fullWidth
                    helperText="Masukan nama kecamatan"
                    label="Kecamatan"
                    name="kecamatan"
                    onChange={(e) => setKecamatan(e.target.value)}
                    required
                    value={kecamatan}
                    variant="outlined"
                />
            </Grid>
            <Grid item md={6} xs={12}>
            <TextField
                fullWidth
                helperText="*optional"
                label="Note/Catatan"
                name="catatan"
                onChange={(e) => setCatatan(e.target.value)}
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
