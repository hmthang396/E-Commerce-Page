import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import moment from 'moment';
import { Button, Col, Container, Row, Table } from 'reactstrap';
import UserContext from '../../../helpers/user';
import { getFetch, putFetch } from '../../../services/fetch-data';
import Login from './login-auth/Login';

const checkStatus = (status) => {
    if (status === "Hoàn thành") return <p className="badge badge-success">Hoàn thành</p>;
    if (status === "Đang gửi") return <p className="badge badge-primary">Đang gửi</p>;
    if (status === "Đang chờ gửi") return <p className="badge badge-secondary">Đang chờ gửi</p>;
    if (status === "Chờ xác thực") return <p className="badge badge-warning">Chờ xác thực</p>;
    if (status === "Xác nhận") return <p className="badge badge-warning">Xác nhận</p>;
    return <p className="badge badge-danger">Hủy</p>;
};

const Order = () => {
    const context = useContext(UserContext);
    const [data, setData] = useState([]);
    useEffect(() => {
        getFetch(`/api/client/order/search/${context.user.email}`)
            .then((result) => {
                console.log(result.Data);
                setData(result.Data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);
    const handleConfirm = (code) => {
        putFetch(`/api/client/order/confirm`, { code: code })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            })
    };
    return (
        <>
            {context.user !== null ?
                <section className="wishlist-section section-b-space">
                    <Container>
                        <Row>
                            <Col sm="12">
                                <Table className="table cart-table table-responsive-xs">
                                    <thead>
                                        <tr className="table-head">
                                            <th scope="col">Code Order</th>
                                            <th scope="col">Image Product</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Total Price</th>
                                            <th scope="col">Date Order</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    {
                                        data.length > 0 &&
                                        data.map((item, i) =>
                                            <tbody key={i}>
                                                <tr>
                                                    <td>
                                                        {item.code}
                                                    </td>

                                                    <td>
                                                        {
                                                            item.Products.map((product) =>
                                                                <a href="#">
                                                                    <img src={`${process.env.REACT_APP_API_HOST}/Product/${product.Images[0].src}`} alt="" />
                                                                </a>
                                                            )
                                                        }
                                                    </td>

                                                    <td>
                                                        {checkStatus(item.status)}
                                                    </td>


                                                    <td>
                                                        {new Intl.NumberFormat('vi', { style: 'currency', currency: 'VND' }).format(item.total)}
                                                    </td>

                                                    <td>
                                                        {moment(item.createdAt).format("DD/MM/yyyy")}
                                                    </td>

                                                    <td>
                                                        {
                                                            item.status === "Chờ xác thực" &&
                                                            <Button className="btn btn-solid" onClick={(e) => { handleConfirm(item.code); }}>Xác Nhận</Button>
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        )
                                    }
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </section>
                :
                <Login />
            }
        </>
    )
}

export default Order