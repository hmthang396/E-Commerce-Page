import React, { Fragment } from 'react'
import { Col, Container, Media, Row } from 'reactstrap';
import cart1 from "../../../../assets/images/shoes/cat1.jpg";
import cart2 from "../../../../assets/images/shoes/cat2.jpg";
import cart3 from "../../../../assets/images/shoes/cat3.jpg";
import { Link } from 'react-router-dom';
const Data = [
    {
        img: cart1,
        title: "men",
        link: "/search?type=men",
    },
    {
        img: cart2,
        title: "women",
        link: "/search?type=women",
    },
    {
        img: cart3,
        title: "kids",
        link: "/search?type=kids",
    },
];

const MasterCategory = ({ img, title, link }) => {
    return (
        <Col sm="4" className="border-padding">
            <div className="category-banner">
                <div>
                    <Link to={link} >
                        <Media
                            src={img}
                            className="img-fluid blur-up lazyload bg-img"
                            alt=""
                        />
                    </Link>
                </div>
                <div className="category-box">
                    <Link to={link} >
                        <h2>{title}</h2>
                    </Link>
                </div>
            </div>
        </Col>
    );
};
const CategoryTwo = () => {
    return (
        <Fragment>
            <section className="p-0 ratio2_1">
                <Container fluid={true}>
                    <Row className="category-border">
                        {Data.map((data, i) => {
                            return <MasterCategory key={i} img={data.img} title={data.title} link={data.link} />;
                        })}
                    </Row>
                </Container>
            </section>
        </Fragment>
    )
}

export default CategoryTwo