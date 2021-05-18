import Axios from "axios";

const API_URL = "http://localhost:8080/api";

export const create = async (newTodo) => {
  try {
    const { data } = await Axios.post(`${API_URL}/todo`, newTodo);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createTodoWithTags = async (newTodo) => {
  try {
    const { data } = await Axios.post(`${API_URL}/todo/create`, newTodo);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const get = async (id) => {
  try {
    const { data } = await Axios.get(`${API_URL}/todo${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const update = async (id, updatedTodo) => {
  try {
    const { data } = await Axios.put(`${API_URL}/todo/${id}`, updatedTodo);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (id) => {
  try {
    const { data } = await Axios.delete(`${API_URL}/todo/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteAll = async () => {
  try {
    const { data } = await Axios.delete(`${API_URL}/todo`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const findByUser = async (userId) => {
  try {
    const { data } = await Axios.get(`${API_URL}/todo`, {
      params: { userId: userId },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const findByUserWithTags = async (userId) => {
  try {
    const { data } = await Axios.get(`${API_URL}/todo/all`, {
      params: { userId: userId },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// export default TodoService;
