// In FullPost.js
import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";
import striptags from "striptags";
import { Link, useParams } from "react-router-dom";

const Post = () => {
  const [post, setPost] = useState(null);
  const { postId } = useParams(); // Get the postId from the route

  useEffect(() => {
    // Fetch the full post details using the postId
    fetch(`http://localhost:4000/post/${postId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPost(data.data);
        console.log("post.body:", post.body);
      })
      .catch((error) => {
        console.log("Error fetching post details:", error);
      });
  }, [postId]);

  return (
    <div className="wrapper w-2/4 mx-auto">
      {post ? (
        <div>
          <h3 className="text-3xl text-center font-semibold text-gray-800 mb-4">
            {post.title}
          </h3>
          {post.body && (
            <div className="prose">
              {HTMLReactParser((post.body))}
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/blogs">Back to Posts</Link>
    </div>
  );
};

export default Post;
