import {useState, useEffect} from 'react'
import axios from "axios";
import localVar from "../../utils/localVar";
import useAuth from "../../utils/useAuth";

export default function index() {
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const [loading] = useAuth({
      key: "user",
      roleIsNot: "driver",
      redirectTo: "driver/login",
    });
    setIsLoading(loading);
  }, [])
  return (
    <div>index</div>
  )
}
