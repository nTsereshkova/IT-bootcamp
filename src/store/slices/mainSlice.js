import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    showUserInfo: false,
    user: {},
    characters: [],
    totalPageAmount: 0,
    currentPage: 0,
    isError: false,
    error: '',
    infiniteFetchMode: true,
  },

  reducers: {
    addCharacters: (state, action) => {
      console.log('add charecters', action.payload);
      state.characters = [...action.payload];
      state.showCharactersDetails = false;
    },
    addInfiniteCharacters: (state, action) => {
      console.log(action.payload, 'from addInfiniteCharacters ');
      state.characters = state.characters.concat(action.payload);
      state.showCharactersDetails = false;
    },
    setTotalPageAmount: (state, action) => {
      state.totalPageAmount = action.payload;
    },
    mainErrorHandler: (state, action) => {
      state.error = action.payload;
      state.isError = true;
    },
    infiniteFetchModeHandler: state => {
      state.infiniteFetchMode = !state.infiniteFetchMode;
      // state.currentPage = 0;
    },
    changeCurrentPage: (state, action) => {
      console.log('changeCurrentPage', action.payload);
      state.currentPage = action.payload + 1;
    },
  },
});

export default mainSlice;
