import axios from 'axios'

const API_URL = '/api/user/'

// List user
const listUsers = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL + 'list', config)
    return response.data
}

// Delete user
const removeUser = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + `remove/${id}`, config)
  return response.data
}
const userService = {
    listUsers,
    removeUser,
}

export default userService