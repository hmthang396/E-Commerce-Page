import React, { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import { getFetch } from '../../../services/fetch-data';

const SearchOverlay = () => {
    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState([]);
    const closeSearch = useCallback(() => {
        setData([]);
        setInputValue('');
        document.getElementById("search-overlay").style.display = "none";
    });
    const onSearch = () => {
        getFetch(`/api/client/product/find?key=${inputValue}`)
            .then((result) => {
                if (result.ErrorCode === 0) {
                    setData(result.Data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <div id="search-overlay" className="search-overlay">
            <div>
                <span className="closebtn" onClick={closeSearch} title="Close Overlay">
                    ×
                </span>
                <div className="overlay-content">
                    <Container>
                        <Row>
                            <Col xl="12">
                                <FormGroup>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="searchProduct"
                                        placeholder="Search a Product"
                                        onChange={(e) => { setInputValue(e.target.value) }}
                                        value={inputValue}
                                    />
                                </FormGroup>
                                <Button type="submit" className="btn btn-primary" onClick={onSearch}>
                                    <i className="fa fa-search"></i>
                                </Button>
                            </Col>
                            <Col xl="12">
                                <div id="mainnav">
                                    <ul className="nav-menu" style={{ "display": "grid" }}>
                                        {data && data.length > 0 &&
                                            data.map((element) => {
                                                return (
                                                    <li key={element.id} className="mega-menu" style={{ "padding": '10px 0px' }}>
                                                        <Link to={`/product-details/${element.id}`}>{element.title}</Link>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </div>
    )
}

export default SearchOverlay;