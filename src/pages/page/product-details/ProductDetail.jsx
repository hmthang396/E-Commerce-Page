import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom';
import ProductSection from './common/product_section';
import LeftSidebarPage from './product/leftSidebarPage';

const ProductDetail = () => {
    let { productId } = useParams();
    return (
        <Fragment>
            <LeftSidebarPage pathId={productId} />
            <ProductSection productId={productId} />
        </Fragment>
    )
}

export default ProductDetail