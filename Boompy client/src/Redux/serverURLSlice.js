import { createSlice } from "@reduxjs/toolkit";

// Obtener la URL actual del navegador
const currentHost = window.location.hostname;

// Condicionar el valor de la URL en función del host

const initialURL = currentHost.includes("torii.com.co")
? "https://torii-tau.vercel.app/api"
: "https://torii-tau.vercel.app/api";

// http://localhost:3001/api
   
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
      console.log("URL",initialURL)
    },
    setError: (state, action) => {
      state.error = action.payload;
      
    },
    setURL: (state, action) => {
      state.url = action.payload;
      console.log("URL",initialURL)
    }
  }
});

export const { setLoading, setError, setURL } = serverURLSlice.actions;
export default serverURLSlice.reducer;
