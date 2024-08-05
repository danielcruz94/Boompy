import { createSlice } from "@reduxjs/toolkit";

// Obtener la URL actual del navegador
const currentHost = window.location.hostname;

// Condicionar el valor de la URL en función del host
const initialURL =
  currentHost === "toriiapp.netlify.app"
    ? "https://torii-tau.vercel.app/api"
    : "http://localhost:3001/api";

    console.log(initialURL)

const serverURLSlice = createSlice({
  name: "serverURL",
  initialState: {
    url: initialURL,
    loading: false,
    error: null
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setURL: (state, action) => {
      state.url = action.payload;
    }
  }
});

export const { setLoading, setError, setURL } = serverURLSlice.actions;
export default serverURLSlice.reducer;
