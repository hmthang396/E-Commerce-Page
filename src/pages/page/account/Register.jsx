import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Col, Container, Form, Input, Label, Row } from 'reactstrap'
import { postFetch } from '../../../services/fetch-data'

const Register = () => {
    const [fullname, setFullname] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigation = useNavigate();
    const submitHandler = () => {
        postFetch(`/api/client/user`, {
            fullname, phoneNumber, email, password
        })
            .then((result) => {
                console.log(result);
                if (result.ErrorCode === 0) navigation("/page/account/cart");
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <section className="register-page section-b-space">
            <Container>
                <Row>
                    <Col lg="12">
                        <h3>create account</h3>
                        <div className="theme-card">
                            <Form className="theme-form">
                                <Row>
                                    <Col md="6">
                                        <Label className="form-label" for="email">Name</Label>
                                        <Input type="text"
                                            className="form-control"
                                            id="fullname"
                                            placeholder="Name"
                                            required=""
                                            onChange={(e) => { setFullname(e.target.value); }}
                                        />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="review">Phone Number </Label>
                                        <Input type="text"
                                            className="form-control"
                                            id="phonenumber"
                                            placeholder="Phone Number"
                                            required=""
                                            onChange={(e) => { setPhoneNumber(e.target.value); }}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="6">
                                        <Label className="form-label" for="email">email</Label>
                                        <Input type="email"
                                            className="form-control"
                                            id="email"
                                            placeholder="Email"
                                            required=""
                                            onChange={(e) => { setEmail(e.target.value); }}
                                        />
                                    </Col>
                                    <Col md="6">
                                        <Label className="form-label" for="review">Password</Label>
                                        <Input type="password"
                                            className="form-control"
                                            id="review"
                                            placeholder="Enter your password"
                                            required=""
                                            onChange={(e) => { setPassword(e.target.value); }} />
                                    </Col>
                                    <Col md="12">
                                        <a href="#" className="btn btn-solid w-auto" onClick={submitHandler}>create Account</a>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Register