import React from 'react';
import { Link  } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="container-fluid text-white bg-dark py-2 px-5 mt-auto">
      <div className="row justify-content-between">
        <div className="col email-contact">
          <small className="text-gray-muted mr-2">contact@axe.lu</small>
        </div>
        <div className="col-auto text-center text-sm-right">
          <small className="mr-2">Copyright &#169; <span className="font-weight-bold">{(new Date().getFullYear())}</span> </small>
          <small className="text-primary text-nowrap font-weight-bold"><Link to="/">{process.env.REACT_APP_NAME}</Link></small>
        </div>
      </div>
    </footer>
  )
}

export default Footer
