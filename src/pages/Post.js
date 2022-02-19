import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "../styles/Post.css";
import { Oval } from "react-loader-spinner";
import BlogService from "../Services/BlogService";

export const Post = ({ posts, setPosts }) => {
    const [loading, setLoading] = useState(false);
    const { postid } = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [user, setUser] = useState("");
    const [text, setText] = useState("");

    useEffect(async () => {
        setLoading(true);
        try {
            const {
                data: { post },
            } = await BlogService.getPost(postid);

            setPost(post);

            const {
                data: { comments },
            } = await BlogService.getPostComments(postid);
          //  console.log(comments);
            setComments(comments);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
        return () => {};
    }, []);

    async function postComment(user, text) {
        try {
            setComments([...comments, { user, text, date: Date.now() }]);
            setPosts(
                posts.map((post) => {
                    if (post._id == postid) {
                        post.comments = [
                            ...post.comments,
                            { user, text, date: Date.now() },
                        ];
                        return post;
                    }
                    return post;
                })
            );

            const res = await BlogService.postComment(postid, user, text);
            setUser("");
            setText("");
        } catch (error) {
            console.log(error);
        }
    }

    function getPrettyDate(d) {
        return (
            d.getDate() +
            "." +
            (d.getMonth() + 1) +
            "." +
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
        <>
            <div className="post-container card">
                <header className="post-title"> {post.title} </header>
                <p className="post-title-desc">
                    <i> {getPrettyDate(new Date(post.date))} </i>by{" "}
                    {post.author}
                </p>
                <hr></hr>
                <div className="post-text"> {post.text}</div>
            </div>

            <div className="comments-container card">
                <span className="comments-header">Add a comment</span>
                <div className="add-comment-container">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            postComment(user, text);
                        }}
                    >
                        <div className="comment-form-group">
                            <label htmlFor="user">Name:</label>
                            <input
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                                type="text"
                                name="user"
                                required
                            />
                        </div>
                        <div className="comment-form-group">
                            <label htmlFor="text">Comment:</label>
                            <textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                name="text"
                                required
                            ></textarea>
                        </div>
                        <button type="sebmit">Submit comment</button>
                    </form>
                </div>
                <span className="comments-header">
                    Comments ({comments.length})
                </span>

                {comments.map((comment) => {
                    return (
                        <div className="comment-container">
                            <span className="comment-name">{comment.user}</span>
                            <span className="comment-text">{comment.text}</span>
                            <span className="comment-date">
                                {getPrettyDate(new Date(comment.date))}
                            </span>
                        </div>
                    );
                })}
            </div>
        </>
    );
};
