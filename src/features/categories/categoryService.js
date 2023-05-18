import axios from 'axios';

const API_URL = process.env.NODE_ENV === "production" ? "https://eventpage.onrender.com/api/categories/" : '/api/categories/'

const getCategories = async () => {

  const response = await axios.get(API_URL)

  return response.data
}

const postCategories = async (category, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, category, config)

  return response.data
}

const removeCategory = async (id, token) => {
  const API_REMOVE = process.env.NODE_ENV === "production" ? `https://eventpage.onrender.com/api/categories/${id}` : `/api/categories/${id}`
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_REMOVE, config)
  return response.data


}

const changeCategory = async (id, changes, token) => {
  const API_UPDATE = process.env.NODE_ENV === "production" ? `https://eventpage.onrender.com/api/categories/${id}` : `/api/categories/${id}`
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_UPDATE, changes, config)
  return response.data


}

const categoryService = {
  getCategories,
  postCategories,
  removeCategory,
  changeCategory
}
export default categoryService