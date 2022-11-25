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
      roleIs: "admin",
      redirectTo: "/dashboard",
      redirect: false,
    });
    setIsLoading(loading);
  }, []);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Username is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
  });

  const [logErr, setLogErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleLogin = (val) => {
    axios
      .post(`${localVar.API_URL}/admin/login`, {
        username: val.username,
        password: val.password,
      })
      .then(function (response) {
        let user;
        if (response.data.success) {
          user = response.data.data;
          console.log(user);
          localStorage.setItem("user", JSON.stringify(user));
          //   signIn({ role: "admin" });
          Router.push("/dashboard").catch(console.error);
        } else {
          setErrMsg(response.data.message);
          setLogErr(true);
        }
      })
      .catch(function (error) {
        setLogErr(true);
      });
  };

  if (isLoading) {
    return <></>;
  } else {
    return (
      <>
        <Head>
          <title>Masuk sebagai admin</title>
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
                e.preventDefault();
                handleLogin(formik.values);
              }}
            >
              <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4">
                  Sign in
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Login terlebih dahulu untuk mengakses dashboard
                </Typography>
              </Box>

              <TextField
                fullWidth
                label="Username"
                margin="normal"
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="text"
                value={formik.values.username}
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
                  disabled={formik.isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign In Now
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
