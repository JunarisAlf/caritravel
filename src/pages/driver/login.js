"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
import NextLink from "next/link";
import Router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, TextField, Typography, Alert } from "@mui/material";
import axios from "axios";
import localVar from "../../utils/localVar";
import useAuth from "../../utils/useAuth";

const Login = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const [loading] = useAuth({
      key: "user",
      roleIs: "driver",
      redirectTo: "/driver",
      redirect: false
    });
    setIsLoading(loading);
  }, []);
  const formik = useFormik({
    initialValues: {
      waNumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      waNumber: Yup.string().required("Nomor WA tidak boleh kosong"),
      password: Yup.string().max(255).required("Password tidak boleh kosong"),
    }),
  });

  const [logErr, setLogErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleLogin = (val) => {
    console.log(val.waNumber, val.password)
   
    axios.post(`${localVar.API_URL}/driver/masuk`,{
        wa_number: val.waNumber,
        password: val.password
    })
    .then(function(res){
        let user = res.data.data;
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        Router.push("/driver").catch(console.error);
    })
    .catch(function(err){
        console.log("error", err)
        setErrMsg(err.response?.data?.message);
        setLogErr(true);
    })
        
    
  };

  if (isLoading) {
    return <></>;
  } else {
    return (
      <>
        <Head>
          <title>Masuk sebagai Driver</title>
        </Head>
        <Box
          component="main"
          sx={{
            alignItems: "center",
            display: "flex",
            flexGrow: 1,
            minHeight: "100%",
          }}
        >
          <Container maxWidth="sm">
            <form
              onSubmit={(e) => {
                handleLogin(formik.values);
                e.preventDefault();
              }}
            >
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4">
                  Sign in
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Login terlebih dahulu untuk mengakses menu driver
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Nomor WA (format 08XX)"
                margin="normal"
                name="waNumber"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.waNumber}
                variant="outlined"
              />
              <TextField
                error={Boolean(formik.touched.password && formik.errors.password)}
                fullWidth
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
              />
              <Box sx={{ py: 2 }}>
                {logErr && (
                  <Alert sx={{ my: 3 }} severity="error">
                    {errMsg}
                  </Alert>
                )}
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Masuk
                </Button>
              </Box>
            </form>
          </Container>
        </Box>
      </>
    );
  }
};

export default Login;
