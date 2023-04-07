import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Col, Media, Modal, ModalBody, Row } from 'reactstrap';
import CartContext from '../../../helpers/cart';
import { displayPrice } from '../../../services/calculator';
import MasterProductDetail from './MasterProductDetail';

const ProductBox2 = ({
    product,
    addCart,
    backImage,
    des,
    addWishlist,
    cartClass,
    productDetail,
    addCompare,
    title,
}) => {
    // eslint-disable-next-line
    const router = useNavigate();
    const cartContext = useContext(CartContext);
    const currency = {
        currency: "VND",
        symbol: "",
        value: 1,
    };
    const [quantity, setQuantity] = useState(1);
    const [image, setImage] = useState("");
    const [modal, setModal] = useState(false);
    const [modalCompare, setModalCompare] = useState(false);
    const [indexColor, setIndexColor] = useState(0);
    const toggleCompare = () => {
        setModalCompare(!modalCompare);
        addCompare(product, product.Colors[indexColor]);
    };
    const toggle = () => setModal(!modal);
    const uniqueTags = [];

    const onClickHandle = (img) => {
        setImage(img);
    };

    const plusQty = () => {
        setQuantity((prevState) => {
            return prevState + 1;
        })
    }

    const minusQty = () => {
        setQuantity((prevState) => {
            if (prevState > 1) return prevState - 1;
            return 1;
        })
    }

    const clickProductDetail = () => {
        router(`/product-details/${product.id}`);
    };

    const variantChangeByColor = (colorId) => {
        product.Colors.map((data) => {
            if (data.id == colorId) {
                setImage(`${process.env.REACT_APP_API_HOST}/Product/${data.Images[0].src}`);
            }
        });
    };
    const changeColor = (index) => {
        setIndexColor(index);
    }
    return (
        <div className="product-box product-wrap">
            <div className="img-wrapper">
                <div className="lable-block">
                    {product.isNew === true ? <span className="lable3">new</span> : ""}
                    {product.status === true ? <span className="lable4">on sale</span> : <span className="lable3">sold out</span>}
                </div>
                <div className="front" onClick={clickProductDetail}>
                    <Media
                        src={`${image ? image : `${process.env.REACT_APP_API_HOST}/Product/${product.Colors[0].Images[0].src}`}`}
                        className="img-fluid"
                        alt=""
                        style={{ "maxHeight": "322px" }}
                    />
                </div>

                <div className={cartClass}>
                    <button title="Add to cart" onClick={() => { addCart(product, product.Colors[indexColor], 1) }}>
                        <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    </button>
                    <a href={null} title="Add to Wishlist" onClick={() => { addWishlist(product, product.Colors[indexColor]) }}>
                        <i className="fa fa-heart" aria-hidden="true"></i>
                    </a>
                    <a href={null} title="Quick View" onClick={toggle}>
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </a>
                    <a href={null} title="Compare" onClick={toggleCompare}>
                        <i className="fa fa-refresh" aria-hidden="true"></i>
                    </a>
                    <Modal
                        isOpen={modalCompare}
                        toggle={toggleCompare}
                        size="lg"
                        centered
                    >
                        <ModalBody>
                            <Row className="compare-modal">
                                <Col lg="12">
                                    <div className="media">
                                        <Media
                                            src={`${product.Colors && image
                                                ? image
                                                : `${process.env.REACT_APP_API_HOST}/Product/${product.Colors[0].Images[0].src}`
                                                }`}
                                            alt=""
                                            className="img-fluid"
                                        />
                                        <div className="media-body align-self-center text-center">
                                            <h5>
                                                <i className="fa fa-check"></i>Item{" "}
                                                <span>{product.title} </span>
                                                <span> successfully added to your Compare list</span>
                                            </h5>
                                            <div className="buttons d-flex justify-content-center">
                                                <Link to="/page/compare" className="btn-sm btn-solid" onClick={() => { addCompare(product, product.Colors[indexColor]) }}>
                                                    View Compare list
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </ModalBody>
                    </Modal>
                </div>
                {product.Colors ? (
                    <ul className="product-thumb-list">
                        {product.Colors.map((color, i) => (
                            <li
                                className={`grid_thumb_img ${color.Images[0] === image ? "active" : ""
                                    }`}
                                key={i}
                            >
                                <a href={null} title="Add to Wishlist">
                                    <Media
                                        src={`${process.env.REACT_APP_API_HOST}/Product/${color.Images[0].src}`}
                                        alt="wishlist"
                                        onClick={() => onClickHandle(`${process.env.REACT_APP_API_HOST}/Product/${color.Images[0].src}`)}
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    ""
                )}
            </div>
            <MasterProductDetail
                product={product}
                productDetail={productDetail}
                currency={currency}
                uniqueTags={uniqueTags}
                title={title}
                des={des}
                variantChangeByColor={variantChangeByColor}
                changeColor={changeColor}
            />
            <Modal
                isOpen={modal}
                toggle={toggle}
                className="modal-lg quickview-modal"
                centered
            >
                <ModalBody>
                    <Row>
                        <Col lg="6" xs="12">
                            <div className="quick-view-img">
                                <Media
                                    src={`${product.Colors[0] && image ? image : `${process.env.REACT_APP_API_HOST}/Product/${product.Colors[0].Images[0].src}`}`}
                                    alt=""
                                    className="img-fluid"
                                />
                            </div>
                        </Col>
                        <Col lg="6" className="rtl-text">
                            <div className="product-right">
                                <h2> {product.title} </h2>
                                {displayPrice(product, indexColor)}
                                {product.Colors ? (
                                    <ul className="color-variant">
                                        <ul className="color-variant">
                                            <>
                                                {product.Colors.map((element, i) => {
                                                    return (
                                                        <li
                                                            className={element.color}
                                                            style={{ backgroundColor: `${element.color}` }}
                                                            key={element.id}
                                                            title={element.color}
                                                            onClick={() => {
                                                                variantChangeByColor(element.id);
                                                                setIndexColor(i);
                                                            }
                                                            }
                                                        ></li>
                                                    );
                                                })}
                                            </>
                                        </ul>
                                    </ul>
                                ) : (
                                    ""
                                )}
                                <div className="border-product">
                                    <h6 className="product-title">product details</h6>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: product.description
                                        }}></div>
                                </div>
                                <div className="product-description border-product">

                                    <h6 className="product-title">quantity</h6>
                                    <div className="qty-box">
                                        <div className="input-group">
                                            <span className="input-group-prepend">
                                                <button
                                                    type="button"
                                                    className="btn quantity-left-minus"
                                                    onClick={minusQty}
                                                    data-type="minus"
                                                    data-field=""
                                                >
                                                    <i className="fa fa-angle-left"></i>
                                                </button>
                                            </span>
                                            <input
                                                type="text"
                                                name="quantity"
                                                value={quantity}
                                                onChange={e => setQuantity(e.target.value)}
                                                className="form-control input-number"
                                            />
                                            <span className="input-group-prepend">
                                                <button
                                                    type="button"
                                                    className="btn quantity-right-plus"
                                                    onClick={plusQty}
                                                    data-type="plus"
                                                    data-field=""
                                                >
                                                    <i className="fa fa-angle-right"></i>
                                                </button>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="product-buttons">
                                    <button
                                        className="btn btn-solid"
                                        onClick={() => {
                                            addCart(product, product.Colors[indexColor], quantity);
                                        }}
                                    >
                                        add to cart
                                    </button>
                                    <button
                                        className="btn btn-solid"
                                        onClick={clickProductDetail}
                                    >
                                        View detail
                                    </button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ProductBox2