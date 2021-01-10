import React from 'react';
import { Link  } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="container-fluid text-white bg-dark py-2 px-5 mt-auto">
      <div className="row justify-content-between">
        <div className="col-12 text-right">
          <small className="mr-2">Copyright &#169; <span className="font-weight-bold">{(new Date().getFullYear())}</span> </small>
          <small className="text-primary text-nowrap font-weight-bold"><Link to="/">URL Shortener</Link></small>
        </div>
      </div>
    </footer>
  )
}

export default Footer
