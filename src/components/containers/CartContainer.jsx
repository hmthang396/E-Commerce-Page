import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Media } from 'reactstrap';
import CartContext from '../../helpers/cart';
import CartHeader from '../header/common/cart-header';

const CartContainer = ({ icon }) => {
    const context = useContext(CartContext);
    const currency = {
        currency: "VND",
        symbol: "",
        value: 1,
    };
    const symbol = currency.symbol;
    const cartList = context.state;
    const total = context.cartTotal;
    return (
        <Fragment>
            <li className="onhover-div mobile-cart">
                <div className="cart-qty-cls">{cartList.length}</div>
                <Link to={`/page/account/cart`}>
                    <div href={null}>
                        <Media src={icon} className="img-fluid" alt="" />
                        <i className="fa fa-shopping-cart"></i>
                    </div>
                </Link>
                <ul className="show-div shopping-cart">
                    {cartList.map((item, index) => (
                        <CartHeader key={index} item={item} total={total} symbol={symbol} />
                    ))}
                    {cartList.length > 0 ? (
                        <div>
                            <li>
                                <div className="total">
                                    <h5>
                                        subtotal :{" "}
                                        <span>
                                            {symbol}
                                            {new Intl.NumberFormat('vi',{style : 'currency', currency : 'VND'}).format(total.toFixed(0))}
                                        </span>
                                    </h5>
                                </div>
                            </li>
                            <li>
                                <div className="buttons view-cart">
                                    <Link to={`/page/account/cart`}>
                                        view cart
                                    </Link>
                                    <Link to={`/page/account/checkout`} className="checkout">
                                        checkout
                                    </Link>
                                </div>
                            </li>
                        </div>
                    ) : (
                        <li>
                            <h5>Your cart is currently empty.</h5>
                        </li>
                    )}
                </ul>
            </li>
        </Fragment>
    )
}

export default CartContainer