import React, { Fragment, useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Media } from 'reactstrap';
import CartContext from '../../helpers/cart';

const Cart = ({ icon, layout }) => {
    const context = useContext(CartContext);
    const currContext = {
        currency: "VND",
        symbol: "",
        value: 1,
    };
    const symbol = currContext.symbol;
    const cartList = context.state;
    const total = context.cartTotal;
    const removeFromCart = context.removeFromCart;
    const [openSide, setOpenSide] = useState(false);
    return (
        <Fragment>
            {
                <li
                    className="onhover-div mobile-cart"
                    onClick={() => setOpenSide(true)}
                >
                    <div className="cart-qty-cls">{cartList.length}</div>
                    <div href={null}>
                        <Media
                            alt="cart"
                            src={icon}
                            className="img-fluid blur-up lazyload"
                        />
                        <i className="fa fa-shopping-cart"></i>
                    </div>
                </li>
            }

            <div
                id="cart_side"
                className={`add_to_cart ${layout} ${openSide ? "open-side" : ""} `}
            >
                <a href={null} className="overlay"></a>
                <div className="cart-inner">
                    <div className="cart_top">
                        <h3>my cart</h3>
                        <div className="close-cart" onClick={() => setOpenSide(false)}>
                            <a href={null}>
                                <i className="fa fa-times" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                    <div className="cart_media">
                        <ul className="cart_product">
                            {cartList.length > 0 &&
                                cartList.map((item, index) => (
                                    <li key={`cart-popup-${index}`}>
                                        <div className="media">
                                            <a href={null}>
                                                <Media
                                                    alt=""
                                                    className="me-3"
                                                    src={`${process.env.REACT_APP_API_HOST}/Product/${item.images[0].src}`}
                                                />
                                            </a>
                                            <div className="media-body">
                                                <a href={null}>
                                                    <h4>{item.title}</h4>
                                                </a>
                                                <h4>
                                                    <span>
                                                        {item.qty} x {symbol} {new Intl.NumberFormat('vi',{style : 'currency', currency : 'VND'}).format((item.price).toFixed(0))}
                                                    </span>
                                                </h4>
                                            </div>
                                        </div>
                                        <div className="close-circle">
                                            <a href="#" onClick={() => removeFromCart(item)}>
                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                            </a>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                        <ul className="cart_total">
                            <li>
                                <div className="total">
                                    <h5>
                                        subtotal : <span>{new Intl.NumberFormat('vi',{style : 'currency', currency : 'VND'}).format(total.toFixed(0))}</span>
                                    </h5>
                                </div>
                            </li>
                            <li>
                                <div className="buttons">
                                    <Link to="/page/account/cart" className="btn btn-solid btn-xs view-cart">
                                        view cart
                                    </Link>
                                    <Link to="/page/account/checkout" className="btn btn-solid btn-xs checkout">
                                        checkout
                                    </Link>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Cart