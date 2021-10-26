import React, { useContext } from "react";
import { CartContext } from "../context/Context";
import "./Filter.scss";
import Rating from "./Rating";

const Filter = () => {
  const {
    filterState: {
      includeOutOfStock,
      fastDeliveryOnly,
      byRating,
      bySearch,
      bySort,
    },
    filterDispatch,
  } = useContext(CartContext);

  console.log(includeOutOfStock, fastDeliveryOnly, byRating, bySearch, bySort);

  return (
    <div className="filter">
      <h1 className="filter__title">Filter Products</h1>
      <div className="filter__body">
        <form action="" className="filter__form">
          <div className="radio">
            <input
              type="radio"
              name="group-1"
              id=""
              onChange={() => {
                filterDispatch({
                  type: "FILTER_BY_SORT",
                  payload: "lowToHigh",
                });
              }}
              checked={bySort === "lowToHigh" ? true : false}
            />
            <label> Ascending</label>
          </div>
          <div className="radio">
            <input
              type="radio"
              name="group-1"
              id=""
              onChange={() => {
                filterDispatch({
                  type: "FILTER_BY_SORT",
                  payload: "highToLow",
                });
              }}
              checked={bySort === "highToLow" ? true : false}
            />
            <label>Descending</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              name="group-1"
              id=""
              onChange={() => {
                filterDispatch({ type: "INCLUDE_OUT_OF_STOCK" });
              }}
              checked={includeOutOfStock}
            />
            <label>Include out of stock</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              name="group-1"
              id=""
              checked={fastDeliveryOnly}
              onChange={() => {
                filterDispatch({ type: "FAST_DELIVERY_ONLY" });
              }}
            />
            <label>Fast delivery only</label>
          </div>
          <div className="rating">
            <label>Rating</label>
            <Rating
              rating={byRating}
              clickRating={(index) => {
                filterDispatch({
                  type: "FILTER_BY_RATING",
                  payload: index + 1,
                });
              }}
            />
          </div>
          <div>
            <button
              className="filter--btn"
              onClick={(e) => {
                e.preventDefault();
                filterDispatch({ type: "CLEAR_ALL_FILTERS" });
              }}
            >
              Clear Filters
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Filter;
