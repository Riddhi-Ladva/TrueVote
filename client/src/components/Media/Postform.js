import React, { useState } from 'react';

const PostForm = ({ addPost }) => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');
  const [type, setType] = useState('image');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));
      setType(selectedFile.type.startsWith('video') ? 'video' : 'image');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file && caption) {
      addPost({ media: file, caption, type });
      setFile(null);
      setCaption('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <input 
        type="file" 
        accept="image/*,video/*" 
        onChange={handleFileChange} 
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

export default PostForm;
