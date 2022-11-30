
export default (key) => {
  let data;
  let res = localStorage.getItem(key);
  if (res != null ){
    data = JSON.parse(res)
    data.token = "Bearer " + data?.token
  }else{
    data = null
  }
  
  return data;
};
