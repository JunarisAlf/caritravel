import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container, Modal, Snackbar, Alert } from "@mui/material";
import { DriverListResults } from "../../components/driver/driver-list-results";
import { DriverListToolbar } from "../../components/driver/driver-list-toolbar";
import SnackBar from "../../components/driver/snack-bar";

import { DashboardLayout } from "../../components/dashboard-layout";
import localVar from "../../utils/localVar";
import useAuth from "../../utils/useAuth";
import getLocalStorage from "../../utils/getLocalStorage";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  let [drivers, setDrivers] = useState();
  const [reFetch, setReFecth] = useState(false)
  useEffect(() => {
    const [loading, admin] = useAuth({
      key: "user",
      roleIsNot: "admin",
      redirectTo: "/dashboard/login",
    });
    const token = "Bearer " + admin.token;
    axios
      .get(`${localVar.API_URL}/admin/driver`, {
        headers: { Authorization: token },
      })
      .then(function (res) {
        console.log(res);
        setDrivers(res.data.data);
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
          <title>Dashboard | Driver</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <DriverListToolbar setDrivers={setDrivers} setSnackOpen={setSnackOpen} setSnackAtr={setSnackAtr} 
            setReFecth={setReFecth} reFetch={reFetch}
            />
            <Box sx={{ mt: 3 }}>
              <DriverListResults drivers={drivers} />
            </Box>
          </Container>
        </Box>
        <Snackbar onClose={snackHandleClose} anchorOrigin={{vertical: "top", horizontal: "center"}} open={snackOpen} autoHideDuration={2000}>
          <Alert  onClose={snackHandleClose} severity={snackAtr.type} sx={{ width: "100%" }}>
            {snackAtr.msg}
          </Alert>
        </Snackbar>
      </DashboardLayout>
    );
  }
};

export default Page;
