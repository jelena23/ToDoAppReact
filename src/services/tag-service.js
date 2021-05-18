import Axios from "axios";

const API_URL = "http://localhost:8080/api";

export const createTag = async (newTag) => {
  try {
    const { data } = await Axios.post(`${API_URL}/tag`, newTag);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAll = async () => {
  try {
    const { data } = await Axios.get(`${API_URL}/tag`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTagsWithTodos = async () => {
  try {
    const { data } = await Axios.get(`${API_URL}/tag/all`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTag = async (id) => {
  try {
    const { data } = await Axios.delete(`${API_URL}/tag/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOne = async (id) => {
  try {
    const { data } = await Axios.get(`${API_URL}/tag/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};
