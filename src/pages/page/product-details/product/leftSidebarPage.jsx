import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick';
import { Col, Container, Media, Row } from 'reactstrap';
import Filter from '../common/filter'
import NewProduct from '../common/newProduct';
import Service from '../common/service';
import ImageZoom from '../common/image-zoom';
import DetailsWithPrice from '../common/detail-price';
import { getFetch } from '../../../../services/fetch-data';
const LeftSidebarPage = ({ pathId }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();
  const [listImages, setListImages] = useState(null);
  let products = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    arrows: true,
    fade: true,
  };
  let productsnav = {
    slidesToShow: 3,
    swipeToSlide: true,
    arrows: false,
    dots: false,
    focusOnSelect: true,
  };
  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, [data]);
  const { nav1, nav2 } = state;

  const filterClick = () => {
    document.getElementById("filter").style.left = "-15px"
  };

  const changeColorVar = (color) => {
    setListImages(color)
  };

  useEffect(() => {
    setLoading(true);
    getFetch(`/api/client/product/${pathId}`)
      .then((result) => {
        setData(result.Data);
        setListImages(result.Data.Colors[0])
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [pathId]);
  return (
    <section className="">
      <div className="collection-wrapper">
        <Container>
          <Row>
            <Col sm="3" className="collection-filter" id="filter">
              {/* <Filter /> */}
              <Service />
              {/* <!-- side-bar single product slider start --> */}
              <NewProduct />
              {/* <!-- side-bar single product slider end --> */}
            </Col>
            <Col lg="9" sm="12" xs="12">
              <Container fluid={true}>

                {!data ||
                  loading ? (
                  ""
                ) : (
                  <Row>
                    <Col lg="6" className="product-thumbnail">
                      <Slider
                        {...products}
                        asNavFor={nav2}
                        ref={(slider) => (slider1.current = slider)}
                        className="product-slick"
                      >
                        {listImages.Images.map((img, index) => (
                          <div key={index}>
                            <ImageZoom image={img} />
                          </div>
                        ))}
                      </Slider>
                      <Slider
                        className="slider-nav"
                        {...productsnav}
                        asNavFor={nav1}
                        ref={(slider) => (slider2.current = slider)}
                      >
                        {listImages
                          ? listImages.Images.map((vari, index) => (
                            <div key={index}>
                              <Media
                                src={`${process.env.REACT_APP_API_HOST}/Product/${vari.src}`}
                                key={index}
                                alt={vari.alt}
                                className="img-fluid"
                              />
                            </div>
                          ))
                          : ""}
                      </Slider>
                    </Col>
                    <Col lg="6" className="rtl-text">
                      <DetailsWithPrice
                        item={data}
                        changeColorVar={changeColorVar}
                      />
                    </Col>
                  </Row>
                )}
              </Container>
              {/* <ProductTab /> */}
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  )
}

export default LeftSidebarPage