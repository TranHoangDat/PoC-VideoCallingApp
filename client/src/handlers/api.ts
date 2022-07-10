import axios from "axios";

export const signUp = (values: any) =>
  axios.post(`${process.env.REACT_APP_API_HOST}/signup`, values, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      withCredentials: true,
    },
  });

export const login = (values: any) =>
  axios.post(`${process.env.REACT_APP_API_HOST}/login`, values, {
    headers: {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      withCredentials: true,
    },
  });
