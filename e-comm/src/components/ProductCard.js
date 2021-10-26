import React, { useContext } from "react";
import { CartContext } from "../context/Context";
import "./ProductCard.scss";
import Rating from "./Rating";

const ProductCard = ({ product }) => {
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;
  return (
    <div className="product">
      <div className="product__img">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product__body">
        <div className="product__content">
          <h6 className="product__title">{product.name}</h6>
          <p>Rs {product.price}</p>
          <p>{product.fastDelivery ? "Fast Delivery" : "4 days to deliver"}</p>
          <Rating rating={product.ratings} />
        </div>
        <div className="product--btns">
          {/* add to cart if the product doesnt exist in the cart */}

          {cart.some((p) => p.id === product.id) ? (
            <button
              className="btn--remove"
              onClick={() => {
                dispatch({ type: "REMOVE_FROM_CART", payload: product });
              }}
            >
              Remove from cart
            </button>
          ) : (
            <button
              className="btn--add"
              disabled={!product.inStock}
              onClick={() => {
                dispatch({ type: "ADD_TO_CART", payload: product });
              }}
            >
              {product.inStock ? "Add to cart" : "Out of stock"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
