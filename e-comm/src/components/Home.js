import React, { useContext } from "react";
import { CartContext } from "../context/Context";
import Filter from "./Filter";
import "./Home.scss";
import ProductCard from "./ProductCard";

const Home = () => {
  const {
    state,
    filterState: {
      includeOutOfStock,
      fastDeliveryOnly,
      byRating,
      bySearch,
      bySort,
    },
    filterDispatch,
  } = useContext(CartContext);

  // loading ?
  const { products, isloading } = state;

  // applying filters
  const transformProducts = () => {
    let sortedProducts = products;

    // if sorting is applied, sort the products
    if (bySort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        bySort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    // remove all out of stock generally
    if (!includeOutOfStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock !== 0);
    }

    if (fastDeliveryOnly) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.fastDelivery === true
      );
    }

    // by search
    if (bySearch) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(bySearch)
      );
    }
    // by rating
    sortedProducts = sortedProducts.filter((prod) => prod.ratings >= byRating);

    return sortedProducts;
  };
  return (
    <div className="home">
      <Filter />

      {isloading ? (
        <h1 className="home--loading">Loading...</h1>
      ) : (
        <div className="home__product-container">
          {transformProducts().map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
