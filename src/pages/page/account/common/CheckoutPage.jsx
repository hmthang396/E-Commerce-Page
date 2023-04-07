import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import { Col, Container, Form, Media, Row } from 'reactstrap';
import { toast, ToastContainer } from 'react-toastify';
import CartContext from '../../../../helpers/cart';
import UserContext from '../../../../helpers/user';
import { postFetch } from '../../../../services/fetch-data';
import paypal from "../../../../assets/images/paypal.png";
import { useNavigate } from 'react-router-dom';
const CheckoutPage = () => {
    const cartContext = useContext(CartContext);
    const userContext = useContext(UserContext);
    const cartItems = cartContext.state;
    const cartTotal = cartContext.cartTotal;
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [city, setCity] = useState();
    const [county, setCounty] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [method, setMethod] = useState("COD");
    const history = useNavigate();

    const checkhandle = (value) => {
        setMethod(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !address || !city || !county || !phoneNumber || !method) {
            return toast.warn(`Please provide complete information`);
        }
        postFetch(`/api/client/order`, {
            userId: userContext.user.id,
            orders: cartItems,
            "fullname": name,
            address, city, county, phoneNumber, method
        })
            .then((result) => {
                if (result.ErrorCode === 0) {
                    toast.success(result.Message)
                    setName("");
                    setAddress("");
                    setCity("");
                    setCounty("");
                    setPhoneNumber("");
                    setMethod("");
                    cartContext.setCartItems([]);
                    history(`/page/account/order-success/${result.Data.code}`);
                } else {
                    toast.warn(result.Message)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };
    return (
        <section className="section-b-space">
            <Container>
                <div className="checkout-page">
                    <div className="checkout-form">
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col lg="6" sm="12" xs="12">
                                    <div className="checkout-title">
                                        <h3>Billing Details</h3>
                                    </div>
                                    <div className="row check-out">
                                        <div className="form-group col-md-6 col-sm-6 col-xs-6">
                                            <div className="field-label">Name</div>
                                            <input
                                                type="text"
                                                name="fullname"
                                                value={name}
                                                onChange={(e) => { setName(e.target.value); }}
                                            />
                                        </div>
                                        <div className="form-group col-md-6 col-sm-6 col-xs-6">
                                            <div className="field-label">Phone</div>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={phoneNumber}
                                                onChange={(e) => { setPhoneNumber(e.target.value); }}
                                            />
                                        </div>
                                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                            <div className="field-label">City</div>
                                            <select name="country"
                                                value={city}
                                                onChange={(e) => { setCity(e.target.value); }}
                                            >
                                                <option>Đà Nẵng</option>
                                                <option>Hồ Chí Minh</option>
                                                <option>Hà Nội</option>
                                            </select>
                                        </div>
                                        <div className="form-group col-md-12 col-sm-6 col-xs-12">
                                            <div className="field-label">State / County</div>
                                            <input
                                                //className="form-control"
                                                type="text"
                                                name="state"
                                                value={county}
                                                onChange={(e) => { setCounty(e.target.value); }}
                                            />
                                        </div>
                                        <div className="form-group col-md-12 col-sm-12 col-xs-12">
                                            <div className="field-label">Address</div>
                                            <input
                                                //className="form-control"
                                                type="text"
                                                name="address"
                                                placeholder="Street address"
                                                value={address}
                                                onChange={(e) => { setAddress(e.target.value); }}
                                            />
                                        </div>
                                    </div>
                                </Col>
                                <Col lg="6" sm="12" xs="12">
                                    {cartItems && cartItems.length > 0 > 0 ? (
                                        <div className="checkout-details">
                                            <div className="order-box">
                                                <div className="title-box">
                                                    <div>
                                                        Product <span>Total</span>
                                                    </div>
                                                </div>
                                                <ul className="qty">
                                                    {cartItems.map((item, index) => (
                                                        <li key={index}>
                                                            {item.title} × {item.qty}{" "}
                                                            <span>
                                                                { }
                                                                {new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(item.total)}
                                                            </span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <ul className="sub-total">
                                                    <li>
                                                        Subtotal{" "}
                                                        <span className="count">
                                                            { }
                                                            {new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(cartTotal)}
                                                        </span>
                                                    </li>
                                                    {/* <li>
                                                        Shipping
                                                        <div className="shipping">
                                                            <div className="shopping-option">
                                                                <input
                                                                    type="checkbox"
                                                                    name="free-shipping"
                                                                    id="free-shipping"
                                                                />
                                                                <label htmlFor="free-shipping">
                                                                    Free Shipping
                                                                </label>
                                                            </div>
                                                            <div className="shopping-option">
                                                                <input
                                                                    type="checkbox"
                                                                    name="local-pickup"
                                                                    id="local-pickup"
                                                                />
                                                                <label htmlFor="local-pickup">
                                                                    Local Pickup
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </li> */}
                                                </ul>
                                                <ul className="total">
                                                    <li>
                                                        Total{" "}
                                                        <span className="count">
                                                            { }
                                                            {new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(cartTotal)}
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="payment-box">
                                                <div className="upper-box">
                                                    <div className="payment-options">
                                                        <ul>
                                                            <li>
                                                                <div className="radio-option stripe">
                                                                    <input
                                                                        type="radio"
                                                                        name="payment-group"
                                                                        id="payment-2"
                                                                        defaultChecked={true}
                                                                        onClick={() => checkhandle("COD")}
                                                                    />
                                                                    <label htmlFor="payment-2">Cash On Delivery</label>
                                                                </div>
                                                            </li>
                                                            <li>
                                                                <div className="radio-option paypal">
                                                                    <input
                                                                        type="radio"
                                                                        name="payment-group"
                                                                        id="payment-1"
                                                                        onClick={() => checkhandle("PayPal")}
                                                                    />
                                                                    <label htmlFor="payment-1">
                                                                        PayPal
                                                                        <span className="image">
                                                                            <Media src={paypal} alt="" />
                                                                        </span>
                                                                    </label>
                                                                </div>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div className="text-end">
                                                    <button type="submit" className="btn-solid btn">
                                                        Place Order
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : ("")}
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default CheckoutPage