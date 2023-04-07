import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Col, Container, Form, FormGroup, Input, InputGroup, Label, Row } from 'reactstrap'
import UserContext from '../../../helpers/user';
import { getFetch } from '../../../services/fetch-data';

const TopBarDark = ({ topClass, fluid }) => {
    const context = useContext(UserContext);
    const [email, setEmail] = useState();
    const [code, setCode] = useState();
    const [order, setOrder] = useState();
    const [error, setError] = useState();
    const Logout = () => {
        context.setUser(null);
        localStorage.removeItem('userInfo');
    }
    const handleSubmit = (e) => {
        setError(null);
        setOrder(null);
        e.preventDefault();
        getFetch(`/api/client/order/search?email=${email}&code=${code}`)
            .then((result) => {
                if (result.Data) {
                    setOrder(result.Data);
                } else {
                    setError(`Not Found!`);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <div className={topClass}>
            <Container fluid={fluid}>
                <Row>
                    <Col lg="6">
                        <div className="header-contact">
                            <ul>
                                <li>Welcome to Our store Multikart</li>
                                <li>
                                    <i className="fa fa-phone text-white" aria-hidden="true"></i>Call Us: 02353-xxx-xxx
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col lg="6" className="text-end">
                        <ul className="header-dropdown">
                            <li className="mobile-wishlist" style={{ "marginRight": "20px" }}>
                                <Link to="/page/compare">
                                    <i className="fa fa-refresh" aria-hidden="true"></i> Compare
                                </Link>
                            </li>
                            <li className="mobile-wishlist" style={{ "marginRight": "20px" }}>
                                <Link to="/page/account/wishlist">
                                    <i className="fa fa-heart" aria-hidden="true"></i> wishlist
                                </Link>
                            </li>
                            <li className="onhover-dropdown mobile-account" style={{ "marginRight": "20px" }}>
                                <i className="fa fa-cart-plus" aria-hidden="true"></i> Track my order
                                <ul className="onhover-show-div" style={{ "width": "300px", "borderStyle": "solid" }}>
                                    <li>
                                        <b>Track my order</b>
                                    </li>
                                    <hr />
                                    <Form onSubmit={handleSubmit}>
                                        <li>
                                            <FormGroup>
                                                <Label for="exampleEmail" style={{ "fontSize": "10px" }} >
                                                    Please confirm your email:
                                                </Label>
                                                <Input
                                                    className="form-control"
                                                    placeholder="Email"
                                                    type="email"
                                                    required
                                                    onChange={(e) => { setEmail(e.target.value) }}
                                                />
                                            </FormGroup>
                                        </li>
                                        <li>
                                            <FormGroup>
                                                <Label for="exampleEmail" style={{ "fontSize": "10px" }} >
                                                    Your order number:
                                                </Label>
                                                <Input
                                                    className="form-control"
                                                    placeholder="eg. 123456789"
                                                    type="text"
                                                    required
                                                    onChange={(e) => { setCode(e.target.value) }} />
                                            </FormGroup>
                                        </li>
                                        <li>
                                            <FormGroup>
                                                <Input type='submit' className="btn-solid btn">

                                                </Input>
                                            </FormGroup>

                                        </li>
                                        <li>
                                            {
                                                order &&
                                                <b>{order.code} - {order.status}</b>
                                            }
                                        </li>
                                        <li>
                                            {
                                                error &&
                                                <b style={{ "color": "red" }}>{error}</b>
                                            }
                                        </li>
                                    </Form>
                                </ul>
                            </li>
                            <li className="onhover-dropdown mobile-account" style={{ "marginRight": "20px" }}>
                                <i className="fa fa-user" aria-hidden="true"></i> My Account
                                <ul className="onhover-show-div" style={{ "width": "300px", "borderStyle": "solid" }}>
                                    {
                                        context.user === null &&
                                        <>
                                            <li>
                                                <Link to={`/page/account/login`}>
                                                    Login
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={`/page/account/register`} >
                                                    Register
                                                </Link>
                                            </li>
                                        </>
                                    }

                                    {
                                        context.user !== null &&
                                        <>
                                            <li>
                                                <p>{context.user.fullname}</p>
                                            </li>
                                            <li>
                                                <Link to={`/customer/order/register`} >
                                                    My Orders
                                                </Link>
                                            </li>
                                            <li onClick={() => Logout()}>
                                                Logout
                                            </li>
                                        </>
                                    }

                                </ul>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default TopBarDark