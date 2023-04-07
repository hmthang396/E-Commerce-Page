import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Container, Media, Row } from 'reactstrap';
import CartContext from '../../../../helpers/cart/index';
import cart from "../../../../assets/images/icon-empty-cart.png";
import { postFetch } from '../../../../services/fetch-data';
import { displayPrice, displayPrice2 } from '../../../../services/calculator';
import { size } from '../../../../data/size';
const CartPage = () => {
    const context = useContext(CartContext);
    const cartItems = context.state;
    const curContext = {
        currency: "VND",
        symbol: "",
        value: 1,
    };
    const symbol = curContext.symbol;
    const total = context.cartTotal;
    const removeFromCart = context.removeFromCart;
    const [quantity, setQty] = useState(1);
    const [quantityError, setQuantityError] = useState(false);
    const updateQty = context.updateQty;
    const updateSize = context.updateSize;
    const handleQtyUpdate = (item, quantity) => {
        if (quantity >= 1) {
            setQuantityError(false);
            updateQty(item, quantity);
        } else {
            setQuantityError(true);
        }
    };

    const changeQty = (e) => {
        setQty(parseInt(e.target.value));
    };

    const minusQty = () => {
        if (quantity > 1) {
            //setStock("InStock");
            setQty(quantity - 1);
        }
    };

    const plusQty = (product) => {
        if (product.stock >= quantity) {
            setQty(quantity + 1);
        } else {
            //setStock("Out of Stock !");
        }
    };

    const handleSize = (product, size) => {
        updateSize(product, size)
    };

    return (
        <div>
            {cartItems && cartItems.length > 0 ? (
                <section className="cart-section section-b-space">
                    <Container>
                        <Row>
                            <Col sm="12">
                                <table className="table cart-table table-responsive-xs">
                                    <thead>
                                        <tr className="table-head">
                                            <th scope="col">image</th>
                                            <th scope="col">product name</th>
                                            <th scope="col">price</th>
                                            <th scope="col">quantity</th>
                                            <th scope="col">Size</th>
                                            <th scope="col">action</th>
                                            <th scope="col">total</th>
                                        </tr>
                                    </thead>
                                    {cartItems.map((item, index) => {
                                        return (
                                            <tbody key={item.id}>
                                                <tr>
                                                    <td>
                                                        <Link to={`/product-details/` + item.id}>
                                                            <Media
                                                                src={
                                                                    item.images
                                                                        ? `${process.env.REACT_APP_API_HOST}/Product/${item.Colors[0].Images[0].src}`
                                                                        : `${process.env.REACT_APP_API_HOST}/Product/${item.Colors[0].Images[0].src}`
                                                                }
                                                                alt=""
                                                            />
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        <Link to={`/product-details/` + item.id}>
                                                            {item.title}
                                                        </Link>
                                                    </td>
                                                    <td>
                                                        {displayPrice2(item, 0)}
                                                    </td>
                                                    <td>
                                                        <div className="qty-box">
                                                            <div className="input-group">
                                                                <input
                                                                    type="number"
                                                                    name="quantity"
                                                                    min={0}
                                                                    onChange={(e) =>
                                                                        handleQtyUpdate(item, e.target.value)
                                                                    }
                                                                    className="form-control input-number"
                                                                    defaultValue={item.qty}
                                                                    style={{
                                                                        borderColor: quantityError && "red",
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        {item.qty >= item.Colors[0].stock ? "out of Stock" : ""}
                                                    </td>
                                                    <td >
                                                        <div className="qty-box">
                                                            <div className="input-group">
                                                                <select className="form-group"
                                                                    style={{ "padding": `0.48rem 0.75rem`, "borderRadius": `0.25rem`, "fontWeight": "normal" }}
                                                                    onChange={(e) => { handleSize(item, e.target.value) }}
                                                                >
                                                                    <option value={null}>--Select--</option>
                                                                    {size.map((element, index) => { return <option value={element} key={index}>{element}</option> }
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <i
                                                            className="fa fa-times"
                                                            onClick={() => removeFromCart(item)}
                                                        ></i>
                                                    </td>
                                                    <td>
                                                        <h2 className="td-color">
                                                            {symbol}
                                                            {new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(parseFloat(item.total))}
                                                        </h2>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        );
                                    })}
                                </table>
                                <table className="table cart-table table-responsive-md">
                                    <tfoot>
                                        <tr>
                                            <td>total price :</td>
                                            <td>
                                                <h2>
                                                    {symbol} {new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(parseFloat(total))}{" "}
                                                </h2>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </Col>
                        </Row>
                        <Row className="cart-buttons">
                            <Col xs="6">
                                <Link to={`/`} className="btn btn-solid">
                                    continue shopping
                                </Link>
                            </Col>
                            <Col xs="6">
                                <Link className="btn btn-solid" to={`/page/account/checkout`}>
                                    check out
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </section>
            ) : (
                <section className="cart-section section-b-space">
                    <Container>
                        <Row>
                            <Col sm="12">
                                <div>
                                    <div className="col-sm-12 empty-cart-cls text-center">
                                        <Media
                                            src={cart}
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
                        </Row>
                    </Container>
                </section>
            )}
        </div>
    )
}

export default CartPage