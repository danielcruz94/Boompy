import { createSlice } from "@reduxjs/toolkit";

const serverURLSlice = createSlice({
  name: "serverURL",
  initialState: {
    url: "https://torii-tau.vercel.app/api",
    loading: false,
    error: null
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setLoading, setError } = serverURLSlice.actions;
export default serverURLSlice.reducer;
