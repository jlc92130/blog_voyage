import React from 'react';

function Article(props) {
  return (
    <>
    <h1>article</h1>
    { props.location.state && props.location.state.fromHome ? <p>click depuis home</p> : null}
    </>
  ); 
  
}

export default Article;