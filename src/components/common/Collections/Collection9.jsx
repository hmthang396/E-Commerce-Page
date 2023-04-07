import React, { Fragment, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import { Col, Container, Media, Row } from 'reactstrap';
import { displayPrice } from '../../../services/calculator';
import { getFetch } from '../../../services/fetch-data';
const convertArray = (arr, size) => {
    let result = [];
    while (arr.length >0 ) {
        result.push(arr.splice(0, size));
    }
    return result;
};
const size = 2;
const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: false,
    beforeChange: function (currentSlide, nextSlide) {
        console.log("before change", currentSlide, nextSlide);
    },
    afterChange: function (currentSlide) {
        console.log("after change", currentSlide);
    }
};
const ProductSlider = ({ type }) => {
    const router = useNavigate();
    const [data, setData] = useState(null);
    const [dataNew, setDataNew] = useState(null);
    const [dataSell, setDataSell] = useState(null);
    const [dataPrice, setDataPrice] = useState(null);
    const clickProductDetail = (product) => {
        const titleProps = product.title.split(" ").join("");
        router(`/product-details/${product.id}`);
    };
    useEffect(() => {
        getFetch(`/api/client/product/new?page=1&limit=12`, {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=utf-8",
            },
        })
            .then((result) => {
                setDataNew(convertArray(result.Data, 3));
            })
            .catch((error) => { console.log(error); });
        getFetch(`/api/client/product/top?page=1&limit=12&type=bestprice`, {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=utf-8",
            },
        })
            .then((result) => {
                setDataPrice(convertArray(result.Data, 3));
            })
            .catch((error) => { console.log(error); });
        getFetch(`/api/client/product/top?page=1&limit=12&type=bestsell`, {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=utf-8",
            },
        })
            .then((result) => {
                setDataSell(convertArray(result.Data, 3));
            })
            .catch((error) => { console.log(error); });
    }, [])
    return (
        <Fragment>
            <section
                className={`${type !== "fashion" && type !== "kids" ? "section-b-space" : ""
                    }`}
            >
                <Container>
                    <Row className="multiple-slider">
                        <Col lg="4" sm="6">
                            <div className="theme-card">
                                <h5 className="title-border">new products</h5>
                                <Slider className="offer-slider slide-1" >
                                    {dataNew &&
                                        dataNew.map((arr, indexArray) => (
                                            <div key={indexArray}>
                                                {arr &&
                                                    arr.map((product, index) => (
                                                        <div className="media" key={index}>
                                                            <a onClick={() => clickProductDetail(product)}>
                                                                <Media
                                                                    className="img-fluid blur-up lazyload"
                                                                    src={`${process.env.REACT_APP_API_HOST}/Product/${product.Colors[0].Images[0].src}`}
                                                                    alt=""
                                                                />
                                                            </a>
                                                            <div className="media-body align-self-center">
                                                                <a onClick={() => clickProductDetail(product)}>
                                                                    <h6>{product.title}</h6>
                                                                </a>

                                                                {displayPrice(product, 0)}

                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ))
                                    }
                                </Slider>
                            </div>
                        </Col>
                        <Col lg="4" sm="6">
                            <div className="theme-card">
                                <h5 className="title-border">best seller</h5>
                                <Slider className="offer-slider slide-1">
                                    {dataSell &&
                                        dataSell.map((arr, indexArray) => (
                                            <div key={indexArray}>
                                                {arr &&
                                                    arr.map((product, index) => (
                                                        <div className="media" key={index}>
                                                            <a onClick={() => clickProductDetail(product)}>
                                                                <Media
                                                                    className="img-fluid blur-up lazyload"
                                                                    src={`${process.env.REACT_APP_API_HOST}/Product/${product.Colors[0].Images[0].src}`}
                                                                    alt=""
                                                                />
                                                            </a>
                                                            <div className="media-body align-self-center">
                                                                <a onClick={() => clickProductDetail(product)}>
                                                                    <h6>{product.title}</h6>
                                                                </a>
                                                                {displayPrice(product, 0)}
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ))
                                    }
                                </Slider>
                            </div>
                        </Col>
                        <Col lg="4" sm="6">
                            <div className="theme-card">
                                <h5 className="title-border">best price</h5>

                                <Slider className="offer-slider slide-1">
                                    {dataPrice &&
                                        dataPrice.map((arr, indexArray) => (
                                            <div key={indexArray}>
                                                {arr &&
                                                    arr.map((product, index) => (
                                                        <div className="media" key={index}>
                                                            <a onClick={() => clickProductDetail(product)}>
                                                                <Media
                                                                    className="img-fluid blur-up lazyload"
                                                                    src={`${process.env.REACT_APP_API_HOST}/Product/${product.Colors[0].Images[0].src}`}
                                                                    alt=""
                                                                />
                                                            </a>
                                                            <div className="media-body align-self-center">
                                                                <a onClick={() => clickProductDetail(product)}>
                                                                    <h6>{product.title}</h6>
                                                                </a>
                                                                {displayPrice(product, 0)}
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ))
                                    }
                                </Slider>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Fragment>
    )
}

export default ProductSlider