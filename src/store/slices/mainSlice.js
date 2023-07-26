import { createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    showUserInfo: false,
    user: {},
    characters: [],
    totalPageAmount: 0,
  },
  isError: false,
  error: '',
  reducers: {
    showUserInfo: (state, action) => {
      state.showUserInfo = true;
      state.user = action.payload;
    },
    hideUserInfo: state => {
      state.showUserInfo = false;
    },
    addCharacters: (state, action) => {
      state.characters = [...action.payload];
      state.showCharactersDetails = false;
    },
    setTotalPageAmount: (state, action) => {
      state.totalPageAmount = action.payload;
    },
    mainErrorHandler: (state, action) => {
      state.error = action.payload;
      state.isError = true;
    },
  },
});

export default mainSlice;
