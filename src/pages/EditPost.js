import { useEffect, useState } from "react";
import 'react-quill/dist/quill.snow.css';
import { Navigate, useParams } from "react-router-dom";
import Editor from "../Editor";

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch('https://blog-app-back-dsyd.onrender.com/post/' + id);
        if (response.ok) {
          const postInfo = await response.json();
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        } else {
          setError('Failed to fetch post data. Please try again later.');
        }
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching post data. Please try again later.');
      }
    };

    fetchPost();
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    setError(null); // Reset error message before a new attempt

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }

    try {
      const response = await fetch('https://blog-app-back-dsyd.onrender.com/post', {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        setRedirect(true);
      } else {
        setError('Failed to update post. Please try again later.');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while updating the post. Please try again later.');
    }
  }

  if (redirect) {
    return <Navigate to={'/post/' + id} />;
  }

  return (
    <div>
      <form onSubmit={updatePost}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={ev => setTitle(ev.target.value)}
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={ev => setSummary(ev.target.value)}
        />
        <input
          type="file"
          onChange={ev => setFiles(ev.target.files)}
        />
        <Editor onChange={setContent} value={content} />
        <button style={{ marginTop: '5px' }}>Update Post</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
