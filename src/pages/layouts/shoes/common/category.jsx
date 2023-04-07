import React from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Col, Container, Media, Row } from 'reactstrap';
import cart from "../../../../assets/images/icon/nike.png";
import cart2 from "../../../../assets/images/icon/adidas.png";
import cart3 from "../../../../assets/images/icon/mlb.png";
import cart4 from "../../../../assets/images/icon/gucci.png";
import cart5 from "../../../../assets/images/icon/lv.png";
import { getFetch } from '../../../../services/fetch-data';
import { useState } from 'react';
import { useEffect } from 'react';
const Data = [
  { img: cart, title: "Nike", link: "/shoes/Nike" },
  { img: cart2, title: "Adidas", link: "/shoes/adidas" },
  { img: cart3, title: "MLB", link: "/shoes/mlb" },
  { img: cart4, title: "Gucci", link: "/shoes/gucci" },
  { img: cart5, title: "Louis Vuitton", link: "/shoes/lv" },
];
const Product5 = {
  dots: false,
  infinite: true,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 5,
  responsive: [
    {
      breakpoint: 1367,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};


const MasterCategory = ({ img, title, link }) => {
  return (
    <div className="category-block">
      <Link to={link}>
        <div className="category-image">
          <Media src={img} alt="" color='black' />
        </div>
      </Link>
      <div className="category-details">
        <Link to={link}>
          <h5>{title}</h5>
        </Link>
      </div>
    </div>
  );
};
const Category = () => {
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    getFetch(`/api/client/brand`)
      .then((result) => {
        setBrands(result.Data);
      })
      .catch((error) => {
      })
  }, [])
  return (
    <Container>
      <section className="section-b-space border-section border-top-0">
        <Row>
          <Col>
            <Slider {...Product5} className="slide-6 no-arrow">
              {brands.map((data, i) => {
                return (
                  <MasterCategory
                    key={data.id}
                    img={`${process.env.REACT_APP_API_HOST}/Icon/${data.icon}`}
                    link={`/search?subCategory=${data.title}`}
                    title={data.title}
                  />
                );
              })}
            </Slider>
          </Col>
        </Row>
      </section>
    </Container>
  )
}

export default Category