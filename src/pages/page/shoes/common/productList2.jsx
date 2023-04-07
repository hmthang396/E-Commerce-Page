import React from 'react'
import Menu2 from "../../../../assets/images/mega-menu/2.jpg";
import icon1 from "../../../../assets/images/icon/2.png";
import icon2 from "../../../../assets/images/icon/3.png";
import icon3 from "../../../../assets/images/icon/4.png";
import icon4 from "../../../../assets/images/icon/6.png";
import { Button, Col, Media, Row, Spinner } from 'reactstrap'
import { useState } from 'react';
import ProductItem from '../../../../components/common/product-box/productbox1';
import PostLoader from '../../../../components/common/postLoader';
import { useContext } from 'react';
import CartContext from '../../../../helpers/cart';
import { WishlistContext } from '../../../../helpers/wishlist/WishlistContext';
import { CompareContext } from '../../../../helpers/compare/CompareContext';
import { useEffect } from 'react';
import { getFetch } from '../../../../services/fetch-data';
const ProductList2 = ({ colClass, layoutList,collection, type, category, subCategory }) => {
    const cartContext = useContext(CartContext);
    const quantity = cartContext.quantity;
    const wishlistContext = useContext(WishlistContext);
    const compareContext = useContext(CompareContext);

    const [layout, setLayout] = useState(layoutList);
    const [grid, setGrid] = useState(colClass);
    const [limit, setLimit] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    const addToCart = (...parameters) => {
        let [product, color] = parameters;
        let newProduct = Object.assign({}, product);
        newProduct.Colors = product.Colors.filter(element => { return element.id === color.id });
        cartContext.addToCart(newProduct, 1)
    }
    const addToCompare = (...parameters) => {
        let [product, color] = parameters;
        let newProduct = Object.assign({}, product);
        newProduct.Colors = product.Colors.filter(element => { return element.id === color.id });
        compareContext.addToCompare(newProduct)
    }

    const addToWish = (...parameters) => {
        let [product, color] = parameters;
        let newProduct = Object.assign({}, product);
        newProduct.Colors = product.Colors.filter(element => { return element.id === color.id });
        wishlistContext.addToWish(newProduct)
    }

    useEffect(() => {
        getFetch(`/api/client/product/search?subCategory=${subCategory}&page=${page}&limit=${12}&category=${category}&collection=${collection}&type=${type}`)
            .then((result) => {
                setData([...data, ...result.Data]);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [page])
    useEffect(() => {
        getFetch(`/api/client/product/search?subCategory=${subCategory}&page=${page}&limit=${12}&category=${category}&collection=${collection}&type=${type}`)
            .then((result) => {
                setData(result.Data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [collection, type, category, subCategory])

    const handlePagination = () => {
        setIsLoading(true);
        setPage(page + 1)
        setIsLoading(false);
    };

    return (
        <Col className="collection-content">
            <div className="page-main-content">
                <Row>
                    <Col sm="12">
                        <div className="top-banner-wrapper">
                            <a href={null}>
                                <Media
                                    src={Menu2}
                                    className="img-fluid blur-up lazyload"
                                    alt=""
                                />
                            </a>
                            <div className="top-banner-content small-section">
                                <h4>fashion</h4>
                                <h5>
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry.
                                </h5>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been the industry's
                                    standard dummy text ever since the 1500s, when an unknown
                                    printer took a galley of type and scrambled it to make a type
                                    specimen book. It has survived not only five centuries, but
                                    also the leap into electronic typesetting, remaining
                                    essentially unchanged. It was popularised in the 1960s with
                                    the release of Letraset sheets containing Lorem Ipsum
                                    passages, and more recently with desktop publishing software
                                    like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                            </div>
                        </div>

                        <Row>
                            <Col xs="12">
                                <ul className="product-filter-tags">
                                    {/*
                                    Filter
                                    */}
                                </ul>
                            </Col>
                        </Row>

                        <div className="collection-product-wrapper">
                            <div className="product-top-filter">
                                <Row>
                                    <Col>
                                        <div className="product-filter-content">
                                            <div className="search-count">
                                                <h5>
                                                    {data
                                                        ? `Showing Products 1-${data.length} of ${data.length > 0 && data[0].total}`
                                                        : "loading"}{" "}
                                                    Result
                                                </h5>
                                            </div>
                                            <div className="collection-view">
                                                <ul>
                                                    <li>
                                                        <i
                                                            className="fa fa-th grid-layout-view"
                                                            onClick={() => {
                                                                setLayout("");
                                                                setGrid("col-lg-3");
                                                            }}
                                                        ></i>
                                                    </li>
                                                    <li>
                                                        <i
                                                            className="fa fa-list-ul list-layout-view"
                                                            onClick={() => {
                                                                setLayout("list-view");
                                                                setGrid("col-lg-12");
                                                            }}
                                                        ></i>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div
                                                className="collection-grid-view"
                                                style={
                                                    layout === "list-view"
                                                        ? { visibility: "hidden" }
                                                        : { visibility: "visible" }
                                                }
                                            >
                                                <ul>
                                                    <li>
                                                        <Media
                                                            src={icon1}
                                                            alt=""
                                                            className="product-2-layout-view"
                                                            onClick={() => setGrid("col-lg-6")}
                                                        />
                                                    </li>
                                                    <li>
                                                        <Media
                                                            src={icon2}
                                                            alt=""
                                                            className="product-3-layout-view"
                                                            onClick={() => setGrid("col-lg-4")}
                                                        />
                                                    </li>
                                                    <li>
                                                        <Media
                                                            src={icon3}
                                                            alt=""
                                                            className="product-4-layout-view"
                                                            onClick={() => setGrid("col-lg-3")}
                                                        />
                                                    </li>
                                                    <li>
                                                        <Media
                                                            src={icon4}
                                                            alt=""
                                                            className="product-6-layout-view"
                                                            onClick={() => setGrid("col-lg-2")}
                                                        />
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                    </Col>
                                </Row>
                            </div>

                            <div className={`product-wrapper-grid ${layout}`}>
                                <Row>
                                    {data.length === 0 ? (
                                        <div className="row mx-0 margin-default mt-4">
                                            <div className="col-xl-3 col-lg-4 col-6">
                                                <PostLoader />
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-6">
                                                <PostLoader />
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-6">
                                                <PostLoader />
                                            </div>
                                            <div className="col-xl-3 col-lg-4 col-6">
                                                <PostLoader />
                                            </div>
                                        </div>
                                    ) : (
                                        data.map((product, i) => (
                                            <div className={grid} key={i}>
                                                <div className="product">
                                                    <div>
                                                        <ProductItem
                                                            des={true}
                                                            product={product}
                                                            symbol={""}
                                                            cartClass="cart-info cart-wrap"
                                                            addCompare={addToCompare}
                                                            addWishlist={addToWish}
                                                            addCart={addToCart}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )
                                    }
                                </Row>
                            </div>
                            <div className="section-t-space">
                                <div className="text-center">
                                    <Row>
                                        <Col xl="12" md="12" sm="12">
                                            {data.length > 0 && data.length <= data[0].total - 1 && (
                                                <Button className="load-more" onClick={() => handlePagination()}>
                                                    {isLoading && (
                                                        <Spinner animation="border" variant="light" />
                                                    )}
                                                    Load More
                                                </Button>
                                            )}
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}

export default ProductList2