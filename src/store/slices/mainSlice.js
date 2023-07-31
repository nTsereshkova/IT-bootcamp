import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react-dom/test-utils';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    user: {},
    characters: [],
    totalPageAmount: 0,
    currentPage: 0,
    isError: false,
    error: '',
    infiniteFetchMode: true,
    showCharactersDetails: false,
    showCharacters: false,
  },

  reducers: {
    addCharacters: (state, action) => {
      state.characters = [...action.payload];
      state.showCharactersDetails = false;
    },
    addInfiniteCharacters: (state, action) => {
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
    },
    changeCurrentPage: (state, action) => {
      state.currentPage = action.payload + 1;
    },
    correctCharactersFirstEpisode: (state, action) => {
      // ожидаем id персонажа
      state.characters.map(item =>
        item.id === action.payload.id
          ? (item.episode = action.payload.episode)
          : item.episode,
      );
    },
    showCharactersDetailsHandler: (state, action) => {
      state.showCharactersDetails = action.payload;
    },
    showCharacters: (state, action) => {
      state.showCharacters = action.payload;
    },
  },
});

export default mainSlice;
