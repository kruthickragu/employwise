import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/login', credentials)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    status: 'idle',
    error: null
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token')
      state.token = null
      state.status = 'idle'
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload.token
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload?.error || 'Login failed'
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer