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
import { CreateLocationModal } from "./create-location-modal";

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
export const LocationListToolbar = (props) => {
  const [open, setOpen] = useState(false);
  const [locationName, setLocationName]= useState('')

  const searchHandler = () => {
    let admin = getLocalStorage("user");
    axios
      .get(`${localVar.API_URL}/admin/location/search`, {
        headers: { Authorization: admin.token },
        params: { name: locationName },
      })
      .then(function (res) {
        let locations = res.data.data;
        props.setLocations(locations);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

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
          Lokasi
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="primary" variant="contained" onClick={()=> setOpen(true)}>
            Tambah Lokasi
          </Button>
          <Modal
            open={open}
            onClose={()=> setOpen(false)}
          >
            <Box sx={modalStyle}>
              <CreateLocationModal handleClose={setOpen} setSnackOpen={props.setSnackOpen} setSnackAtr={props.setSnackAtr} setReFecth={props.setReFecth} reFetch={props.reFetch}/>
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
                  value={locationName}
                  onChange={(e) => setLocationName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Cari lokasi"
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
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
