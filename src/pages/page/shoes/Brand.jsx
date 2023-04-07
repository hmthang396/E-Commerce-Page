import React, { Fragment, useContext } from 'react'
import { useSearchParams } from 'react-router-dom';
import { Container, Row } from "reactstrap";
import ProductList2 from './common/productList2';

const Brand = () => {
    let [searchParams, setSearchParams] = useSearchParams();
    return (
        <section className="section-b-space">
            <Container>
                <Row>
                    <ProductList2
                        colClass="col-lg-4 col-sm-6 col-grid-box"
                        layoutList=""
                        noSidebar={true}
                        type={searchParams.get('type')}
                        category={searchParams.get('category')}
                        subCategory={searchParams.get('subCategory')}
                        collection={searchParams.get('collection')}
                    />
                </Row>
            </Container>
        </section>
    )
}

export default Brand