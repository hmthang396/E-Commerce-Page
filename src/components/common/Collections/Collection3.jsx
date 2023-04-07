import React, { useContext, useEffect, useState } from 'react'
import Slider from 'react-slick';
import { Col, Container, Row } from 'reactstrap';
import CartContext from '../../../helpers/cart';
import PostLoader from '../postLoader';
import { WishlistContext } from "../../../helpers/wishlist/WishlistContext";
import { CompareContext } from "../../../helpers/compare/CompareContext";
import ProductItem from '../product-box/productbox';
import { getFetch } from '../../../services/fetch-data';

const SpecialProducts = ({
    type,
    title,
    subtitle,
    designClass,
    noSlider,
    cartClass,
    productSlider,
    titleClass,
    noTitle,
    innerClass,
    inner,
    backImage,
}) => {
    const context = useContext(CartContext);
    const contextWishlist = useContext(WishlistContext);
    const comapreList = useContext(CompareContext);
    const quantity = context.quantity;
    const [data, setData] = useState(null);

    useEffect(() => {
        getFetch(`/api/client/product/all?page=1&limit=12`, {
            method: "GET",
            headers: {
                "Content-type": "application/json;charset=utf-8",
            },
        })
            .then((result) => {
                setData(result.Data);
            })
            .catch((error) => {
                console.log(error);
            })

    }, []);


    const addToCart = (...parameters) =>{
        let [product,color] = parameters;
        let newProduct = Object.assign({},product);
        newProduct.Colors = product.Colors.filter(element => {return element.id === color.id});
        context.addToCart(newProduct, 1)
    }
    const addToCompare = (...parameters) =>{
        let [product,color] = parameters;
        let newProduct = Object.assign({},product);
        newProduct.Colors = product.Colors.filter(element => {return element.id === color.id});
        comapreList.addToCompare(newProduct)
    }

    const addToWish = (...parameters) =>{
        let [product,color] = parameters;
        let newProduct = Object.assign({},product);
        newProduct.Colors = product.Colors.filter(element => {return element.id === color.id});
        contextWishlist.addToWish(newProduct)
    }
    return (
        <>
            <section className={designClass}>
                <Container>
                    <Row>
                        <Col>
                            {noTitle === "null" ? (
                                ""
                            ) : (
                                <div className={innerClass}>
                                    {subtitle ? <h4>{subtitle}</h4> : ""}
                                    <h2 className={inner}>{title}</h2>
                                    {titleClass ? (
                                        <hr role="tournament6" />
                                    ) : (
                                        <div className="line">
                                            <span></span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {!data ? (
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
                            ) : (
                                <Slider {...productSlider} className="product-m no-arrow">
                                    {data &&
                                        data.map((product, i) => (
                                            <div key={product.id}>
                                                <ProductItem
                                                    product={product}
                                                    title={title}
                                                    addWishlist={addToWish}
                                                    addCart={addToCart}
                                                    addCompare={addToCompare}
                                                    cartClass={cartClass}
                                                    backImage={backImage}
                                                />
                                            </div>
                                        ))}
                                </Slider>
                            )}
                        </Col>
                    </Row>
                </Container>

            </section>
        </>
    )
}

export default SpecialProducts;