import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getFetch } from '../../../services/fetch-data';
import UserContext from '../../../helpers/user';
import { Spinner } from 'reactstrap';
const OAuthFacebook = () => {
    const context = useContext(UserContext);
    const history = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();
    console.log(searchParams.get('code'));
    useEffect(() => {
        getFetch(`/api/client/oauth/facebook?code=${searchParams.get('code')}`)
            .then((result) => {
                if (result.ErrorCode === 0) {
                    context.setUser(result.Data);
                    localStorage.setItem("userInfo", JSON.stringify(result.Data))
                    history(`/page/account/cart`);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])
    return (
        <><Spinner animation="border" variant="light" /></>
    )
}

export default OAuthFacebook