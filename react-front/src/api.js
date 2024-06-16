import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getCategories = () => axios.get(`${API_URL}/categories`);
export const createCategory = (category) =>
  axios.post(`${API_URL}/categories`, category);
export const updateCategory = (id, category) =>
  axios.put(`${API_URL}/categories/${id}`, category);
export const deleteCategory = (id) =>
  axios.delete(`${API_URL}/categories/${id}`);

export const getProducts = () => axios.get(`${API_URL}/products`);
export const createProduct = (product) =>
  axios.post(`${API_URL}/products`, product);
export const updateProduct = (id, product) =>
  axios.put(`${API_URL}/products/${id}`, product);
export const deleteProduct = (id) => axios.delete(`${API_URL}/products/${id}`);
