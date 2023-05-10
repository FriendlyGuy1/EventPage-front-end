import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import favouriteService from './favouriteService'

const initialState = {
  events: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}


// Add to Favourite events
export const postFavourite = createAsyncThunk(
  'favourite/add',
  async (eventID, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await favouriteService.postFavourite(token, eventID)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


//Get All Favourite Events
export const getFavourites = createAsyncThunk(
  'favourites/getAll',
  async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
      return await favouriteService.getFavourites(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


// Delete favourite event
export const deleteFavourite = createAsyncThunk(
  'favourite/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await favouriteService.deleteFavourite(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)


export const favouriteSlice = createSlice({
  name: 'favourite',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postFavourite.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postFavourite.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        // state.favourites.push(action.payload)
      })
      .addCase(postFavourite.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getFavourites.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFavourites.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.favourites = action.payload
      })
      .addCase(getFavourites.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteFavourite.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteFavourite.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
        // state.events = state.events.filter(
        //   (event) => event._id !== action.payload.id
        // )
      })
      .addCase(deleteFavourite.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = favouriteSlice.actions
export default favouriteSlice.reducer