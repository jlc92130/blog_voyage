import React from 'react';
import { Link } from 'react-router-dom';

function Home(pros) {
  return (
    <>
      <h1>home</h1>
      <Link to="/articles/1">voir article</Link>
      <Link 
        to={{
          pathname: "/articles/1",
          // hash: '#projets'
          // search: "?order=new"
          state: {fromHome: true}
        }} 
        style={{marginLeft: '15px'}} >lien vers ancre</Link>

    </>
  )
}

export default Home;