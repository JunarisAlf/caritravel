import { useState, useEffect } from "react";
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
import { v4 as uuidv4 } from "uuid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import localVar from "../../utils/localVar";
import getLocalStorage from "../../utils/getLocalStorage";
import axios from "axios";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Search as SearchIcon } from "../../icons/search";
import { Upload as UploadIcon } from "../../icons/upload";
import { Download as DownloadIcon } from "../../icons/download";
import { CreateDriverModal } from "./create-driver-modal";

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
export const DriverListToolbar = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [location, setLocation] = useState([]);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");

  const handleChangeTime = (event) => {
    setTime(event.target.value);
  };
  const handleChangeTo = (event) => {
    setTo(event.target.value);
  };
  const handleChangeFrom = (event) => {
    setFrom(event.target.value);
  };
  const searchHandler = () => {
    let admin = getLocalStorage("user");
    axios
      .get(`${localVar.API_URL}/admin/filter`, {
        headers: { Authorization: admin.token },
        params: { name: name },
      })
      .then(function (res) {
        let drivers = res.data.data;
        props.setDrivers(drivers);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  const filterHandler = () => {
    let admin = getLocalStorage("user");
    axios
      .get(`${localVar.API_URL}/admin/filter`, {
        headers: { Authorization: admin.token },
        params: { from, to, time },
      })
      .then(function (res) {
        let drivers = res.data.data;
        props.setDrivers(drivers);
      })
      .catch(function (err) {
        console.log(err);
      });
  };
  useEffect(() => {
    let admin = getLocalStorage("user");
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

  return (
    <Box>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Driver
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="primary" variant="contained" onClick={handleOpen}>
            Tambah Driver
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
          >
            <Box sx={modalStyle}>
              {/* <CreateDriverModal/> */}
              <CreateDriverModal handleClose={handleClose} setSnackOpen={props.setSnackOpen} setSnackAtr={props.setSnackAtr} setReFecth={props.setReFecth} reFetch={props.reFetch}/>
            </Box>
          </Modal>
        </Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Card>
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
                  placeholder="Cari nama driver"
                  variant="outlined"
                />
                <FormControl sx={{ marginTop: 2, minWidth: 120 }} size="medium">
                  <Button
                    onClick={searchHandler}
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<PersonSearchIcon />}
                  >
                    Cari
                  </Button>
                </FormControl>
              </Grid>
              <Grid item lg={6} sm={6} xl={6} xs={12}>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                  <Select value={time} onChange={handleChangeTime} displayEmpty>
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

                <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                  <Select value={to} onChange={handleChangeTo} displayEmpty>
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
                <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                  <Select value={from} onChange={handleChangeFrom} displayEmpty>
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
                <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                  <Button
                    onClick={filterHandler}
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
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
