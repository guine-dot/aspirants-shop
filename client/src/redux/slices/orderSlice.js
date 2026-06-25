const initialState = {
  orders: [],
  loading: false,
  error: null
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_ORDERS_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_ORDERS_SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH_ORDERS_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CREATE_ORDER_SUCCESS':
      return { ...state, orders: [...state.orders, action.payload] };
    default:
      return state;
  }
};

export default orderReducer;
