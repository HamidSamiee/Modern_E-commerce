import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

// API Base URL
const API_BASE_URL = "http://localhost:5000/api/newsletter";

// Async Thunks for API requests
export const subscribeToNewsletter = createAsyncThunk(
  "newsletter/subscribe",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/subscribe`, { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to subscribe");
    }
  }
);

export const unsubscribeFromNewsletter = createAsyncThunk(
  "newsletter/unsubscribe",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/unsubscribe`, { data: { email } });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to unsubscribe");
    }
  }
);

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState: {
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    // Subscribe
    builder.addCase(subscribeToNewsletter.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(subscribeToNewsletter.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
      if(state.successMessage){
        toast.success(state.successMessage)
      }
    });
    builder.addCase(subscribeToNewsletter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.info(state.error )
    });

    // Unsubscribe
    builder.addCase(unsubscribeFromNewsletter.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    });
    builder.addCase(unsubscribeFromNewsletter.fulfilled, (state, action) => {
      state.loading = false;
      state.successMessage = action.payload.message;
    });
    builder.addCase(unsubscribeFromNewsletter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearMessages } = newsletterSlice.actions;
export default newsletterSlice.reducer;
