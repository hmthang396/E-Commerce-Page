import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Col, Media, Row } from 'reactstrap';
import fashion from "../../../assets/images/mega-menu/fashion.jpg";
import { getFetch } from '../../../services/fetch-data';

const SideBar = () => {
    const [catagories, setCategories] = useState([]);

    useEffect(() => {
        getFetch(`/api/client/category/all`)
            .then((result) => {
                console.log(result);
                if (result.ErrorCode === 0) {
                    setCategories(result.Data)
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const closeNav = () => {
        var closemyslide = document.getElementById("mySidenav");
        if (closemyslide) closemyslide.classList.remove("open-side");
    };

    const handleSubmenu = (event) => {
        if (event.target.classList.contains("sub-arrow")) {
            return;
        }

        if (event.target.nextElementSibling.classList.contains("opensub1"))
            event.target.nextElementSibling.classList.remove("opensub1");
        else {
            document.querySelectorAll(".opensub1").forEach(function (value) {
                value.classList.remove("opensub1");
            });
            event.target.nextElementSibling.classList.add("opensub1");
        }
    };

    const handleSubTwoMenu = (event) => {
        if (event.target.classList.contains("sub-arrow")) return;

        if (event.target.nextElementSibling.classList.contains("opensub2"))
            event.target.nextElementSibling.classList.remove("opensub2");
        else {
            document.querySelectorAll(".opensub2").forEach(function (value) {
                value.classList.remove("opensub2");
            });
            event.target.nextElementSibling.classList.add("opensub2");
        }
    };
    const handleSubThreeMenu = (event) => {
        if (event.target.classList.contains("sub-arrow")) return;

        if (event.target.nextElementSibling.classList.contains("opensub3"))
            event.target.nextElementSibling.classList.remove("opensub3");
        else {
            document.querySelectorAll(".opensub3").forEach(function (value) {
                value.classList.remove("opensub3");
            });
            event.target.nextElementSibling.classList.add("opensub3");
        }
    };

    const handleSubFourMenu = (event) => {
        if (event.target.classList.contains("sub-arrow")) return;

        if (event.target.nextElementSibling.classList.contains("opensub4"))
            event.target.nextElementSibling.classList.remove("opensub4");
        else {
            document.querySelectorAll(".opensub4").forEach(function (value) {
                value.classList.remove("opensub4");
            });
            event.target.nextElementSibling.classList.add("opensub4");
        }
    };

    const handleMegaSubmenu = (event) => {
        if (event.target.classList.contains("sub-arrow")) return;

        if (event.target.nextElementSibling.classList.contains("opensidesubmenu"))
            event.target.nextElementSibling.classList.remove("opensidesubmenu");
        else {
            event.target.nextElementSibling.classList.add("opensidesubmenu");
        }
    };
    return (
        <Fragment>
            <div id="mySidenav" className="sidenav">
                <a className="sidebar-overlay" onClick={closeNav}></a>
                <nav>
                    <a onClick={closeNav}>
                        <div className="sidebar-back text-start">
                            <i className="fa fa-angle-left pe-2" aria-hidden="true"></i> Back
                        </div>
                    </a>
                    <ul id="sub-menu" className="sidebar-menu">
                        <li>
                            <a onClick={(e) => handleSubmenu(e)}>
                                MEN
                                <span className="sub-arrow"></span>
                            </a>
                            <ul>
                                {catagories && catagories.length > 0 &&
                                    catagories.map((category) => {
                                        return (
                                            <li key={Math.random()}>
                                                <a onClick={(e) => handleSubTwoMenu(e)} key={category.id}>
                                                    {category.title}
                                                    <span className="sub-arrow"></span>
                                                </a>
                                                <ul key={Math.random()}>
                                                    {
                                                        category.SubCategories.map((sub) => {
                                                            return (
                                                                <li key={sub.id}>
                                                                    <Link to={`/search?type=men&category=${category.title}&subCategory=${sub.title}`} key={Math.random()}>{sub.title}</Link>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </li>
                        <li>
                            <a>
                                WOMEN
                                <span className="sub-arrow"></span>
                            </a>
                            <ul>
                                {catagories && catagories.length > 0 &&
                                    catagories.map((category) => {
                                        return (
                                            <li key={Math.random()}>
                                                <a onClick={(e) => handleMegaSubmenu(e)} key={category.id}>
                                                    {category.title}
                                                    <span className="sub-arrow"></span>
                                                </a>
                                                <ul key={Math.random()}>
                                                    {
                                                        category.SubCategories.map((sub) => {
                                                            return (
                                                                <li key={sub.id}>
                                                                    <Link to={`/search?type=women&category=${category.title}&subCategory=${sub.title}`} key={Math.random()}>{sub.title}</Link>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </li>
                        <li>
                            <a>
                                Kids
                                <span className="sub-arrow"></span>
                            </a>
                            <ul>
                                {catagories && catagories.length > 0 &&
                                    catagories.map((category) => {
                                        return (
                                            <li key={Math.random()}>
                                                <a onClick={(e) => handleMegaSubmenu(e)} key={category.id}>
                                                    {category.title}
                                                    <span className="sub-arrow"></span>
                                                </a>
                                                <ul key={Math.random()}>
                                                    {
                                                        category.SubCategories.map((sub) => {
                                                            return (
                                                                <li key={sub.id}>
                                                                    <Link to={`/search?type=kids&category=${category.title}&subCategory=${sub.title}`} key={Math.random()}>{sub.title}</Link>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </Fragment>
    )
}

export default SideBar