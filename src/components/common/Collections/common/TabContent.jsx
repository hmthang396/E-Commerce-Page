import React, { useContext } from 'react'
import { Col, Row } from 'reactstrap';
import CartContext from '../../../../helpers/cart';
import { CompareContext } from '../../../../helpers/compare/CompareContext';
import { WishlistContext } from '../../../../helpers/wishlist/WishlistContext';
import PostLoader from '../../postLoader';
import ProductBox2 from '../../product-box/ProductBox2';

const TabContent = ({ data, loading, cartClass, startIndex, endIndex }) => {
    const context = useContext(CartContext);
    const wishListContext = useContext(WishlistContext);
    const compareContext = useContext(CompareContext);
    const quantity = context.quantity;
    const addToCart = (...parameters) =>{
        let [product,color,qty] = parameters;
        let newProduct = Object.assign({},product);
        newProduct.Colors = product.Colors.filter(element => {return element.id === color.id});
        context.addToCart(newProduct, qty)
    }
    const addToCompare = (...parameters) =>{
        let [product,color] = parameters;
        let newProduct = Object.assign({},product);
        newProduct.Colors = product.Colors.filter(element => {return element.id === color.id});
        compareContext.addToCompare(newProduct)
    }
    
    const addToWish = (...parameters) =>{
        let [product,color] = parameters;
        let newProduct = Object.assign({},product);
        newProduct.Colors = product.Colors.filter(element => {return element.id === color.id});
        wishListContext.addToWish(newProduct)
    }
    return (
        <>
            <Row className="no-slider">
                {!data || loading ? (
                    data ? (
                        <Col xs="12">
                            <div>
                                <div className="col-sm-12 empty-cart-cls text-center">
                                    <img
                                        src={`/static/images/empty-search.jpg`}
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
                        <div className="row mx-0 margin-default">
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
                            <ProductBox2
                                product={product}
                                key={i}
                                addCompare={addToCompare}
                                addCart={addToCart}
                                addWishlist={addToWish}
                                cartClass={cartClass}
                            />
                        ))
                )}
            </Row>
        </>
    );
};

export default TabContent