import axios from 'axios';

const API_GET = '/api/categories/'
const API_SEND = '/api/categories/'

const getCategories = async () => {

  const response = await axios.get(API_GET)

  return response.data
}

const postCategories = async (category, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_SEND, category, config)

  return response.data
}

const removeCategory = async (id, token) => {
  const API_REMOVE = `/api/categories/${id}`

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_REMOVE, config)
  return response.data


}

const changeCategory = async (chosenId, newName, token) => {
  const API_UPDATE = `/api/categories/${chosenId}`

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  console.log(API_UPDATE);
  console.log(chosenChangeCategoryName);

  const response = await axios.put(API_UPDATE, newName, config)
  return response


}

const categoryService = {
  getCategories,
  postCategories,
  removeCategory,
  changeCategory
}
export default categoryService