import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import PostLoader from '../../../../components/common/postLoader';
import ProductItem from '../../../../components/common/product-box/productbox1';
import CartContext from '../../../../helpers/cart';
import { CompareContext } from '../../../../helpers/compare/CompareContext';
import { WishlistContext } from '../../../../helpers/wishlist/WishlistContext';
import { getFetch } from '../../../../services/fetch-data';

const ProductList = ({ colClass, layoutList, openSidebar, noSidebar }) => {
    let { brand } = useParams();
    const cartContext = useContext(CartContext);
    const wishlistContext = useContext(WishlistContext);
    const compareContext = useContext(CompareContext);
    const quantity = cartContext.quantity;
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getFetch(`/client/product/brand/${brand}`)
            .then((result) => { setData(result.Data);console.log(result.Data); })
            .catch((error) => { console.log(error); })
    }, []);
    return (
        <Col className="collection-content">
            <div className="page-main-content">
                <Row>
                    <Col sm="12">
                        <div className="collection-product-wrapper">
                            <div className={`product-wrapper-grid ${layoutList}`}>
                                <Row>
                                    {/* Product Box */}
                                    {
                                        data.length === 0 ? (
                                            data.length === 0 ? (
                                            <Col xs="12">
                                                <div>
                                                    <div className="col-sm-12 empty-cart-cls text-center">
                                                        <img
                                                            src={`/assets/images/empty-search.jpg`}
                                                            className="img-fluid mb-4 mx-auto"
                                                            alt=""
                                                        />
                                                        <h3>
                                                            <strong>Your Cart is Empty</strong>
                                                        </h3>
                                                        <h4>Explore more shortlist some items.</h4>
                                                    </div>
                                                </div>
                                            </Col>
                                        ) : (
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
                                        )
                                    ) : (
                                        data &&
                                        data.map((product, i) => (
                                            <div className={colClass} key={i}>
                                                <div className="product">
                                                    <div>
                                                        <ProductItem
                                                            des={true}
                                                            product={product}
                                                            symbol={""}
                                                            cartClass="cart-info cart-wrap"
                                                            addCompare={() =>
                                                                compareContext.addToCompare(product)
                                                            }
                                                            addWishlist={() =>
                                                                wishlistContext.addToWish(product)
                                                            }
                                                            addCart={() =>
                                                                cartContext.addToCart(product, quantity)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    )
}

export default ProductList