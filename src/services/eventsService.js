import axios from "axios";

const baseUrl = "/api/events";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getToken = () => {
  console.log(token);
};

const getEvents = async () => {
  const config = { headers: { Authorization: token } };
  const response = await axios.get(baseUrl, config);
  return response.data;
};

const create = async (credentials) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, credentials, config);
  return response.data;
};

const edit = async (credentials, id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.put(`${baseUrl}/${id}`, credentials, config);
  return response.data;
};

const remove = async (id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};

export default {
  setToken,
  getToken,
  getEvents,
  create,
  edit,
  remove,
};
