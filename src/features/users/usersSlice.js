import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page) => {
    const response = await api.get(`/users?page=${page}`)
    return {
      data: response.data.data,
      totalPages: response.data.total_pages
    }
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId) => {
    await api.delete(`/users/${userId}`)
    return userId
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, ...userData }) => {
    const response = await api.put(`/users/${id}`, userData)
    return response.data
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    totalPages: 1
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload.data
        state.totalPages = action.payload.totalPages
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.data = state.data.filter(user => user.id !== action.payload)
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.data.findIndex(user => user.id === action.payload.id)
        if (index !== -1) {
          state.data[index] = action.payload
        }
      })
  }
})

export default usersSlice.reducer