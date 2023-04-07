import React from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

const Layout = () => {
  return (
    <>
      <Header logoName={"logo.png"} topClass="top-header"/>
      <Outlet />
      <Footer 
      footerClass={`footer-light`}
      footerLayOut={"light-layout upper-footer"}
      footerSection={"small-section border-section border-top-0"}
      belowSection={"section-b-space light-layout"}
      newLatter={false}
      logoName={"logo.png"}
      />
      <ToastContainer />
    </>
  )
}

export default Layout