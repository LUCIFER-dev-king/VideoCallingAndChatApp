import axios from "axios";
import { API } from "../../backend";

export const signUp = (user) => {
  return axios({
    method: "post",
    url: `${API}/signup`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(user),
  })
    .then((res) => {
      if (res.status === 200) {
        console.log("signup succes");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const signIn = (user) => {
  console.log(user);
  return axios({
    method: "post",
    url: `${API}/signin`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    data: JSON.stringify(user),
  })
    .then((res) => {
      if (res.status === 200) {
        console.log("signin success", res.data);
        var user = {
          accessToken: res.data.accestoken,
          userId: res.data.dataValues.id,
          username: res.data.dataValues.username,
        };
        localStorage.setItem("user", JSON.stringify(user));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getUserFromStorage = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user"));
  } else {
    return false;
  }
};
