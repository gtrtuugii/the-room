// HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css';
import Block from './Block';

const blocks = [
  { title: 'Post', icon: '📱', path: '/home' },
  { title: 'Chat', icon: '💬', path: '/chat' },
  { title: 'Study', icon: '📚', path: '/study' },
  { title: 'Meme Creator', icon: '🃏', path: '/meme' },
  { title: 'Coming Soon', icon: '👾', path: '#' },





  // Add more blocks here
];

const HomePage = () => {
  return (
    <div className="home-page">
      {blocks.map((block, index) => (
        <Block key={index} title={block.title} icon={block.icon} path={block.path} />
      ))}
    </div>
  );
};

export default HomePage;
