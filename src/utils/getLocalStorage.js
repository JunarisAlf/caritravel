
export default (key) => {
  let data;
  let res = localStorage.getItem(key);
  res != null ? (data = JSON.parse(res)) : (data = null);
data.token = "Bearer " + data.token
  return data;
};
