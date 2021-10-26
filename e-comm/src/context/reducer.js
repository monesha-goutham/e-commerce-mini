// GENERIC STATE

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PRODUCTS":
      return {
        ...state,
        products: action.payload.products,
        isloading: action.payload.isloading,
      };
      break;
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };
      break;

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((prod) => prod.id !== action.payload.id),
      };

    case "CHANGE_PRODUCT_QTY":
      return {
        ...state,
        cart: state.cart.filter((prod) =>
          prod.id === action.payload.id
            ? (prod.qty = action.payload.qty)
            : prod.qty
        ),
      };
    default:
      return state;
  }
};

// FILTER REDUCER

export const filterReducer = (state, action) => {
  switch (action.type) {
    case "FILTER_BY_SORT":
      return {
        ...state,
        bySort: action.payload,
      };
      break;
    case "INCLUDE_OUT_OF_STOCK":
      return {
        ...state,
        includeOutOfStock: !state.includeOutOfStock,
      };
    case "FAST_DELIVERY_ONLY":
      return {
        ...state,
        fastDeliveryOnly: !state.fastDeliveryOnly,
      };

    case "FILTER_BY_RATING":
      return {
        ...state,
        byRating: action.payload,
      };

    case "FILTER_BY_SEARCH":
      return {
        ...state,
        bySearch: action.payload,
      };

    case "CLEAR_ALL_FILTERS":
      return {
        includeOutOfStock: false,
        fastDeliveryOnly: false,
        byRating: 0,
        bySearch: "",
      };

    default:
      return state;
  }
};
