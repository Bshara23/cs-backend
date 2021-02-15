import {createSlice} from '@reduxjs/toolkit';

export const global = createSlice({
  name: 'global',
  initialState: {
    currentUser: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const {
  setCurrentUser,
} = global.actions;



// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const currentUser = (state) => state.currentUser;

export default global.reducer;
