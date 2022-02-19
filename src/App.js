import { useContext, useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import { Route, Routes, Navigate } from "react-router-dom";
import "./styles/App.css";
import { observer } from "mobx-react-lite";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Oval } from "react-loader-spinner";
import { Posts } from "./pages/Posts";
import BlogService from "./Services/BlogService";
import { Post } from "./pages/Post";

function App() {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(async () => {
        setLoading(true);
        let postsres = await BlogService.getPosts();
        //console.log(postsres.data.posts);
        setPosts(postsres.data.posts);
        setLoading(false);
    }, []);

    function getPrettyDate(d) {
        return (
            d.getDate() +
            "-" +
            (d.getMonth() + 1) +
            "-" +
            d.getFullYear() +
            " " +
            d.getHours() +
            ":" +
            d.getMinutes()
        );
    }
    
    if (loading) {
        return (
            <div className="App loading-container">
                {" "}
                <Oval color="#00BFFF" height={80} width={80} />
            </div>
        );
    }

    return (
        <div className="App">
            <NavBar />
            <div className="main-content">
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Posts posts={posts} />}
                    ></Route>
                    <Route
                        exact
                        path="/:postid"
                        element={<Post posts={posts} setPosts={setPosts} />}
                    ></Route>
                </Routes>
            </div>
            <footer>
                <div className="footer-container">
                    <div className="footer-img-container">
                        <div className="footer-icon">
                            <a
                                href="https://github.com/CherniakYura/blog_page_client"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="GitHub Repo"
                            >
                                <svg
                                    className="MuiSvgIcon-root"
                                    focusable="false"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    width="40px"
                                    height="40px"
                                >
                                    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"></path>
                                </svg>
                            </a>
                        </div>
                    </div>
                    <span className="project-desc">
                        Built with React, NodeJs, Express, and Mongo Db, this
                        blog was made for The Odin Project's NodeJs curriculum
                        by <strong>cher_niak</strong>. Find me on{" "}
                        <a
                            href="https://github.com/CherniakYura"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Github
                        </a>
                    </span>
                </div>
            </footer>
        </div>
    );
}

export default App;
