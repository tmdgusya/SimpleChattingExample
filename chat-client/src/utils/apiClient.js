import axios from "axios";

const domain = "http://localhost:8080/";

export const getFetch = (url, data) => {
  return axios({
    method: "GET",
    url: domain + url,
    data: data,
  });
};

export const postFetch = (url, data) => {
  return axios({
    method: "POST",
    url: domain + url,
    data: data,
  });
};
