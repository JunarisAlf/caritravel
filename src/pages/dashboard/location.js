import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Modal, Snackbar, Alert, } from "@mui/material";
import { LocationListResults } from "../../components/location/location-list-results";
import { LocationListToolbar } from "../../components/location/location-list-toolbar";
import SnackBar from "../../components/location/snack-bar";

import { DashboardLayout } from "../../components/dashboard-layout";
import localVar from "../../utils/localVar";
import useAuth from "../../utils/useAuth";
import getLocalStorage from "../../utils/getLocalStorage";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  let [locations, setLocations] = useState();
  const [reFetch, setReFecth] = useState(false)
  useEffect(() => {
    const [loading, admin] = useAuth({
      key: "user",
      roleIsNot: "admin",
      redirectTo: "/dashboard/login",
    });
    const token = "Bearer " + admin.token;
    axios
      .get(`${localVar.API_URL}/admin/location`, {
        headers: { Authorization: token },
      })
      .then(function (res) {
        console.log(res);
        setLocations(res.data.data);
        setIsLoading(loading);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, [reFetch]);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackAtr,setSnackAtr] =useState({})
  const snackHandleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackOpen(false);
};

  if (isLoading) {
    return <></>;
  } else {
    return (
      <DashboardLayout>
        <Head>
          <title>Dashboard | Lokasi</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <LocationListToolbar setLocations={setLocations} setSnackOpen={setSnackOpen} setSnackAtr={setSnackAtr} 
            setReFecth={setReFecth} reFetch={reFetch}
            />
            <Box sx={{ mt: 3 }}>
              <LocationListResults locations={locations} setSnackOpen={setSnackOpen} setSnackAtr={setSnackAtr} 
            setReFecth={setReFecth} reFetch={reFetch}/>
            </Box>
          </Container>
        </Box>
        <Snackbar onClose={snackHandleClose} anchorOrigin={{vertical: "top", horizontal: "center"}} open={snackOpen} autoHideDuration={2000}>
          <Alert  onClose={snackHandleClose} severity={snackAtr.type} sx={{ width: "100%" }}>
            {snackAtr?.msg}
          </Alert>
        </Snackbar>
      </DashboardLayout>
    );
  }
};

export default Page;
