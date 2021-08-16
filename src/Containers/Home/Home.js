import React from 'react';
import { Link } from 'react-router-dom';

function Home(pros) {
  return (
    <>
      <h1>home</h1>
      <Link to="/articles/1">voir article</Link>
    </>
  )
}

export default Home;