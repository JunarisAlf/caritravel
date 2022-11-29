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
import EventSeatIcon from '@mui/icons-material/EventSeat';
import axios from "axios";
import getLocalStorage from "../../utils/getLocalStorage";
import localVar from "../../utils/localVar";

export const UpdateDriverModal = ({
  driverID,
  open,
  setOpen,
  refresh, setRefresh
}) => {
  const [price, setPrice] = useState("");
  const [carType, setCarType] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState([]);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("")
  const [seats, setSeats] = useState([])

  const [seatModal, setSeatModal] = useState(false)

  useEffect(() => {
    let driver = getLocalStorage("user");
    axios
      .get(`${localVar.API_URL}/driver/data/`, {
        headers: { Authorization: driver.token },
      })
      .then(function (res) {
        let resData = res.data.data;
        setCarType(resData.car_type);
        setPrice(resData.price);
        setTime(resData.departure);
        setFrom(resData.from.id);
        setTo(resData.to.id);
        setSeats(resData.seats)
      })
      .catch(function (err) {
        console.log(err)
      });

      axios
      .get(`${localVar.API_URL}/customer/location`)
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
    let driver = getLocalStorage("user");
    axios
      .put(
        `${localVar.API_URL}/driver/data`,
        { 
            car_type: carType,
            price: price,
            location_from: from,
            location_to: to,
            departure: time
        },
        {
          headers: { Authorization: driver.token },
        }
      )
      .then(function (res) {
        console.log('data updated')
       
      })
      .catch(function (err) {
        console.log(err)
      })
  };

  return (
    <form autoComplete="off" noValidate>


      <Card>
        <CardHeader subheader="Update Data" title="Update data anda setiap hari nya" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
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
                    <MenuItem key={t} value={t}>
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
                    <MenuItem key={loc.id} value={loc.id}>
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
                    <MenuItem key={loc.id} value={loc.id}>
                      <em>{loc.name}</em>
                    </MenuItem>
                  ))}
                </Select>
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
              setOpen(false);
            }}
            sx={{ marginRight: "10px" }}
            color="warning"
            variant="contained"
          >
            Cancel
          </Button>
          <Button onClick={ () => {
              submitHandler()
              setRefresh(!refresh)
              setOpen(false);
              }} color="primary" variant="contained">
            Simpan perubahan
          </Button>
        </Box>
      </Card>
    </form>
  );
};
