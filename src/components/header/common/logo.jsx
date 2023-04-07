import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import iconlogo from '../../../assets/images/icon/logo.png';
const LogoImage = ({ logo }) => {
    return (
        <Fragment>
            <Link to={'/'}>
                    <img src={iconlogo} alt="" className="img-fluid" />
            </Link>
        </Fragment>
    )
}

export default LogoImage;