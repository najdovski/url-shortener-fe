import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import NotificationModal from '../common/NotificationModal';
import LoginAnimation from '../animations/LoginAnimation';
import Loader from '../common/Loader';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Login = ({message}) => {
  document.title = `${process.env.REACT_APP_NAME} - Login`;

  const [showLoader, setShowLoader] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [propMessage, setPropMessage] = useState('');
  useEffect(() => {
    setPropMessage(message);
  }, []);

  const [formValidated, setFormValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationFailedEmail, setValidationFailedEmail] = useState(false);
  const [validationFailedPassword, setValidationFailedPassword] = useState(false);

  const [resetPassword, setResetPassword] = useState(false);

  const [redirect, setRedirect] = useState(false);

  const [, setCookie] = useCookies(['access_token']);

  const storeAccessToken = (token) => {
    let expirationTime = new Date();
    expirationTime.setTime(expirationTime.getTime() + (4320*60*1000)); // 3 days

    setCookie('access_token', token, { path: '/', expires: expirationTime });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      setFormValidated(true);
      return;
    } else {
      setFormValidated(false);
    };
    setShowLoader(true);

    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/login`,
      data: {
        'email': email,
        'password': password,
      },
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      storeAccessToken(response.data['access_token']);
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setEmail('');
      setPassword('');
      setRedirect(true);
    }).catch(error => {
      setErrorMessage(error.response.data.message);
      setSuccessMessage('');
      if (error.response.data['errors'] && error.response.data['errors']['email']) {
        setValidationFailedEmail(error.response.data['errors']['email']);
      } else {
        setValidationFailedEmail('');
      }
      if (error.response.data['errors'] && error.response.data['errors']['password']) {
        setValidationFailedPassword(error.response.data['errors']['password']);
      } else {
        setValidationFailedPassword('');
      }
      setShowLoader(false);
    });
  }

  const handleResetPassword = () => {
    setResetPassword(!resetPassword);
  }

  return (
    <>
      {redirect ? <Redirect to="/my-urls" /> : null}
      {showLoader ? <Loader /> : null}
      <div className={'container-fluid transition-slow my-auto' + (showLoader ? ' disabled-div' : '')}>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-9 col-md-5 col-lg-4 text-right register-lottie">
            <LoginAnimation />
            <div className="mr-sm-4 mr-lg-5 small mb-4"><a target="_blank" rel="noopener noreferrer" href="https://lottiefiles.com/38435-register">Avinash Reddy @LottieFiles</a></div>
          </div>
        </div>
        {successMessage ? <NotificationModal closeModal={() => setSuccessMessage('')} message={{ text: successMessage, error: false }} /> : ''}
        {errorMessage ? <NotificationModal closeModal={() => setErrorMessage('')} message={{ text: errorMessage, error: true }} /> : ''}
        {propMessage ? <NotificationModal closeModal={() => setPropMessage('')} message={propMessage} /> : ''}
        <div className="row justify-content-center mb-4">
          <div className="col-11 col-md-7 col-xl-5 px-0">
            <form className={'row justify-content-end no-gutters ' + (formValidated ? 'was-validated' : '')} noValidate onSubmit={(event) => handleSubmit(event)}>
              <div className="col-12">
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} name="email" className="form-control py-4 main-input" placeholder="Your email" required/>
                {validationFailedEmail ? <div className="small text-danger">{validationFailedEmail}</div> : ''}
              </div>
              {!resetPassword ? 
                <div className="col-12 mt-2">
                  <input type="password" minLength="8" onChange={(e) => setPassword(e.target.value)} value={password} className="form-control py-4 main-input" placeholder="Your password" required/>
                  {validationFailedPassword ? <div className="small text-danger">{validationFailedPassword}</div> : ''}
                </div>
              : ''}
              <div className="col align-self-center text-danger small">
                <span className="cursor-pointer" onClick={handleResetPassword}><u>{resetPassword ? 'Back to Login' : 'Forgot Password?' }</u></span>
              </div>
              <div className="col-4 mt-2">
                <button className="btn btn-block btn-primary py-3">
                  <span className="font-weight-bold">{resetPassword ? 'Reset Password' : 'Login' }</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
