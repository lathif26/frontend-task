import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';

const Reddit = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://www.reddit.com/r/reactjs.json')
      .then(res => res.json())
      .then(data => setPosts(data.data.children))
      .catch(console.log);
  }, []);

  const sanitizeHtml = html => ({
    __html: DOMPurify.sanitize(html)
  });

  const parseContent = content => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('* ')) {
        return <li key={index}>{line.substring(2)}</li>;
      }
      return <p key={index}>{line}</p>;
    });
  };

  return (
    <div className="reddit-container">
      {posts.map(post => (
        <div key={post.data.id} className="reddit-card">
          <h2>{post.data.title}</h2>
          {post.data.selftext && (
            <div className="reddit-content">{parseContent(post.data.selftext)}</div>
          )}
          <a href={post.data.url} target="_blank" rel="noopener noreferrer">Read more</a>
          <div className="reddit-score">Score -{post.data.score}</div>
        </div>
      ))}
    </div>
  );
};

export default Reddit;


