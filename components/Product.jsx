import React from 'react'
import Link from 'next/link';
import { urlFor } from '../utils/client';

const Product = ({ product: { image, name, slug, price } }) => {

  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            className="product-image"
            src={image && urlFor(image[0])}
            width={250}
            height={250}
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product