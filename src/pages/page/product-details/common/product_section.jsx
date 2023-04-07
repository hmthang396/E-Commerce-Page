import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { WishlistContext } from '../../../../helpers/wishlist/WishlistContext';
import { CompareContext } from '../../../../helpers/compare/CompareContext';
import CartContext from '../../../../helpers/cart/index';
import { Col, Container, Media, Modal, ModalBody, Row } from 'reactstrap';
import { getFetch } from '../../../../services/fetch-data';
import { displayPrice } from '../../../../services/calculator';
import Review from '../common/review'
const ProductSection = ({productId}) => {
  const router = useNavigate();
  const curContext = {
    currency: "VND",
    symbol: "",
    value: 1,
  };
  const wishlistContext = useContext(WishlistContext);
  const compareContext = useContext(CompareContext);
  const symbol = curContext.symbol;
  const currency = curContext;
  const cartCtx = useContext(CartContext);
  const addToCart = cartCtx.addToCart;
  const quantity = cartCtx.quantity;
  const plusQty = cartCtx.plusQty;
  const minusQty = cartCtx.minusQty;
  const setQuantity = cartCtx.setQuantity;
  const [selectedProduct, setSelectedProduct] = useState();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(true);


  const toggle = () => setModal(!modal);
  const uniqueTags = [];

  const changeQty = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const clickProductDetail = (product) => {
    const titleProps = product.title.split(" ").join("");
    router.push(`/product-details/${product.id}`);
  };

  const getSelectedProduct = (item) => {
    setSelectedProduct(item);
    toggle();
  };

  const [image, setImage] = useState("");

  const variantChangeByColor = (imgId, product_images) => {
    product_images.map((data) => {
      if (data.id == imgId) {
        setImage(`${process.env.REACT_APP_API_HOST}/Product/${data.Images[0].src}`);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    getFetch(`/api/client/product/collection?page=1&limit=4&productId=${productId}`)
      .then((result) => {
        setData(result.Data);
        setLoading(false);
      })
      .catch((error) => { console.log(error); setLoading(false); })
  }, []);
  
  return (
    <section className="section-b-space ratio_asos">
      <Container>
        <Row>
          <Col className="product-related">
            <h2>related products</h2>
          </Col>
        </Row>
        <Row className="search-product">
          {!data ||
            loading ? (
            "loading"
          ) : (
            <>
              {data &&
                data.map((product, index) => (
                  <Col xl="3" md="4" sm="6" key={index}>
                    <div className="product-box">
                      <div className="img-wrapper">
                        <div className="front">
                          <a href={null}>
                            <Media
                              onClick={() => clickProductDetail(product)}
                              src={`${process.env.REACT_APP_API_HOST}/Product/${product.Colors[0].Images[0].src}`}
                              className="img-fluid blur-up lazyload bg-img"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="back">
                          <a href={null}>
                            <Media
                              src={`${process.env.REACT_APP_API_HOST}/Product/${product.Colors[0].Images[4].src}`}
                              className="img-fluid blur-up lazyload bg-img"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="cart-info cart-wrap">
                          <button
                            data-toggle="modal"
                            data-target="#addtocart"
                            title="Add to cart"
                            onClick={() => addToCart(product, quantity)}
                          >
                            <i className="fa fa-shopping-cart"></i>
                          </button>
                          <a
                            href="#"
                            onClick={() => wishlistContext.addToWish(product)}
                            title="Add to Wishlist"
                          >
                            <i className="fa fa-heart" aria-hidden="true"></i>
                          </a>
                          <a
                            href="#"
                            onClick={() => getSelectedProduct(product)}
                            data-toggle="modal"
                            data-target="#quick-view"
                            title="Quick View"
                          >
                            <i className="fa fa-search" aria-hidden="true"></i>
                          </a>
                          <a
                            href="#"
                            onClick={() => compareContext.addToCompare(product)}
                            title="Compare"
                          >
                            <i className="fa fa-refresh" aria-hidden="true"></i>
                          </a>
                        </div>
                      </div>
                      <div className="product-detail">
                        <div className="rating">
                          <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>{" "}
                          <i className="fa fa-star"></i>
                        </div>
                        <a href={null}>
                          <h6>{product.title}</h6>
                        </a>
                        {displayPrice(product,0)}
                        <ul className="color-variant mb-5">
                          {
                            product.Colors.map((color)=>
                            <li className="bg-light0" key={color.id} style={{"backgroundColor":`${color.color}`}}></li>
                            )
                          }
                        </ul>
                      </div>
                    </div>
                  </Col>
                ))}
            </>
          )}
        </Row>
        {selectedProduct ? (
          <Modal
            isOpen={modal}
            toggle={toggle}
            className="modal-lg quickview-modal"
            centered
          >
            <ModalBody>
              <Row>
                <Col lg="6" xs="12">
                  <div className="quick-view-img">
                    <Media
                      src={`${process.env.REACT_APP_API_HOST}/Product/${selectedProduct.Colors[0].Images[0].src}`}
                      alt=""
                      className="img-fluid"
                    />
                  </div>
                </Col>
                <Col lg="6" className="rtl-text">
                  <div className="product-right">
                    <h2> {selectedProduct.title} </h2>
                    <h3>
                      {new Intl.NumberFormat('vi',{style : 'currency', currency : 'VND'}).format((selectedProduct.price * currency.value).toFixed(0))}
                      
                    </h3>
                    {selectedProduct.variants ? (
                      <ul className="color-variant">
                        {uniqueTags ? (
                          <ul className="color-variant">
                            {selectedProduct.type === "jewellery" ||
                              selectedProduct.type === "nursery" ||
                              selectedProduct.type === "beauty" ||
                              selectedProduct.type === "electronics" ||
                              selectedProduct.type === "goggles" ||
                              selectedProduct.type === "watch" ||
                              selectedProduct.type === "pets" ? (
                              ""
                            ) : (
                              <>
                                {uniqueTags ? (
                                  <ul className="color-variant">
                                    {uniqueTags.map((vari, i) => {
                                      return (
                                        <li
                                          className={vari.color}
                                          key={i}
                                          title={vari.color}
                                          onClick={() =>
                                            variantChangeByColor(
                                              vari.image_id,
                                              selectedProduct.images
                                            )
                                          }
                                        ></li>
                                      );
                                    })}
                                  </ul>
                                ) : (
                                  ""
                                )}
                              </>
                            )}
                          </ul>
                        ) : (
                          ""
                        )}
                      </ul>
                    ) : (
                      ""
                    )}
                    <div className="border-product">
                      <h6 className="product-title">product details</h6>
                      <p>{selectedProduct.description}</p>
                    </div>
                    <div className="product-description border-product">
                      {selectedProduct.size ? (
                        <div className="size-box">
                          <ul>
                            {selectedProduct.size.map((size, i) => {
                              return (
                                <li key={i}>
                                  <a href={null}>{size}</a>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ) : (
                        ""
                      )}
                      <h6 className="product-title">quantity</h6>
                      <div className="qty-box">
                        <div className="input-group">
                          <span className="input-group-prepend">
                            <button
                              type="button"
                              className="btn quantity-left-minus"
                              onClick={minusQty}
                              data-type="minus"
                              data-field=""
                            >
                              <i className="fa fa-angle-left"></i>
                            </button>
                          </span>
                          <input
                            type="text"
                            name="quantity"
                            value={quantity}
                            onChange={changeQty}
                            className="form-control input-number"
                          />
                          <span className="input-group-prepend">
                            <button
                              type="button"
                              className="btn quantity-right-plus"
                              onClick={() => plusQty(selectedProduct)}
                              data-type="plus"
                              data-field=""
                            >
                              <i className="fa fa-angle-right"></i>
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="product-buttons">
                      <button
                        className="btn btn-solid"
                        onClick={() => addToCart(selectedProduct, quantity)}
                      >
                        add to cart
                      </button>
                      <button
                        className="btn btn-solid"
                        onClick={() => clickProductDetail(selectedProduct)}
                      >
                        View detail
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </ModalBody>
          </Modal>
        ) : (
          ""
        )}

        <Review productId={productId}/>
      </Container>
    </section>
  )
}

export default ProductSection