import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppData } from '@typings/state.ts';
import { Cities, NameSpace, SortType } from '../../const.ts';
import { City } from '@typings/city.ts';

const initialState: AppData = {
  city: Cities[0],
  sortType: SortType.Popular,
  error: null,
};

export const appData = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    setSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { changeCity, setSortType, setError } = appData.actions;
