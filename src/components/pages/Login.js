import React, { useState } from 'react';
import NotificationModal from '../common/NotificationModal';
import Loader from '../common/Loader';

const Login = ({message}) => {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      {showLoader ? <Loader /> : null}
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-5 text-center">
            {message ? <NotificationModal message={message} /> : ''}
            LOGIN FORM
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
