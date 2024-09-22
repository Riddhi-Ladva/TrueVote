import React, { useState } from 'react';

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

export default Post;
