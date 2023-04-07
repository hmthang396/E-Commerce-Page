import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Input, Media, Modal, ModalBody, ModalHeader } from 'reactstrap';
import CartContext from '../../../../helpers/cart';
import sizeChart from "../../../../assets/images/size-chart.jpg";
import MasterSocial from '../common/master_social';
import { displayPrice } from '../../../../services/calculator';
const DetailsWithPrice = ({ item, stickyClass, changeColorVar }) => {
    const [modal, setModal] = useState(false);
    const [indexColor, setIndexColor] = useState(0);
    const toggle = () => setModal(!modal);
    const product = item;
    const context = useContext(CartContext);
    const stock = context.stock;
    const plusQty = context.plusQty;
    const minusQty = context.minusQty;
    const quantity = context.quantity;
    const uniqueColor = [];
    const uniqueSize = [];

    const changeQty = (e) => {
        //setQuantity(parseInt(e.target.value));
    };

    return (
        <>
            <div className={`product-right ${stickyClass}`}>
                <h2> {product.title} </h2>
                {displayPrice(product, indexColor)}
                {product.Colors.map((vari) => {
                    var findItem = uniqueColor.find((x) => x.color === vari.color);
                    if (!findItem) uniqueColor.push(vari);
                    var findItemSize = uniqueSize.find((x) => x === vari.size);
                    if (!findItemSize) uniqueSize.push(vari.size);
                })}
                
                <div className="product-description border-product">
                    {product.Colors ? (
                        <div>
                            <h6 className="product-title size-text">
                                select color
                                <span>
                                    <a
                                        href={null}
                                        data-toggle="modal"
                                        data-target="#sizemodal"
                                        onClick={toggle}
                                    >
                                        size chart
                                    </a>
                                </span>
                            </h6>
                            <Modal isOpen={modal} toggle={toggle} centered>
                                <ModalHeader toggle={toggle}>Sheer Straight Kurta</ModalHeader>
                                <ModalBody>
                                    <Media src={sizeChart} alt="size" className="img-fluid" />
                                </ModalBody>
                            </Modal>
                            <div className="size-box">
                                <ul className="color-variant">
                                    {product.Colors.map((color, i) => {
                                        return (
                                            <li
                                                className={"whilte"}
                                                style={{ backgroundColor: `${color.color}`, border: "solid 1px" }}
                                                key={i}
                                                title={color.alt}
                                                onClick={() => {
                                                    changeColorVar(color);
                                                    setIndexColor(i);
                                                }}
                                            ></li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    <span className="instock-cls">{stock}</span>
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
                            <Input
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
                                    onClick={() => plusQty(product.Colors[indexColor])}
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
                    <a
                        href={null}
                        className="btn btn-solid"
                        onClick={() => context.addToCart(product, quantity)}
                    >
                        add to cart
                    </a>
                    <Link to={`/page/account/checkout`} className="btn btn-solid">
                        buy now
                    </Link>
                </div>
                <div className="border-product">
                    <h6 className="product-title">product details</h6>
                    <div dangerouslySetInnerHTML={{
                        __html :product.description 
                    }}></div>
                </div>
                <div className="border-product">
                    <h6 className="product-title">share it</h6>
                    <div className="product-icon">
                        <MasterSocial />
                    </div>
                </div>
                <div className="border-product">
                    <h6 className="product-title">Time Reminder</h6>
                    {/* <CountdownComponent /> */}
                </div>
            </div>
        </>
    )
}

export default DetailsWithPrice