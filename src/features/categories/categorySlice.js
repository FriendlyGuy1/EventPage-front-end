import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

const initialState = {
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const postCategory = createAsyncThunk(
  'categories/create',
  async (categoryName, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await categoryService.postCategories(categoryName, token)
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

export const getCategories = createAsyncThunk(
  'categories/getAll',
  async (_, thunkAPI) => {
    try {
      return await categoryService.getCategories()
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

export const deleteCategory = createAsyncThunk(
  'category/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await categoryService.removeCategory(id, token)
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

export const changeACategory = createAsyncThunk(
  'categories/change',
  async (chosenId, newName, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      console.log("hi");
      return await categoryService.changeCategory(chosenId, newName, token)
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

export const categorieSlice = createSlice({
  name: 'categorie',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(postCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.events = action.payload
      })
      .addCase(postCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.categories = action.payload
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.message = action.payload
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(changeACategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changeACategory.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.categories = action.payload
      })
      .addCase(changeACategory.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  }
})

export const { reset } = categorieSlice.actions
export default categorieSlice.reducer