import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import gameReducer from './slices/gameSlice';
import orderReducer from './slices/orderSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  theme: themeReducer,
  games: gameReducer,
  orders: orderReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
