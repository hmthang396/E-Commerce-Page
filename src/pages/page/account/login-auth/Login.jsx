import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Button, Col, Container, Form, Input, Label, Row } from 'reactstrap'
import { postFetch } from '../../../../services/fetch-data';
import UserContext from '../../../../helpers/user/index'
import { getFacebookUrl, getGoogleUrl } from '../../../../services/getGoogleUrl';
const Login = () => {
    const location = useLocation();
    const context = useContext(UserContext);
    const history = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginAuth = (e) => {
        e.preventDefault();
        postFetch(`/api/client/user/login`, { email, password })
            .then((result) => {
                if (result.ErrorCode === 0) {
                    context.setUser(result.Data);
                    localStorage.setItem("userInfo", JSON.stringify(result.Data))
                    setTimeout(() => {
                        history(`/page/account/cart`);
                    }, 200);
                } else {
                    setEmail("");
                    setPassword("");
                    toast.warning(`${result.Message}`);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    let urlLocal = location.state?.from?.pathname;
    /*
    const loginFacebook = async() =>{
        window.FB.api('/me/permissions', 'delete', null, () => window.FB.logout());
        const { authResponse } = await new Promise(window.FB.login);
        console.log(authResponse);
        if (!authResponse) return;

        fetch(`https://graph.facebook.com/v16.0/me?fields=email&access_token=${authResponse.accessToken}`,{
            method:"GET"
        })
        .then((data)=>{return data.json()})
        .then((result)=>{console.log(result);})
    };
    */
    return (
        <section className="login-page section-b-space">
            <Container>
                <Row>
                    <Col lg="6">
                        <h3>Login</h3>
                        <div className="theme-card">
                            <Form className="theme-form" onSubmit={loginAuth}>
                                <div className="form-group">
                                    <Label className="form-label" for="email">Email</Label>
                                    <Input type="text" value={email} defaultValue={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Email" required="" />
                                </div>
                                <div className="form-group">
                                    <Label className="form-label" for="review">Password</Label>
                                    <Input type="password" value={password} defaultValue={password} onChange={e => setPassword(e.target.value)} className="form-control" id="review"
                                        placeholder="Enter your password" required="" />
                                </div>
                                <Button type='submit' className="btn btn-solid">Login</Button>
                                <div className="footer-social">
                                    <ul>
                                        <li >
                                            <a href={getFacebookUrl(urlLocal)}>
                                                <i className="fa fa-facebook" aria-hidden="true"></i>
                                            </a>
                                            {/* <Link onClick={()=>{loginFacebook();}}>
                                                <i className="fa fa-facebook" aria-hidden="true"></i>
                                            </Link> */}
                                        </li>
                                        <li >
                                            <a href={getGoogleUrl(urlLocal)}>
                                                <i className="fa fa-google-plus" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </Form>
                        </div>
                    </Col>
                    <Col lg="6" className="right-login">
                        <h3>New Customer</h3>
                        <div className="theme-card authentication-right">
                            <h6 className="title-font">Create A Account</h6>
                            <p>Sign up for a free account at our store. Registration is quick and easy. It allows you to be
                                able to order from our shop. To start shopping click register.</p>
                            <Link to="/page/account/register" className="btn btn-solid">Create an Account</Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            <ToastContainer />
        </section>
    )
}

export default Login