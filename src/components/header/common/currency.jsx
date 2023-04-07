import React from 'react'
import { Media } from 'reactstrap';

const Currency = ({ icon }) => {
    let data = [];
    let language = [
        { "lang": "English", "val": "en" },
        { "lang": "Franch", "val": "fn" }
    ]
    const changeLanguage = (lng) => {
    };
    const selectedCurrency = () =>{

    };
    return (
        <li className="onhover-div mobile-setting">
            <div>
                <Media src={icon} className="img-fluid" alt="" />
                <i className="fa fa-cog"></i>
            </div>
            <div className="show-div setting">
                <h6>language</h6>
                <ul>
                    {language.map((item, i) => (
                        <li key={i}>
                            <a
                                href={null}
                                onClick={() => {
                                    changeLanguage(item.val);
                                }}
                            >
                                {item.lang}
                            </a>
                        </li>
                    ))}
                </ul>
                <h6>currency</h6>
                <ul className="list-inline">
                    {data &&
                        data.getCurrency.map((cur, i) => (
                            <li key={i}>
                                <div onClick={() => selectedCurrency(cur)}>
                                    {cur.symbol} {cur.currency}
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </li>
    )
}

export default Currency;