import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Col, Container, Row, Table } from 'reactstrap';
import CartContext from '../../../helpers/cart';
import { WishlistContext } from '../../../helpers/wishlist/WishlistContext'
import { displayPrice2 } from '../../../services/calculator';
const Wishlist = () => {
    const router = useNavigate();
    const context = useContext(WishlistContext)
    const cartContext = useContext(CartContext);

    const wishlist = context.wishlistItems;
    const removeFromWish = context.removeFromWish;
    const addCart = cartContext.addToCart;

    const checkOut = () => {
        router('/page/account/checkout');
    }
    return (
        <>
            {wishlist.length >= 0
                ?
                <section className="wishlist-section section-b-space">
                    <Container>
                        <Row>
                            <Col sm="12">
                                <Table className="table cart-table table-responsive-xs">
                                    <thead>
                                        <tr className="table-head">
                                            <th scope="col">image</th>
                                            <th scope="col">product name</th>
                                            <th scope="col">price</th>
                                            <th scope="col">availability</th>
                                            <th scope="col">action</th>
                                        </tr>
                                    </thead>
                                    {wishlist.map((item, i) =>
                                        <tbody key={i}>
                                            <tr>
                                                <td>
                                                    <a href="#">
                                                        <img src={`${process.env.REACT_APP_API_HOST}/Product/${item.Colors[0].Images[0].src}`} alt="" />
                                                    </a>
                                                </td>
                                                <td>
                                                    {item.title}
                                                </td>
                                                <td>
                                                    {displayPrice2(item, 0)}
                                                </td>
                                                <td>
                                                    <p>{(item.Colors[0].stock > 0) ? 'In Stock' : 'out of Stock'}</p>
                                                </td>
                                                <td>
                                                    <a className="icon me-3" onClick={() => removeFromWish(item)}>
                                                        <i className="fa fa-times"></i>
                                                    </a>
                                                    <a className="cart" onClick={() => { addCart(item, 1); removeFromWish(item); }} >
                                                        <i className="fa fa-shopping-cart"></i>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )}
                                </Table>
                            </Col>
                        </Row>
                        <Row className="wishlist-buttons">
                            <Col sm="12">
                                <Link to={'/'} className="btn btn-solid">continue shopping</Link>
                                <Link to={null} className="btn btn-solid" onClick={checkOut}>check out</Link>
                            </Col>
                        </Row>
                    </Container>
                </section>
                : ''}

        </>
    )
}

export default Wishlist