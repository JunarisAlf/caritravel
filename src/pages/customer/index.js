import React from "react";
import {
  Grid,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  Modal,
} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import localVar from "../../utils/localVar";
import getLocalStorage from "../../utils/getLocalStorage";
import axios from "axios";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Search as SearchIcon } from "../../icons/search";
import FormControl from "@mui/material/FormControl";
import UpdateSeatModal from "../../components/customer/update-seat-modal";
import OrderConfirmationModal from "../../components/customer/order-confirmation-modal";

export default function () {
  const [drivers, setDrivers] = React.useState([]);
  const [name, setName] = React.useState("");
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [time, setTime] = React.useState("");
  let [location, setLocation] = React.useState([]);

  const [confirModal, setConfirModal] = React.useState(false)
  let [driverDetail, setDriverDetail] = React.useState()
  const [open, setOpen] = React.useState(false);
  let [seat, setSeat] = React.useState([]); //selected seat
  const [driverID, setDriverID] = React.useState(1);
  React.useEffect(() => {
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

  const searchName = () => {
    axios
      .get(`${localVar.API_URL}/customer/filter`, {
        params: { name },
      })
      .then(function (res) {
        let searchRes = res.data.data;
        setDrivers(searchRes);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const searchFilter = () => {
    axios
      .get(`${localVar.API_URL}/customer/filter`, {
        params: { from, to, time },
      })
      .then(function (res) {
        let searchRes = res.data.data;
        setDrivers(searchRes);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  const makeOrder = () => {
      
  }
  return (
    <div>
      <CardContent>
        <Grid container spacing={3} sx={{ alignItems: "center" }}>
          <Grid item lg={6} sm={6} xl={6} xs={12}>
            <TextField
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon color="action" fontSize="small">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder="Cari berdasarkan nama driver"
              variant="outlined"
            />
            <FormControl className="w-[100%]" sx={{ marginTop: 2, minWidth: 120 }} size="medium">
              <Button
                onClick={searchName}
                variant="contained"
                color="primary"
                size="large"
                endIcon={<PersonSearchIcon />}
              >
                Cari
              </Button>
            </FormControl>
          </Grid>

          <Grid container item lg={6} sm={6} xl={6} xs={12}>
            <Grid item lg={4} sm={4} xs={12}>
              <FormControl className="w-[100%]" sx={{ m: 1, minWidth: 120 }} size="medium">
                <Select value={time} onChange={(e) => setTime(e.target.value)} displayEmpty>
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
            <Grid item lg={4} sm={4} xs={12}>
              <FormControl className="w-[100%]" sx={{ m: 1, minWidth: 120 }} size="medium">
                <Select value={to} onChange={(e) => setTo(e.target.value)} displayEmpty>
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
            <Grid item lg={4} sm={4} xs={12}>
              <FormControl className="w-[100%]" sx={{ m: 1, minWidth: 120 }} size="medium">
                <Select value={from} onChange={(e) => setFrom(e.target.value)} displayEmpty>
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
            <Grid item lg={12} sm={12} xs={12}>
              <FormControl className="w-[100%]" sx={{ m: 1, minWidth: 120 }} size="medium">
                <Button
                  onClick={searchFilter}
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<PersonSearchIcon />}
                >
                  Cari
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>

      {driverDetail && <OrderConfirmationModal open={confirModal} setOpen={setConfirModal} driver={driverDetail} selectedSeat={seat} />}

      <UpdateSeatModal open={open} setOpen={setOpen} driverID={driverID} setSeat={setSeat} />
    
      <div className="flex justify-center items-center flex-col lg:flex-row w-full gap-4">
        {drivers.length == 0 && <span> Driver tidak ditemuakn </span>}
        {drivers.map((driver) => (
          <div key={driver.id} className="block p-6 rounded-lg shadow-lg bg-white max-w-sm w-full">
            <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">{driver.name}</h5>
            <p className="text-gray-700 text-base mb-2">
              <strong>Berangkat : </strong> {driver.departure}
            </p>
            <p className="text-gray-700 text-base mb-2">
              <strong>Tujuan : </strong> {driver.to.kabupaten + ' - ' + driver.to.kecamatan}
            </p>
            <p className="text-gray-700 text-base mb-2">
              <strong>Berangkat dari : </strong> {driver.from.kabupaten + ' - ' + driver.from.kecamatan}
            </p>
            <p className="text-gray-700 text-base mb-2">
              <strong>Harga : </strong> Rp. {driver.price}
            </p>
            <p className="text-gray-700 text-base mb-2">
              <strong>Tipe Mobil : </strong> {driver.car_type ? driver.car_type : '-' }
            </p>
            <button
              onClick={() => {
                setOpen(true);
                setDriverID(driver.id);
              }}
              type="button"
              className=" inline-block mb-4 mr-5 px-6 py-2.5 bg-yellow-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-600 active:shadow-lg transition duration-150 ease-in-out"
            >
              Pilih Kursi
            </button>

            <button
              onClick={() => {setDriverDetail(driver) ; setConfirModal(true)}}
              type="button"
              className=" inline-block mb-4 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-800 hover:shadow-lg focus:bg-blue-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Pesan Travel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
