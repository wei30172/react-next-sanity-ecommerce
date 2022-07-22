import React, { useState } from "react";
import Image from "next/image";
import { useStateContext } from "../../context/StateContext";
import { client, urlFor } from "../../utils/client";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Product, RatingStars } from "../../components";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price, rating, numReviews, countInStock } =
    product;
  const [inStock, setInStock] = useState(countInStock > 0 ? true : false);
  const [index, setIndex] = useState(0);
  const { incQty, decQty, qty, addToCart, setShowCart } = useStateContext();

  const handleBuyNow = () => {
    addToCart(product, qty);
    setShowCart(true);
  };

  return (
    <>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
              src={image && urlFor(image[index]).url()}
              alt="product"
              width={400}
              height={400}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <Image
                key={i}
                src={urlFor(item).url()}
                alt="product"
                width={70}
                height={70}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div className="rating">
              {rating}
              <RatingStars rating={rating} />
            </div>
            <p>({numReviews})</p>
          </div>
          <h4>Details: </h4>
          <p>{details}</p>
          <p className={inStock ? "price stock" : "price"}>${price}</p>
          <span className="status">
            ({inStock ? "In stock" : "Unavailable now"})
          </span>
          {inStock && (
            <>
              <div className="quantity">
                <h3>Quantity:</h3>
                <p className="quantity-desc">
                  <span className="minus" onClick={decQty}>
                    <AiOutlineMinus />
                  </span>
                  <span className="num">{qty}</span>
                  <span className="plus" onClick={incQty}>
                    <AiOutlinePlus />
                  </span>
                </p>
              </div>
              <div className="buttons">
                <button
                  type="button"
                  className="add-to-cart"
                  onClick={() => addToCart(product, qty)}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="buy-now"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} page={"product"} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// if the page has dynamic routes, it needs to define a list of paths to be statically generated.
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] { slug { current } }`;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

// the data required to render the page is avaliable at buld time ahead of a user's request.
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const product = await client.fetch(query);

  const productsQuery = `*[_type == "product" && category match '${product.category}']`;
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
