import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>My Advanced App</h1>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  );
};

export default Header;
