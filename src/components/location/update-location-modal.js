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

export const UpdateLocationModal = ({
  locID,
  open,
  setOpen,
  setSnackOpen,
  setSnackAtr,
  setReFecth,
  reFetch,
}) => {
  const [kabupaten, setKabupaten] = useState("");
  const [kecamatan, setKecamatan] = useState("");
  const [catatan, setCatatan] = useState("");

  useEffect(() => {
    let admin = getLocalStorage("user");
    axios
      .get(`${localVar.API_URL}/admin/location/${locID}`, {
        headers: { Authorization: admin.token },
      })
      .then(function (res) {
        let resData = res.data.data;
        setKabupaten(resData.kabupaten);
        setKecamatan(resData.kecamatan);
        setCatatan(resData.catatan);
      })
      .catch(function (err) {
        // let errRes = err.response.data;
        console.log(err);
      });
  }, []);

  const submitHandler = () => {
    let admin = getLocalStorage("user");
    axios
      .put(
        `${localVar.API_URL}/admin/location/${locID}`,
        {
          kabupaten: kabupaten,
          kecamatan: kecamatan,
          catatan: catatan,
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
                helperText="Masukan nama kabupaten, pastikan nama sudah benar"
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
                helperText="Masukan nama kecamatan, pastikan nama sudah benar"
                label="Kecamatan"
                name="kecamatan"
                onChange={(e) => setKecamatan(e.target.value)}
                required
                value={kecamatan}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
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
