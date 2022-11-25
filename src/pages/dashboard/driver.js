import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Container } from "@mui/material";
import { DriverListResults } from "../../components/driver/driver-list-results";
import { DriverListToolbar } from "../../components/driver/driver-list-toolbar";
import { DashboardLayout } from "../../components/dashboard-layout";
import localVar from "../../utils/localVar";
import useAuth from "../../utils/useAuth";
import getLocalStorage from "../../utils/getLocalStorage";

// import { drivers } from "../../__mocks__/customers";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  let [drivers, setDrivers] = useState();

  useEffect(() => {
    const [loading, admin] = useAuth({
      key: "user",
      roleIsNot: "admin",
      redirectTo: "/dashboard/login",
    });

    let token = "Bearer " + admin.token;
    axios
      .get(`${localVar.API_URL}/admin/driver`, {
        headers: { Authorization: token },
      })
      .then(function (res) {
        console.log(res);
        setDrivers(res.data.data)
        setIsLoading(loading);

      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
//   console.log(driver)
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
            <DriverListToolbar />
            <Box sx={{ mt: 3 }}>
              <DriverListResults drivers={drivers} />
            </Box>
          </Container>
        </Box>
      </DashboardLayout>
    );
  }
};

export default Page;
