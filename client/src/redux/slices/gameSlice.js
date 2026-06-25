const initialState = {
  games: [],
  loading: false,
  error: null
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_GAMES_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_GAMES_SUCCESS':
      return { ...state, games: action.payload, loading: false };
    case 'FETCH_GAMES_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export default gameReducer;
