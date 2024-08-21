import React, { useState } from 'react';
import './MediaPage.css';

const Media = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="media-page">
      <br/><br/><h1>Media Feed</h1>
      <PostForm addPost={addPost} />
      <div className="feed">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

const Post = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  const handleAddComment = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  return (
    <div className="post">
      {post.type === 'video' ? (
        <video controls style={{ maxWidth: '100%' }}>
          <source src={post.media} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={post.media} alt="Post" style={{ maxWidth: '100%' }} />
      )}
      <p>{post.caption}</p>
      <div>
        <input 
          type="text" 
          placeholder="Add a comment..." 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
        />
        <button onClick={handleAddComment}>Post</button>
      </div>
      <div className="comments">
        {comments.map((c, index) => (
          <p key={index}>{c}</p>
        ))}
      </div>
    </div>
  );
};

const PostForm = ({ addPost }) => {
  const [media, setMedia] = useState('');
  const [caption, setCaption] = useState('');
  const [type, setType] = useState('image');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (media && caption) {
      addPost({ media, caption, type });
      setMedia('');
      setCaption('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="image">Image</option>
        <option value="video">Video</option>
      </select>
      <input 
        type="text" 
        placeholder={type === 'image' ? 'Image URL' : 'Video URL'} 
        value={media} 
        onChange={(e) => setMedia(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Caption" 
        value={caption} 
        onChange={(e) => setCaption(e.target.value)} 
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default Media;
