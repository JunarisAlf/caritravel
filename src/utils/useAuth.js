import { useState, useEffect } from "react";
import Router from "next/router";

const useAuth = ({ key, roleIs = null, roleIsNot = null, redirectTo, redirect = true }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [data, setData] = useState();
let isLoading, data;
  let res = localStorage.getItem(key);
  if (res != null) {
    res = JSON.parse(res);
    // setData(res);
    data = res;
    if (roleIs != null) {
      if (res.role === roleIs) {
        Router.push(redirectTo).catch(console.error);
      }
    }
    if (roleIsNot != null) {
      if (res.role != roleIsNot) {
        Router.push(redirectTo).catch(console.error);
      }
    }
  } else {
    if (redirect) {
      Router.push(redirectTo).catch(console.error);
    } else {
      console.log("not redirected");
    }
  }
//   setIsLoading(false);
isLoading = false
  return [isLoading, data];
};

export default useAuth;
