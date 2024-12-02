// src/pages/Post.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  const fetchPostById = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch post");
      }

      const data = await response.json();
      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  useEffect(() => {
    fetchPostById();
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-5">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <img
        src={post.image}
        alt="Post"
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <div className="text-gray-700">
        <p className="mb-4">{post.content}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
          <span className="text-sm text-blue-500">{post.tags.join(", ")}</span>
        </div>
        <p className="text-sm text-gray-500">Author: {post.author}</p>
      </div>
      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => window.history.back()}
      >
        Go to Home
      </button>
    </div>
  );
};

export default Post;
