import React, { useContext } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { CartContext } from "../context/Context";

const Navbar = () => {
  const {
    state: { cart },
    filterState: { bySearch },
    filterDispatch,
    dispatch,
  } = useContext(CartContext);

  return (
    <div class="nav">
      <div className="navbar">
        <div className="navbar__nav">
          <div className="nav__brand">
            <Link to="/">SHEIN</Link>
          </div>
          <div className="nav__search">
            <input
              type="text"
              placeholder="enter your search..."
              className="nav__input"
              value={bySearch}
              onChange={(e) => {
                filterDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                });
              }}
            />
          </div>
          <div className="nav__dropdown">
            {/* insert cart icon and badge icon */}
            <Link to="/cart">
              <IconButton sx={{ color: "white" }} className="nav__dropdown">
                <Badge badgeContent={cart.length} color="warning">
                  <ShoppingCartIcon fontSize="large" />
                </Badge>
              </IconButton>
            </Link>

            <div className="dropdown__content-box">
              {cart.length == 0 ? (
                <div>Cart is empty</div>
              ) : (
                <div className="dropdown__list">
                  {cart.map((item) => (
                    <div className="dropdown__item">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="item__img"
                      />
                      <div className="item__details">
                        <p>{item.name}</p>
                        <p className="item__qty">Quantity : {item.qty}</p>
                      </div>
                      <button
                        className="item--delete"
                        onClick={() => {
                          dispatch({ type: "REMOVE_FROM_CART", payload: item });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <Link to="/cart">
                    <button className="dropdown--cart-btn">Go to Cart</button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
