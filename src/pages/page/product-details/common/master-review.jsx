import React, { useContext } from 'react'
import { useCallback } from 'react';
import { useState } from 'react';
import { Media } from 'reactstrap';
import UserContext from '../../../../helpers/user';
import { postFetch } from '../../../../services/fetch-data';
const MasterReview = ({ img, name, datetime, message, likes, dislikes, commentId, userLike, userDislike, statusLike }) => {
    const { user } = useContext(UserContext);
    const [like, setLike] = useState(userLike);
    const [dislike, setDislike] = useState(userDislike);
    const [numLike, setNumLike] = useState(likes);
    const [numdislike, setNumDislike] = useState(dislikes);

    const checkStatus = useCallback((para) => {
        // Status : Like comment
        if (para.like && !para.dislike) {
            if (para.sendLike) return { like: false, dislike: false, countLike: -1, countDislike: 0 };
            if (para.sendDislike) return { like: false, dislike: true, countLike: -1, countDislike: 1 };
        }
        // Status : Dislike comment
        if (!para.like && para.dislike) {
            if (para.sendLike) return { like: true, dislike: false, countLike: 1, countDislike: -1 };
            if (para.sendDislike) return { like: false, dislike: false, countLike: 0, countDislike: -1 };
        }
        // Status : Non Like or Dislike comment
        if (!para.like && !para.dislike) {
            if (para.sendLike) return { like: true, dislike: false, countLike: 1, countDislike: 0 };
            if (para.sendDislike) return { like: false, dislike: true, countLike: 0, countDislike: 1 };
        }
    })

    const handleLike = () => {
        let status = checkStatus({ like, dislike, sendLike: true, sendDislike: false })
        postFetch(`/api/client/like`, { ...status, commentId, userId: user.id })
            .then((result) => {
                if (result.ErrorCode === 0) {
                    setLike(status.like);
                    setDislike(status.dislike);
                    setNumLike(numLike + status.countLike);
                    setNumDislike(numdislike + status.countDislike);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };
    const handleDislike = (e) => {
        let status = checkStatus({ like, dislike, sendLike: false, sendDislike: true })
        postFetch(`/api/client/like`, { ...status, commentId, userId: user.id })
            .then((result) => {
                if (result.ErrorCode === 0) {
                    setLike(status.like);
                    setDislike(status.dislike);
                    setNumLike(numLike + status.countLike);
                    setNumDislike(numdislike + status.countDislike);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    };
    return (
        <li style={{ width: "100%" }}>
            <div className="media">
                <Media src={`${img}`} alt="Generic placeholder image" />
                <div className="media-body">
                    <h6>
                        {name} <span>({datetime})</span>
                    </h6>
                    <p>{message}</p>
                    <ul className="comnt-sec" style={{ float: "right" }}>
                        {user &&
                            <>
                                <li>
                                    <a>
                                        {like &&
                                            <div className="like" onClick={handleLike} style={{ color: "blue" }}>
                                                <i className="fa fa-thumbs-o-up" aria-hidden="true" style={{ scale: '2' }}></i>
                                                <span>({numLike})</span>
                                            </div>
                                        }
                                        {!like &&
                                            <div className="like" onClick={handleLike}>
                                                <i className="fa fa-thumbs-o-up" aria-hidden="true" style={{ scale: '2' }}></i>
                                                <span>({numLike})</span>
                                            </div>
                                        }
                                    </a>
                                </li>
                                <li>
                                    <a >
                                        {dislike &&
                                            <div className="unlike" onClick={handleDislike} style={{ color: "blue" }}>
                                                <i className="fa fa-thumbs-o-down" aria-hidden="true" style={{ scale: '2' }}></i>
                                                <span>({numdislike})</span>
                                            </div>
                                        }
                                        {!dislike &&
                                            <div className="unlike" onClick={handleDislike} >
                                                <i className="fa fa-thumbs-o-down" aria-hidden="true" style={{ scale: '2' }}></i>
                                                <span>({numdislike})</span>
                                            </div>
                                        }
                                    </a>
                                </li>
                            </>
                        }
                        {!user &&
                            <>
                                <li>
                                    <a>
                                        <div className="like">
                                            <i className="fa fa-thumbs-o-up" aria-hidden="true" style={{ scale: '2' }}></i>
                                            <span>({numLike})</span>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <div className="unlike">
                                            <i className="fa fa-thumbs-o-down" aria-hidden="true" style={{ scale: '2' }}></i>
                                            <span>({numdislike})</span>
                                        </div>
                                    </a>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </li>
    );
}

export default MasterReview