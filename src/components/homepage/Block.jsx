import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './block.css';

const Block = ({ title, icon, path }) => {
  return (
    <div className="block">
      <Link to={path} className="block-link">
        <div className="block-icon">
          <div className="icon">
            {icon}
          </div>
          
          </div>
        <div className="block-title">{title}</div>
      </Link>
    </div>
  );
};

export default Block;
