import { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('https://blog-app-back-dsyd.onrender.com/post');
        if (response.ok) {
          const posts = await response.json();
          setPosts(posts);
        } else {
          setError('Failed to fetch posts. Please try again later.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching posts. Please try again later.');
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {posts.length > 0 && posts.map(post => (
        <Post key={post.id} {...post} />
      ))}
    </>
  );
}
