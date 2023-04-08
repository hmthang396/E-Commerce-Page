import React, { Fragment } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from './layouts/Layout'
import Shoes from './layouts/shoes/Shoes'
import Wishlist from './page/account/Wishlist'
import Cart from './page/account/Cart'
import Compare from './page/compare/compare'
import ProductDetail from './page/product-details/ProductDetail'
import Checkout from './page/account/Checkout'
import Register from './page/account/Register'
import Login from './page/account/login-auth/Login'
import Order from './page/account/Order'
import Brand from './page/shoes/Brand'
import OrderSuccess from './page/account/OrderSuccess'
import OAuthGoogle from './page/account/OAuthGoogle'
import OAuthFacebook from './page/account/OAuthFacebook'
const LayoutRoutes = () => {
    return (
        <Fragment>
            <Routes>
                <Route element={<Layout />}>
                    <Route path='/page/account/cart' element={<Cart />} />
                    <Route path='/page/account/checkout' element={<Checkout />} />
                    <Route path='/page/account/order-success/:code' element={<OrderSuccess />} />
                    <Route path='/page/account/register' element={<Register />} />
                    <Route path='/page/account/login' element={<Login />} />
                    <Route path='/page/account/wishlist' element={<Wishlist />} />
                    <Route path='/page/compare' element={<Compare />} />
                    <Route path='/customer/order/register' element={<Order />} />
                    <Route path='/product-details/:productId' element={<ProductDetail />} />
                    <Route path='/search' element={<Brand type="light" cartClass="cart-info cart-wrap"/>} />
                    <Route path='/' element={<Shoes />} />

                    
                    <Route path={`/oauth/google`} element={<OAuthGoogle />} />
                    <Route path={`/oauth/facebook`} element={<OAuthFacebook />} />
                </Route>
            </Routes>
        </Fragment>
    )
}

export default LayoutRoutes