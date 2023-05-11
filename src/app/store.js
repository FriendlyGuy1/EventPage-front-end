import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import eventReducer from '../features/events/eventSlice'
import categoryReducer from '../features/categories/categorySlice'
import favouriteReducer from '../features/favourite/favouriteSlice'
import userReducer from '../features/usercontrol/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    categories: categoryReducer,
    favourites: favouriteReducer,
    users: userReducer,
  },
})