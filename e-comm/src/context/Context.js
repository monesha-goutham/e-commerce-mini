import React, { createContext, useEffect, useReducer } from "react";
import { filterReducer, reducer } from "./reducer";
import { api } from "../api/products";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  // state
  let initialState = {
    products: [],
    cart: [],
    isloading: true,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  // reducer for filter state
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    includeOutOfStock: false,
    fastDeliveryOnly: false,
    byRating: 0,
    bySearch: "",
  });

  // we gotta give only updated state to the reducer
  // else it doesnt get updated automatically

  const fetchProducts = (state) => {
    // console.log("called iniial state update");
    dispatch({ type: "FETCH_PRODUCTS", payload: state });
  };

  // get the first set of products on mount
  useEffect(async () => {
    // TODO: use TRY CATCH
    const response = await api.get("/products");
    if (response.data) {
      const productsData = response.data;

      // fetch for reducer
      fetchProducts({ products: productsData, isloading: false });
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ state, dispatch, filterState, filterDispatch }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
