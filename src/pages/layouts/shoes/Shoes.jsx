import React, { Fragment } from 'react'
import SpecialProducts from '../../../components/common/Collections/Collection3'
import ProductSlider from '../../../components/common/Collections/Collection9'
import ProductBox from '../../../components/common/Collections/TabCollection'
import AboutUs from './common/about-us'
import Banner from './common/banner'
import Category from './common/category'
import CategoryTwo from './common/category-two'
import Collections from './common/collections'

const Product4 = {
  infinite: true,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  autoplay: true,
  arrows: false,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
    },
    {
      breakpoint: 991,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
  ],
};

const Shoes = () => {
  return (
    <Fragment>
      {/* Man Shoes */}
      <Banner />
      {/* Brand Icon */}
      <Category />
      {/* About us */}
      <AboutUs />
      {/* Collections Image */}
      <Collections />
      {/* OUR COLLECTIONS */}
      <SpecialProducts type="shoes" line={true} innerClass="title3" inner="title-inner3" title="our Collections" subtitle="special offer" designClass="section-b-space p-t-0 ratio_asos" productSlider={Product4} noSlider="false" cartClass="cart-info" />
      {/* Collections Image */}
      <CategoryTwo />
      {/* Product Slider */}
      <ProductSlider type="shoes" />
      {/* Product {New/Featured/Special} */}
      <ProductBox type="shoes" noTitle={true} designClass="section-b-space p-t-0 ratio_asos" productSlider={Product4} noSlider="true" cartClass="cart-info" />
    </Fragment>
  )
}

export default Shoes