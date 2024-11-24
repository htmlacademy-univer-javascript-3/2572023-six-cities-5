import {reducer} from './reducer.ts';
import {configureStore} from '@reduxjs/toolkit';

export const store = configureStore({ reducer });
