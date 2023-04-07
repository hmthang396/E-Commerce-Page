import React, { useContext } from 'react'
import { Col, Container, Media, Row, Table } from 'reactstrap';
import CartContext from '../../../helpers/cart';
import { CompareContext } from '../../../helpers/compare/CompareContext';
import { displayPrice2 } from '../../../services/calculator';

const Compare = () => {
    const contextCompare = useContext(CompareContext);
    const contextCart = useContext(CartContext);
    const curContext = {
        currency: "VND",
        symbol: "",
        value: 1,
    };
    const symbol = curContext.symbol;
    const compareItem = contextCompare.compareItems;
    console.log(compareItem);

    return (
        <section className="compare-padding">
            <Container>
                <Row>
                    <Col sm="12">
                        {compareItem.length >= 0 ?
                            <div className="compare-page">
                                <div className="table-wrapper table-responsive">
                                    <Table className="table">
                                        <thead>
                                            <tr className="th-compare">
                                                <td>Action</td>
                                                {compareItem.map((item, i) =>
                                                    <th className="item-row" key={i}>
                                                        <button type="button" className="remove-compare" onClick={() => contextCompare.removeFromComapre(item)}>Remove</button>
                                                    </th>
                                                )}

                                            </tr>
                                        </thead>
                                        <tbody id="table-compare">
                                            <tr>
                                                <th className="product-name">Product Name</th>
                                                {compareItem.map((item, i) =>
                                                    <td className="grid-link__title" key={i}>{item.title}</td>
                                                )}
                                            </tr>
                                            <tr>
                                                <th className="product-name">Product Image</th>
                                                {compareItem.map((item, i) =>
                                                    <td className="item-row" key={i}><img src={ `${process.env.REACT_APP_API_HOST}/Product/${item.Colors[0].Images[0].src}`} alt=""
                                                        className="featured-image" />
                                                        <div className="product-price product_price"><strong>On Sale:
                                                        </strong>
                                                            <span>
                                                                {displayPrice2(item, 0)}
                                                            </span>
                                                        </div>
                                                        <form className="variants clearfix">
                                                            <input type="hidden" />
                                                            <button title="Add to Cart" className="add-to-cart btn btn-solid"
                                                                onClick={() => { contextCart.addToCart(item, 1); contextCompare.removeFromComapre(item); }}
                                                            >
                                                                Add to Cart
                                                            </button>
                                                        </form>
                                                        {/* <p className="grid-link__title hidden">{item.title}</p> */}
                                                    </td>
                                                )}
                                            </tr>
                                            <tr>
                                                <th className="product-name">Product Description</th>
                                                {compareItem.map((item, i) =>
                                                    <td className="item-row" key={i}>
                                                        <div className="description-compare" dangerouslySetInnerHTML={{
                                                            __html: item.description
                                                        }}></div>
                                                    </td>
                                                )}
                                            </tr>
                                            <tr>
                                                <th className="product-name">Availability</th>
                                                {compareItem.map((item, i) =>
                                                    <td className="available-stock" key={i}>
                                                        <p>{item.stock = 0 ? 'Not Available' : 'Available'}</p>
                                                    </td>
                                                )}
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            :
                            <section className="cart-section section-b-space">
                                <Container>
                                    <Row>
                                        <Col sm="12">
                                            <div >
                                                <Col sm="12" className="empty-cart-cls text-center">
                                                    <Media src={`/assets/images/icon-empty-cart.png`} className="img-fluid mb-4 mx-auto" alt="" />
                                                    <h3>
                                                        <strong>Your Cart is Empty</strong>
                                                    </h3>
                                                    <h4>Explore more shortlist some items.</h4>
                                                </Col>
                                            </div>
                                        </Col>
                                    </Row>
                                </Container>
                            </section>
                        }
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Compare