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

export const getMsg = (convId) => {
  return axios({
    method: "get",
    url: `${API}/getMsg/${convId}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log(res.data);
      if (res.status === 200) {
        return res.data.rows;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const createMsg = (msg) => {
//   return axios({
//     method: "post",
//     url: `${API}/createMsg`,
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     data: JSON.stringify(msg),
//   })
//     .then((res) => {
//       if (res.status === 200) {
//         console.log("message sent");
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

export const createMsg = (msg) => {
  return axios({
    method: "post",
    url: `${API}/createMsg`,
    headers: {
      Accept: "application/json",
    },
    data: msg,
    onUploadProgress: (progress) => {
      console.log((progress.loaded / progress.total) * 100);
    },
  })
    .then((res) => {
      if (res.status === 200) {
        if (res.data.data === undefined) {
          return { ...res.data, data: null };
        } else {
          return res.data;
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
