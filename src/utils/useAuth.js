import { useState, useEffect } from "react";
import Router from "next/router";

export default ({ key, roleIs = null, roleIsNot = null, redirectTo }) => {
  const [isLoading, setIsLoading] = useState(true);
  let data;
  useEffect(() => {
    let data = localStorage.getItem(key);
    if (data != null || data != undifined) {
      data = JSON.parse(data);
      if (roleIs !== null) {
        if (data.role === roleIs) {
          Router.push(redirectTo).catch(console.error);
        }
      }
      if (roleIsNot !== null) {
        if (data.role !== roleIsNot) {
          Router.push(redirectTo).catch(console.error);
        }
      }
    }
    setIsLoading(false);
  }, [isLoading]);

  return [isLoading, data];
};
