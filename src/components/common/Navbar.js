import React from 'react';
import { Link  } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light">
      <Link to="/" className="navbar-brand"><i className="fas fa-link mr-2 text-primary"></i><span className="font-weight-bold">{process.env.REACT_APP_NAME}</span></Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
      <i className="fas fa-angle-double-down"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbar">
        <ul className="navbar-nav ml-auto mt-2 mt-sm-0">
          <li className="nav-item">
            <Link to="/register" className="nav-link btn btn-primary btn-register px-3 mx-1 font-weight-bold rounded-0 text-white">Register</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link btn btn-login px-3 mx-1 font-weight-bold rounded-0"><u>Login</u></Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
