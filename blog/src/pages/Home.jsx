import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {posts.map((post) => (
        <div
          key={post._id.$oid}
          onClick={() => navigate(`/post/${post._id}`)}
          className="bg-white shadow-md cursor-pointer rounded-lg overflow-hidden"
        >
          <img
            src={post.image}
            alt="Post"
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold">{post.author}</h2>
            <p className="text-gray-600">{post.content.slice(0, 33) + "..."}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span className="text-sm text-blue-500">
                {post.tags.join(", ")}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
