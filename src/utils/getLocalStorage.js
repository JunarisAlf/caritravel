import { useState, useEffect } from "react";

export default (key) => {
  const [data, setData] = useState();
  let res = localStorage.getItem(key);
  res != null ? setData(JSON.parse(res)) : setData(null);

  return data;
};
