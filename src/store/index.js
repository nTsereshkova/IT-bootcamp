import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import mainSlice from './slices/mainSlice';

const store = configureStore({
  reducer: {
    main: mainSlice.reducer,
  },
  middleware: [thunk],
});

export default store;
