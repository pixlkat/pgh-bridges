import { combineReducers } from '@reduxjs/toolkit';
import bridgesReducer from '../features/bridges/bridgeSlice';

const rootReducer = combineReducers({
  bridges: bridgesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
