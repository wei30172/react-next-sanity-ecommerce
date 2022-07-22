import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client } from "../utils/client";

import { Product } from "../components";
import { GrInProgress, GrSearch } from "react-icons/gr";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";

const sortOptions = [
  {
    name: "Default",
    value: "default",
  },
  {
    name: "Price: Low to High",
    value: "lowest",
  },
  {
    name: "Price: High to Low",
    value: "highest",
  },
  {
    name: "Customer Reviews",
    value: "toprated",
  },
];

const categorieOptions = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "Earphones",
    value: "earphones",
  },
  {
    name: "Headphones",
    value: "headphones",
  },
];

const pricesOptions = [
  {
    name: "All",
    value: "all",
  },
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

const Products = () => {
  const router = useRouter();

  const {
    searchQuery = "all",
    category = "all",
    price = "all",
    sort = "default",
  } = router.query;

  const [queryInfo, setQueryInfo] = useState(searchQuery);
  const [state, setState] = useState({
    loading: true,
    products: [],
  });

  const { loading, products } = state;

  const keys = ["name", "category"];

  const search = (data, q) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(q)),
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let productQuery = '*[_type == "product"';

        if (category !== "all") {
          productQuery += ` && category match "${category}" `;
        }

        if (price !== "all") {
          const minPrice = Number(price.split("-")[0]);
          const maxPrice = Number(price.split("-")[1]);
          productQuery += ` && price >= ${minPrice} && price <= ${maxPrice}`;
        }

        let order = "";
        if (sort !== "default") {
          if (sort === "lowest") order = "| order(price asc)";
          if (sort === "highest") order = "| order(price desc)";
          if (sort === "toprated") order = "| order(rating desc)";
        }

        productQuery += `] ${order}`;
        setState({ loading: true });

        let products = await client.fetch(productQuery);
        searchQuery !== "all" ? (products = search(products, searchQuery)) : "";

        setState({ products, loading: false });
      } catch (err) {
        toast.error(err.message);
        setState({ loading: false });
      }
    };
    fetchData();
  }, [category, price, searchQuery, sort]);

  const filterSearch = ({ searchQuery, category, sort, price }) => {
    const path = router.pathname;
    const { query } = router;

    if (searchQuery) query.searchQuery = searchQuery;
    if (category) query.category = category;
    if (sort) query.sort = sort;
    if (price) query.price = price;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const handleSortSearch = (e) => {
    filterSearch({ sort: e.target.value });
  };

  const handleCategorySearch = (e) => {
    filterSearch({ category: e.target.value });
  };

  const handlePriceSearch = (e) => {
    filterSearch({ price: e.target.value });
  };

  const handleQuerySearch = (e) => {
    e.preventDefault();
    filterSearch({ searchQuery: queryInfo });
  };

  return (
    <div className="search-products-wrapper">
      <div className="filter-container">
        <div className="products-filter">
          <form onSubmit={handleQuerySearch}>
            <input
              type="text"
              name="query"
              placeholder="Search products"
              onChange={(e) => {
                setQueryInfo(e.target.value.toLowerCase());
              }}
            />
            <button className="btn" type="submit">
              <GrSearch />
            </button>
          </form>
        </div>
        <div className="products-filter">
          <p className="title">Categories </p>
          <select value={category} onChange={handleCategorySearch}>
            {categorieOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="products-filter">
          <p className="title">Prices </p>
          <select value={price} onChange={handlePriceSearch}>
            {pricesOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="sort-container">
        <div className="sort-info">
          <div className="products-sort result">
            {products && products.length !== 0 ? products.length : "No"} Results
            {searchQuery !== "all" && searchQuery !== "" && " : " + searchQuery}
            {category !== "all" && " : Category " + category}
            {price !== "all" && " : Price " + price}
            {(searchQuery !== "all" && searchQuery !== "") ||
            price !== "all" ||
            category !== "all" ? (
              <div className="clear">
                <AiOutlineCloseCircle
                  size={20}
                  onClick={() => router.push("/products")}
                />
              </div>
            ) : null}
          </div>
          <div className="products-sort">
            <p className="title">Sort by </p>
            <select value={sort} onChange={handleSortSearch}>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="products-container">
          {loading ? (
            <GrInProgress size={30} />
          ) : (
            <>
              {products?.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
