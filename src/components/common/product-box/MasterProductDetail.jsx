import React from 'react'
import { useState } from 'react';
import { displayPrice } from '../../../services/calculator';

const MasterProductDetail = ({
  product,
  productDetail,
  currency,
  uniqueTags,
  detailClass,
  title,
  des,
  variantChangeByColor,
  changeColor,
}) => {
  let [indexColor, setIndexColor] = useState(0);
  let RatingStars = [];
  let rating = 5;
  for (var i = 0; i < rating; i++) {
    RatingStars.push(<i className="fa fa-star" key={i}></i>);
  }
  return (
    <div className={`product-detail ${productDetail} ${detailClass}`}>
      <div>
        {title !== "Product style 4" ? (
          <div className="rating">{RatingStars}</div>
        ) : (
          ""
        )}
        <h6>{product.title}</h6>
        {des ? <div dangerouslySetInnerHTML={{ __html: product.description }}></div> : ""}

        {displayPrice(product, indexColor)}

        {product.Colors.map((vari) => {
          var findItem = uniqueTags.find((x) => x.color === vari.color);
          if (!findItem) uniqueTags.push(vari);
        })}

        {product.type === "jewellery" ||
          product.type === "nursery" ||
          product.type === "beauty" ||
          product.type === "electronics" ||
          product.type === "goggles" ||
          product.type === "watch" ||
          product.type === "pets" ? (
          ""
        ) : (
          <>
            {title !== "Product style 4" && product.Colors ? (
              <ul className="color-variant">
                {product.Colors.map((color, i) => {
                  return (
                    <li
                      className={"whilte"}
                      style={{ backgroundColor: `${color.color}`, border: "solid 1px" }}
                      key={i}
                      title={color.color}
                      onClick={() => {
                        variantChangeByColor(color.id, product.Colors)
                        setIndexColor(i);
                        changeColor(i);
                      }
                      }
                    ></li>
                  );
                })}
              </ul>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MasterProductDetail