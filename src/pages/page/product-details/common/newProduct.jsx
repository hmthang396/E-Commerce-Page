import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Media } from 'reactstrap';
import { displayPrice } from '../../../../services/calculator';
import { getFetch } from '../../../../services/fetch-data';
const convertArray = (arr, size) => {
    let result = [];
    while (arr.length) {
        result.push(arr.splice(0, size));
    }
    return result;
};
const NewProduct = () => {
    const currency = {
        currency: "VND",
        symbol: "",
        value: 1,
    };
    const symbol = currency.symbol;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    useEffect(() => {
        setLoading(true);
        getFetch(`/api/client/product/new?page=1&limit=12`)
            .then((result) => {
                setData(convertArray(result.Data, 3));
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }, []);
    return (
        <div className="theme-card">
            <h5 className="title-border">new product</h5>
            <Slider className="offer-slider slide-1">
                {data && data.length > 0 &&
                    data.map((arr, i) => (
                        <div key={i}>
                            {arr.map((product, index) => (
                                <div className="media" key={index}>
                                    <Link to={`/product-details/${product.id}`}>
                                        <Media
                                            className="img-fluid blur-up lazyload"
                                            src={`${process.env.REACT_APP_API_HOST}/Product/${product.Colors[0].Images[0].src}`}
                                            alt={product.Colors[0].Images[0].alt}
                                        />
                                    </Link>
                                    <div className="media-body align-self-center">
                                        <div className="rating">
                                            <i className="fa fa-star"></i>{" "}
                                            <i className="fa fa-star"></i>{" "}
                                            <i className="fa fa-star"></i>{" "}
                                            <i className="fa fa-star"></i>{" "}
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <a href={null}>
                                            <h6>{product.title}</h6>
                                        </a>
                                        {displayPrice(product, 0)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                }

            </Slider>
        </div>
    )
}

export default NewProduct