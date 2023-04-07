import React, { useContext, useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Col, Container, Row } from 'reactstrap';
import { getFetch, postFetch } from '../../../../services/fetch-data';
import UserContext from '../../../../helpers/user';
import MasterReview from './master-review';

const Review = React.memo(({ productId }) => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [message, setMessage] = useState('');
    useEffect(() => {
        getFetch(`/api/client/comment/all?page=${page}&limit=12&productId=${productId}&userId=${user?.id}`)
            .then((result) => {
                if (result.ErrorCode === 0 && result.Data) {
                    setData(result.Data);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [user,productId])
    const handleSumbitMessage = (e) => {
        e.preventDefault();
        postFetch(`/api/client/comment`, {
            content: message,
            productId: productId,
            userId: user.id
        })
            .then((result) => {
                if (result.ErrorCode === 0 && result.Data) {
                    setData([...data, {
                        ...result.Data,
                        User: {
                            ...user
                        },
                        Likes: [],
                        total: {
                            like: 0,
                            dislike: 0
                        }
                    }])
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };
    return (
        <Fragment>
            <section className="section-b-space blog-detail-page review-page">
                <div className="breadcrumb-section" style={{ marginBottom: "50px" }}>
                    <Container>
                        <Row>
                            <Col sm="12">
                                <div className="page-title">
                                    <h2>Reviews</h2>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>

                {user &&
                    <div className="typography-box">
                        <form onSubmit={handleSumbitMessage}>
                            <div className="typo-content">
                                <div className="form-row">
                                    <div className="col-12 mb-3">
                                        <label className="form-label">Message</label>
                                        <textarea
                                            className="form-control"
                                            placeholder="Write Your Message"
                                            id="exampleFormControlTextarea1"
                                            rows="5"
                                            onChange={(e) => { setMessage(e.target.value) }}
                                        ></textarea>
                                    </div>
                                </div>

                            </div>
                            <div className="typography-box ">
                                <div className="typo-content typo-buttons">
                                    <button type='submit' className={`btn text-secondary me-3 mb-2`}>
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                }

                <Container>
                    <Row>
                        <Col sm="12">
                            <ul className="comment-section">
                                {data && data.length > 0 &&
                                    data.map((review) => {
                                        return (
                                            <MasterReview
                                                key={review.id}
                                                commentId={review.id}
                                                img={review.User.pic}
                                                name={review.User.fullname}
                                                datetime={review.createdAt}
                                                message={review?.content}
                                                likes={review?.total?.like}
                                                dislikes={review?.total?.dislike}
                                                userLike={review.Likes.length > 0 && review.Likes[0].like ? true : false}
                                                userDislike={review.Likes.length > 0 && review.Likes[0].dislike ? true : false}
                                                statusLike={review.Likes.length > 0 && review.Likes[0].like ? 1 : (review.Likes.length > 0 && review.Likes[0].dislike ? 2 : 0)}
                                            />
                                        );
                                    })}
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>

        </Fragment>
    )
})

export default Review