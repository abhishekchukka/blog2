import { useState, useEffect } from "react";
import { useAuth } from "../Authcontext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { token } = useAuth();
  const [posts, setPosts] = useState([]);
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [tags, setTags] = useState("");
  const [userProfile, setUserProfile] = useState({ username: "", email: "" });
  const navigate = useNavigate();

  const yourToken = localStorage.getItem("jwtToken");

  const fetchUserProfile = async () => {
    if (!token) return;
    try {
      const response = await fetch("http://localhost:5000/api/users/current", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const data = await response.json();
      setUserProfile({
        email: data.user.email,
        exp: data.user.exp,
        username: data.user.username,
      });
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/posts/user/1", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${yourToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user posts");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUserProfile();
      fetchUserPosts();
    }
  }, [token]);

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (postContent.trim() && postTitle.trim()) {
      const newPost = {
        title: postTitle,
        content: postContent,
        author: userProfile.username,
        image: imageURL,
        tags: tags.split(",").map((tag) => tag.trim()),
      };
      createPost(newPost);
      setPosts([...posts, newPost]);
      setPostContent("");
      setPostTitle("");
      setImageURL("");
      setTags("");
    }
  };

  const createPost = async (newPost) => {
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${yourToken}`,
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error("Failed to create a new post");
      }

      const data = await response.json();
      setPosts((prevPosts) => [...prevPosts, data]);
    } catch (error) {
      console.error("Error creating a new post:", error);
    }
  };
  const handleDelete = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/posts/${postId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwtToken")}`, // Use the token from localStorage
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      // Update the state after deletion
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete the post. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="rounded-full mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold">{userProfile.username}</h2>
          <p className="text-sm text-gray-500">{userProfile.email}</p>
        </div>
      </div>

      <form onSubmit={handlePostSubmit} className="mb-4">
        <input
          type="text"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          placeholder="Title"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          placeholder="Image URL"
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-2 border rounded mb-2"
          rows="3"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Post
        </button>
      </form>

      <div>
        <h3 className="text-xl font-semibold mb-2">Your Posts</h3>
        <ul className="space-y-2">
          {posts.map((post, index) => (
            <li
              key={post._id}
              className="flex space-x-5 items-center p-2 border rounded cursor-pointer hover:bg-gray-100"
              onClick={() => navigate(`/post/${post._id}`)}
            >
              <span className="mr-4">{index + 1}.</span>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="w-20 h-20 object-cover mr-4"
                />
              )}
              <div>
                <h4 className="font-bold">{post.title}</h4>
                <p className="text-sm text-gray-500">
                  Tags: {post.tags.join(", ")}
                </p>
              </div>
              <p className="text-sm text-gray-500">content: {post.content}</p>
              <button
                className="ml-auto bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDelete(post._id);
                  navigate("/dashboard");
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
