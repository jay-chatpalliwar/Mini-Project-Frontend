import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";
import striptags from "striptags";
import { Link, useNavigate } from "react-router-dom";



const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the list of blog posts from the server when the component mounts
    fetch("http://localhost:4000/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.post);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog posts:", error);
      });
  }, []);

  const navigateToPost = (postId) => {
    navigate(`/blog/${postId}`);
  };

  return (
    <div className="container mx-auto px-4 w-3/4 bg-gray-100">
      <h3 className="text-3xl font-semibold text-gray-800 my-4 text-center mb-5">Blog Posts</h3>
      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-gray-300  rounded-lg shadow-lg p-4 transition-transform transform hover:scale-100"
            >
              <div className="p-4 flex flex-col gap-4 ">
                <h4 className="text-xl font-semibold text-black">{post.title}</h4>
                <div className="text-gray-800 ">
                  {HTMLReactParser(striptags(post.body).substring(0, 100))}...
                </div>
                <button className="w-2/3 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  <Link to={`/blog/${post._id}`}>Read More</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
