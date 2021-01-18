import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ResetPasswordAnimation from '../animations/ResetPasswordAnimation';
import Loader from '../common/Loader';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import NotificationModal from '../common/NotificationModal';

const ResetPassword = () => {
  document.title = `${process.env.REACT_APP_NAME} - Reset Password`;
  const token = window.location.href.replace(`${process.env.REACT_APP_URL}/forgot-password?`, '');
  const [cookies] = useCookies(['access_token']);

  const [showLoader, setShowLoader] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [formValidated, setFormValidated] = useState(false);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [validationFailedPassword, setValidationFailedPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
        url: `${process.env.REACT_APP_API_URL}/change-password?${token}`,
        data: {
          'password': password,
          'password_confirmation': confirmPassword,
        },
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(response => {
        setSuccessMessage(response.data.message);
        setErrorMessage('');
        setPassword('');
        setConfirmPassword('');
      }).catch(error => {
        setSuccessMessage('');
        setErrorMessage(error.response.data.message);
        if (error.response.data['errors'] && error.response.data['errors']['password']) {
          setValidationFailedPassword(error.response.data['errors']['password']);
        } else {
          setValidationFailedPassword('');
        }
      }).finally(() => {
        setShowLoader(false);
      });
  }

  if (cookies['access_token']) {
    return (
      <Redirect to ="/" />
    )
  }

  const redirectLogin = () => {
    setSuccessMessage('');
    setRedirect(true);
  }

  return (
    <>
      {redirect ? <Redirect to ="/login" /> : null}
      {showLoader ? <Loader /> : null}
      {successMessage ? <NotificationModal closeModal={() => redirectLogin()} message={{ text: successMessage, error: false }} /> : ''}
      {errorMessage ? <NotificationModal closeModal={() => setErrorMessage('')} message={{ text: errorMessage, error: true }} /> : ''}
      <div className={'container-fluid transition-slow my-auto' + (showLoader ? ' disabled-div' : '')}>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-9 col-md-5 col-lg-4 text-right register-lottie">
            <div className="lottie-animation mx-auto">
              <ResetPasswordAnimation />
            </div>
            <div className="mr-sm-4 mr-lg-5 small mb-4"><a target="_blank" rel="noopener noreferrer" href="https://lottiefiles.com/8857-data-security">Shinan @LottieFiles</a></div>
          </div>
        </div>

        <div className="row justify-content-center mb-4">
          <div className="col-11 col-md-7 col-xl-5 px-0">
            <form className={'row justify-content-end no-gutters ' + (formValidated ? 'was-validated' : '')} noValidate onSubmit={(event) => handleSubmit(event)}>
              <div className="col-12 mt-2">
                <input type="password" minLength="8" onChange={(e) => setPassword(e.target.value)} value={password} name="password" className="form-control py-4 main-input" placeholder="New password" required/>
              </div>
              <div className="col-12 mt-2">
                <input type="password" minLength="8" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} name="confirm-password" className="form-control py-4 main-input" placeholder="Confirm new password" required/>
                {validationFailedPassword ? <div className="small text-danger">{validationFailedPassword}</div> : ''}
              </div>
              <div className="col-7 col-sm-4 mt-2">
                <button className="btn btn-block btn-primary py-3">
                  <span className="font-weight-bold">Reset Password</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword
