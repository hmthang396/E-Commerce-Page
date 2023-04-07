import React, { Fragment, useContext } from 'react'
import { Link } from 'react-router-dom';
import { Media } from 'reactstrap';
import CartContext from '../../../helpers/cart';

const CartHeader = ({ item, symbol }) => {
    const context = useContext(CartContext);
    return (
        <Fragment>
            <li>
                <div className="media">
                    <Link href={"/product-details/" + item.id}>
                        <Media alt="" className="me-3" src={`${process.env.REACT_APP_API_HOST}/Product/${item.Colors[0].Images[0].src}`} />
                    </Link>
                    <div className="media-body">
                        <Link to={"/product-details/" + item.id}>
                            <h6>{item.title}</h6>
                        </Link>
                        <h4>
                            <span>
                                {item.qty} x {symbol}
                                {new Intl.NumberFormat('vi',{style : 'currency', currency : 'VND'}).format(item.price)}
                            </span>
                        </h4>
                    </div>
                </div>
                <div className="close-circle">
                    <i
                        className="fa fa-times"
                        aria-hidden="true"
                        onClick={() => context.removeFromCart(item)}
                    ></i>
                </div>
            </li>
        </Fragment>
    )
}

export default CartHeader