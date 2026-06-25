const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_LOGIN_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null
      };
    case 'AUTH_LOGOUT':
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return initialState;
    case 'AUTH_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'AUTH_LOADING':
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default authReducer;
