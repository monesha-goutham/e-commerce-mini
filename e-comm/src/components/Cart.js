import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/Context";
import "./Cart.scss";
import Rating from "./Rating";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = useContext(CartContext);

  return (
    <div className="cart">
      <div className="products-container">
        {cart.map((product) => (
          <div className="product-item" key={product.id}>
            <img src={product.image} alt={product.name} class="item__img" />

            <div class="item__details">
              <h5>{product.name}</h5>
              <p>Price : Rs {product.price}</p>
              <Rating rating={product.ratings} />
            </div>

            <form action="" className="item__input">
              <label>Quantity : </label>
              <select
                className="item--qty-select"
                value={product.qty}
                onChange={(e) => {
                  dispatch({
                    type: "CHANGE_PRODUCT_QTY",
                    payload: {
                      id: product.id,
                      qty: e.target.value,
                    },
                  });
                }}
              >
                {[...Array(product.inStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </form>

            <button
              className="item--delete-btn"
              onClick={() => {
                dispatch({ type: "REMOVE_FROM_CART", payload: product });
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div class="summ__title">
          <h2>Your cart has {cart.length} items</h2>
        </div>
        <div class="summ__details">
          <h5>
            Total : Rs{" "}
            {cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)}
          </h5>
        </div>
        {cart.length === 0 ? (
          <Link to="/">
            <button className="item--btn">Buy Products</button>
          </Link>
        ) : (
          <button className="item--btn">Proceed to Checkout</button>
        )}
      </div>
    </div>
  );
};

export default Cart;
