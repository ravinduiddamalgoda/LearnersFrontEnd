import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  isAdmin: false,
  isInstructor: false,
  isStudent: false,
  message: '',
};

export const instructorRegister = createAsyncThunk(
  'auth/instructorRegister',
  async (user, thunkAPI) => {
    try {
      const response = await authService.registerInstructor(user);
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const studentRegister = createAsyncThunk(
  'auth/studentRegister',
  async (user, thunkAPI) => {
    try {
      const response = await authService.registerStudent(user);
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const adminLogin = createAsyncThunk(
  'auth/adminLogin', 
  async (user, thunkAPI) => {
  try {
    const response = await authService.adminLogin(user);
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const instructorLogin = createAsyncThunk(
  'auth/instructorLogin',
  async (user, thunkAPI) => {
    try {
      const response = await authService.instructorLogin(user);
      return response;
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const studentLogin = createAsyncThunk(
  'auth/studentLogin', 
  async (user, thunkAPI) => {
  try {
    const response = await authService.studentLogin(user);
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk(
  'auth/logout', 
  async () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(instructorRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(instructorRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isInstructor = true;
        state.user = action.payload.userId;
      })
      .addCase(instructorRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(studentRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(studentRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isStudent = true;
        state.user = action.payload.userId;
      })
      .addCase(studentRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isAdmin = true;
        state.user = action.payload.userId;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(instructorLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(instructorLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isInstructor = true;
        state.user = action.payload.userId;
      })
      .addCase(instructorLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(studentLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(studentLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isStudent = true;
        state.user = action.payload.userId;
      })
      .addCase(studentLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAdmin = false;
        state.isInstructor = false;
        state.isStudent = false;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

