import React, { useState, useContext, useEffect } from "react";
//import { Context } from "..";
import "../styles/navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../icons/logo.svg";
import { observer } from "mobx-react-lite";

const NavBar = () => {
    // const { store } = useContext(Context);
    const [currentPage, setCurrentPage] = useState("");
    const sampleLocation = useLocation();

    useEffect(() => {
        //  console.log(sampleLocation);
        if (sampleLocation.pathname == "/") {
            setCurrentPage("/");
        }  else {
            setCurrentPage("/postid");
        }

        return () => {};
    }, [sampleLocation]);

    return (
        <div className="nav-bar">
            <div className="nav-bar-container">
                <span className="nav-header">
                    <img src={Logo} alt="React Logo" />
                    Cherniak Blog
                </span>
                <Link to="/">
                    <div
                        className={`nav-buttons ${
                            currentPage == "/" ? "current-loc" : ""
                        }`}
                    >
                        {" "}
                        <button
                           
                            onClick={() => setCurrentPage("posts")}
                        >
                            Posts
                        </button>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default observer(NavBar);
