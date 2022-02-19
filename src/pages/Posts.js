import React from "react";
import Post from "../components/Post";
import "../styles/Posts.css";

export const Posts = ({ posts }) => {
    return (
        <>
            <section className="hi-section">
                <header>{"<Hello World! />"}</header>

                <p>My name is Yurii Cherniak. Welcome to my blog!</p>
            </section>
            <div className="posts-grid">
                {posts &&
                    posts.map((post) => {
                        if (post.published) {
                            return (
                                <Post
                                    key={post._id}
                                    id={post._id}
                                    title={post.title}
                                    text={post.text}
                                    date={post.date}
                                    author={post.author}
                                    comments={post.comments}
                                />
                            );
                        } else {
                            return null;
                        }
                    })}
            </div>
        </>
    );
};
