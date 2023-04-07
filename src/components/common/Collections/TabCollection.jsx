import React, { useContext, useEffect, useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import { Button, Col, Container, Row, Spinner } from 'reactstrap';
import { getFetch } from '../../../services/fetch-data';
import TabContent from './common/TabContent';

const ProductBox = ({ type, designClass, cartClass, noTitle }) => {
    const [activeTab, setActiveTab] = useState(type);
    const [loadingNew, setLoadingNew] = useState(false);
    const [loadingFeatured, setLoadingFeatured] = useState(false);
    const [loadingSpecial, setLoadingSpecial] = useState(false);
    const [dataNew, setDataNew] = useState(null);
    const [dataFeatured, setDataFeatured] = useState(null);
    const [dataSpecial, setDataSpecial] = useState(null);
    const [pageNew, setPageNew] = useState(1);
    const [pageFeatured, setPageFeatured] = useState(1);
    const [pageSpecial, setPageSpecial] = useState(1);

    const handlePagination = () => {
        if (document.getElementById("tabs").children[0].getAttribute("aria-selected") == 'true') {
            console.log(`handlePagination - New`);
            setLoadingNew(true);
            getFetch(`/api/client/product/new?page=${pageNew + 1}&limit=8`)
                .then((result) => {
                    setDataNew([...dataNew, ...result.Data]);
                    setLoadingNew(false);
                    setPageNew(pageNew + 1);
                })
                .catch((error) => {
                    console.log(error);
                    setLoadingNew(false);
                });
        }
        if (document.getElementById("tabs").children[1].getAttribute("aria-selected") == 'true') {
            console.log(`handlePagination - Featured`);
            setLoadingFeatured(true);
            getFetch(`/api/client/product/all?page=${pageFeatured+1}&limit=8`)
                .then((result) => {
                    setDataFeatured([...dataFeatured, ...result.Data]);
                    setLoadingFeatured(false);
                    setPageFeatured(pageFeatured + 1);
                })
                .catch((error) => {
                    console.log(error);
                    setLoadingFeatured(false);
                });
        }
        if (document.getElementById("tabs").children[2].getAttribute("aria-selected") == 'true') {
            console.log(`handlePagination - Special`);
            setLoadingSpecial(true);
            getFetch(`/api/client/product/top?page=${pageSpecial+1}&limit=8&type=bestsell`)
                .then((result) => {
                    setDataSpecial([...dataSpecial, ...result.Data]);
                    setLoadingSpecial(false);
                    setPageSpecial(pageSpecial + 1);
                })
                .catch((error) => {
                    console.log(error);
                    setLoadingSpecial(false);
                });
        }
    };

    useEffect(() => {
        setLoadingNew(true);
        getFetch(`/api/client/product/new?page=${pageNew}&limit=8`)
            .then((result) => {
                setDataNew(result.Data);
                setLoadingNew(false);
            })
            .catch((error) => { console.log(error); setLoadingNew(false); });
    }, []);
    //const onClickNew = async () => { setActiveTab(type); };
    const onClickFeatured = async () => {
        if (!dataFeatured) {
            setLoadingFeatured(true);
            getFetch(`/api/client/product/all?page=${pageFeatured}&limit=8`)
                .then((result) => {
                    setDataFeatured(result.Data);
                    setLoadingFeatured(false);
                })
                .catch((error) => { console.log(error); setLoadingFeatured(false); });
        }
    };
    const onClickSpecial = async () => {
        if (!dataSpecial) {
            setLoadingSpecial(true);
            getFetch(`/api/client/product/top?page=${pageSpecial}&limit=8&type=bestsell`)
                .then((result) => {
                    setDataSpecial(result.Data);
                    setLoadingSpecial(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoadingSpecial(false);
                });
        }
    };
    return (
        <div>
            {noTitle ? (
                ""
            ) : (
                <div className="title1 section-t-space">
                    <h4>exclusive products</h4>
                    <h2 className="title-inner1">special products</h2>
                </div>
            )}

            <section className={designClass}>
                <Container>
                    <Tabs className="theme-tab">
                        <TabList className="tabs tab-title" id='tabs'>
                            <Tab
                                className={activeTab == type ? "active" : ""}
                            >
                                NEW ARRIVAL
                            </Tab>
                            <Tab
                                className={activeTab == "furniture" ? "active" : ""}
                                onClick={onClickFeatured}
                            >
                                FEATURED{" "}
                            </Tab>
                            <Tab
                                className={activeTab == "furniture" ? "active" : ""}
                                onClick={onClickSpecial}
                            >
                                SPECIAL
                            </Tab>
                        </TabList>
                        <TabPanel>
                            <TabContent
                                data={dataNew}
                                loading={loadingNew}
                                cartClass={cartClass}
                                startIndex={0}
                                endIndex={8}
                            />
                        </TabPanel>
                        <TabPanel>
                            <TabContent
                                data={dataFeatured}
                                loading={loadingFeatured}
                                cartClass={cartClass}
                                startIndex={0}
                                endIndex={8}
                            />
                        </TabPanel>
                        <TabPanel>
                            <TabContent
                                data={dataSpecial}
                                loading={loadingSpecial}
                                cartClass={cartClass}
                                startIndex={0}
                                endIndex={8}
                            />
                        </TabPanel>
                    </Tabs>
                    <div className="section-t-space">
                        <div className="text-center">
                            <Row>
                                <Col xl="12" md="12" sm="12">
                                    < Button className="load-more" onClick={() => handlePagination()}>
                                        {loadingNew || loadingFeatured || loadingSpecial && (
                                            <Spinner animation="border" variant="light" />
                                        )}
                                        Load More
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Container>
            </section>
        </div >
    )
}

export default ProductBox