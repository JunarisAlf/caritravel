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
import { CreateOrderModal } from "./create-order-modal";

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
export const OrderListToolbar = (props) => {
  const [open, setOpen] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [driverName, setDriverName] = useState("");

  const searchAdminHandler = () => {
    let admin = getLocalStorage("user");
    axios
      .get(`${localVar.API_URL}/admin/order/search`, {
        headers: { Authorization: admin.token },
        params: {admin: adminName },
      })
      .then(function (res) {
        let orders = res.data.data;
        props.setOrders(orders);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  const searchDriverHandler = () => {
    let admin = getLocalStorage("user");
    axios
      .get(`${localVar.API_URL}/admin/order/search`, {
        headers: { Authorization: admin.token },
        params: {driver: driverName },
      })
      .then(function (res) {
        let orders = res.data.data;
        props.setOrders(orders);
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
          Order
        </Typography>
        <Box sx={{ m: 1 }}>
          <Button color="primary" variant="contained" onClick={() => setOpen(true)}>
            Tambah Order
          </Button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={modalStyle}>
              <CreateOrderModal
                handleClose={setOpen}
                setSnackOpen={props.setSnackOpen}
                setSnackAtr={props.setSnackAtr}
                setReFecth={props.setReFecth}
                reFetch={props.reFetch}
              />
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
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Cari berdasarkan admin"
                  variant="outlined"
                />
                <FormControl sx={{ marginTop: 2, minWidth: 120 }} size="medium">
                  <Button
                    onClick={searchAdminHandler}
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
                <TextField
                  fullWidth
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
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
                <FormControl sx={{ marginTop: 2, minWidth: 120 }} size="medium">
                  <Button
                    onClick={searchDriverHandler}
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
