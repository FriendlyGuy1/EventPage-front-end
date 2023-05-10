import axios from 'axios'

const API_URL = '/api/favorites/'

// Post favourite event
const postFavourite = async (token, eventID) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.post(API_URL, {eventID: eventID}, config)
  return response.data
}


// Get all favourite events
const getFavourites = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL, config)
    return response.data
  }


// Delete favourite event
const deleteFavourite = async (favouriteEventID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + favouriteEventID, config)
  return response.data
}


const favouriteService = {
    getFavourites,
    postFavourite,
    deleteFavourite
}

export default favouriteService