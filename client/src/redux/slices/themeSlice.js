const initialState = {
  current: localStorage.getItem('theme') || 'light',
  themes: ['light', 'dark', 'sakura', 'neon', 'emerald', 'midnight', 'ocean', 'golden', 'gradient']
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'THEME_CHANGE':
      localStorage.setItem('theme', action.payload);
      return {
        ...state,
        current: action.payload
      };
    default:
      return state;
  }
};

export default themeReducer;
