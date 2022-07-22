import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "../utils/client";

const HeroBanner = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      {heroBanner && (
        <div>
          <p className="beats-solo">{heroBanner.smallText}</p>
          <h3>{heroBanner.midText}</h3>
          <h1>{heroBanner.largeText1}</h1>
          <div className="hero-banner-image-container">
            <Image
              src={urlFor(heroBanner.image).url()}
              alt="headphones"
              width={450}
              height={450}
              className="hero-banner-image"
            />
          </div>
          <div>
            <Link href={`/product/${heroBanner.product}`}>
              <button type="button">{heroBanner.buttonText}</button>
            </Link>
            <div className="desc">
              <h5>Description</h5>
              <p>{heroBanner.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroBanner;
