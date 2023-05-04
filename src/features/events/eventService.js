import axios from 'axios'

const API_URL = '/api/events/'

// Create new event
const createEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.post(API_URL, eventData, config)

  return response.data
}


// Get all events
export const getEvents = async () => {
  const response = await axios.get(API_URL)
  return response.data
}


// Get user events
const getUserEvents = async (token, userId) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  let userEvents = []

  for(let i = 0; i < response.data.length; i++) {
    if(response.data[i].user === userId) {
      userEvents.push(response.data[i])
    }
  }
  return userEvents
}


// Delete user event
const deleteEvent = async (eventId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + eventId, config)

  return response.data
}


// Update user event
const updateEvent = async (eventData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + eventData._id, eventData, config);

  return response.data;
};


const eventService = {
  createEvent,
  getEvents,
  getUserEvents,
  deleteEvent,
  updateEvent
}

export default eventService