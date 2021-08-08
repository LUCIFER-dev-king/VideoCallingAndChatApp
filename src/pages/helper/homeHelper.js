import axios from "axios";
import { API } from "../../backend";

export const getUser = (id) => {
  return axios({
    method: "get",
    url: `${API}/user/${id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data);
        return res.data;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getConv = (userId) => {
  return axios({
    method: "get",
    url: `${API}/getConv/${userId}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.data.rows;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
