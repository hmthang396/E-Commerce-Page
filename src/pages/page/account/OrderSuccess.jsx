import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import { Col, Container, Media, Row } from 'reactstrap'
import UserContext from '../../../helpers/user'
import { getFetch } from '../../../services/fetch-data'

const OrderSuccess = () => {
    let { code } = useParams();
    let { user } = useContext(UserContext);
    const [data, setData] = useState(null);
    useEffect(() => {
        getFetch(`/api/client/order?code=${code}&userId=${user.id}`)
            .then((result) => {
                setData(result.Data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    return (

        <Fragment>
            {data && data.DetailOrders.length > 0 &&
                <>
                    <section className="section-b-space light-layout white-1">
                        <Container>
                            <Row>
                                <Col md="12">
                                    <div className="success-text"><i className="fa fa-check-circle" aria-hidden="true"></i>
                                        <h2>thank you</h2>
                                        <p>Payment is successfully processsed and your order is on the way</p>
                                        <p>Transaction ID:{data.code}</p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <section className="section-b-space">
                        <Container>
                            <Row>
                                <Col lg="6">

                                    <div className="product-order">
                                        <h3>your order details</h3>

                                        {data && data.DetailOrders.length > 0 &&
                                            data.DetailOrders.map((item, i) =>
                                                <Row className="product-order-detail" key={i}>
                                                    <Col xs="3" >
                                                        <Media src={`${process.env.REACT_APP_API_HOST}/Product/${item.Color.Images[0].src}`} alt=""
                                                            className="img-fluid blur-up lazyload" />
                                                    </Col>
                                                    <Col xs="3" className="order_detail">
                                                        <div>
                                                            <h4>product name</h4>
                                                            <h5>{item.Product.title}</h5>
                                                        </div>
                                                    </Col>
                                                    <Col xs="3" className="order_detail">
                                                        <div>
                                                            <h4>quantity</h4>
                                                            <h5>{item.quanlity}</h5>
                                                        </div>
                                                    </Col>
                                                    <Col xs="3" className="order_detail">
                                                        <div>
                                                            <h4>price</h4>
                                                            <h5>{new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(item.price)}</h5>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            )}

                                        <div className="total-sec">
                                            <ul>
                                                <li>subtotal <span>{new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(data.total)}</span></li>
                                            </ul>
                                        </div>
                                        <div className="final-total">
                                            <h3>total <span>{new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(data.total)}</span></h3>
                                        </div>

                                    </div>

                                </Col>
                                <Col lg="6">
                                    <Row className="order-success-sec">
                                        <Col sm="6">
                                            <h4>summery</h4>
                                            <ul className="order-detail">
                                                <li>order ID: {data.code}</li>
                                                <li>Order Date: {data.createdAt}</li>
                                                <li>Order Total:{new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(data.total)}</li>
                                            </ul>
                                        </Col>
                                        <Col sm="6">
                                            <h4>shipping address</h4>
                                            <ul className="order-detail">
                                                <li>{data.address}</li>
                                            </ul>
                                        </Col>
                                        <Col sm="12" className="payment-mode">
                                            <h4>payment method</h4>
                                            {data.method === "COD" &&
                                                <p>Pay on Delivery (Cash/Card). Cash on delivery (COD) available. Card/Net banking
                                                    acceptance subject to device availability.</p>
                                            }

                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                </>
            }
        </Fragment>

    )
}

export default OrderSuccess