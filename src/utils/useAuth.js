import { useState, useEffect } from "react";
import Router from "next/router";
import { formatRelativeWithOptions } from "date-fns/fp";

export default ({ key, roleIs = null, roleIsNot = null, redirectTo, redirect = true }) => {
  const [isLoading, setIsLoading] = useState(true);
  let data;
  useEffect(() => {
    let data = localStorage.getItem(key);
    if (data != null) {
      data = JSON.parse(data);
      if (roleIs != null) {
        if (data.role === roleIs) {
          Router.push(redirectTo).catch(console.error);
        }
      }
      if (roleIsNot != null) {
        if (data.role != roleIsNot) {
          Router.push(redirectTo).catch(console.error);
        }
      }
    }else{
        if(redirect){
            Router.push(redirectTo).catch(console.error);
        }else{
            console.log('not redirected')
        }
    }
    setIsLoading(false);
  }, [isLoading]);

  return [isLoading, data];
};
