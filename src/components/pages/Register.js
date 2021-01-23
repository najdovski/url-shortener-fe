import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import RegisterAnimation from '../animations/RegisterAnimation';
import NotificationModal from '../common/NotificationModal';
import axios from 'axios';
import Loader from '../common/Loader';
import { useCookies } from 'react-cookie';
import UpdateHtml from '../common/UpdateHtml';

const Register = ({message}) => {
  document.title = `${process.env.REACT_APP_NAME} - Register`;
  const [cookies] = useCookies(['access_token']);

  const [propMessage, setPropMessage] = useState('');
  useEffect(() => {
    setPropMessage(message);
  }, []);

  const [formValidated, setFormValidated] = useState(false);
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [resendEmail, setResendEmail] = useState('');

  const [showLoader, setShowLoader] = useState(false);

  const [validationFailedRegisterName, setValidationFailedRegisterName] = useState('');
  const [validationFailedRegisterEmail, setValidationFailedRegisterEmail] = useState('');
  const [validationFailedRegisterPassword, setValidationFailedRegisterPassword] = useState('');

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
      url: `${process.env.REACT_APP_API_URL}/register`,
      data: {
        'name': registerName,
        'email': registerEmail,
        'password': registerPassword,
        'password_confirmation': registerConfirmPassword
      },
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      setResendEmail(registerEmail);
      setRegisterName('');
      setRegisterEmail('');
      setRegisterPassword('');
      setRegisterConfirmPassword('');
      setSuccessMessage(response.data.message);
      setErrorMessage('');
      setValidationFailedRegisterName('');
      setValidationFailedRegisterEmail('');
      setValidationFailedRegisterPassword('');
    })
    .catch((error) => {
      setErrorMessage(error.response.data.message);
      setSuccessMessage('');
      if (error.response.data['errors'] && error.response.data['errors']['name']) {
        setValidationFailedRegisterName(error.response.data['errors']['name']);
      } else {
        setValidationFailedRegisterName('');
      }

      if (error.response.data['errors'] && error.response.data['errors']['email']) {
        setValidationFailedRegisterEmail(error.response.data['errors']['email']);
      } else {
        setValidationFailedRegisterEmail('');
      }

      if (error.response.data['errors'] && error.response.data['errors']['password']) {
        setValidationFailedRegisterPassword(error.response.data['errors']['password']);
      } else {
        setValidationFailedRegisterPassword('');
      }
    }).finally(() => {
      setShowLoader(false);
    });
  }

  // Resend email
  const handleResetEmail = () => {
    setShowLoader(true);
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/email/resend`,
      data: {
        'email': resendEmail,
      },
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      setErrorMessage('');
      setSuccessMessage(response.data.message);
    })
    .catch(error => {
      setErrorMessage(error.response.data.message);
      setSuccessMessage('');
    }).finally(() => {
      setShowLoader(false)
    });
  }

  return (
    <>
    <UpdateHtml component="Register" />
    {cookies['access_token'] ? <Redirect to ="/" /> : null}
    {showLoader ? <Loader /> : null}
    <div className={'container-fluid transition-slow my-auto' + (showLoader ? ' disabled-div' : '')}>
      <div className="row justify-content-center">
        <div className="col-10 col-sm-9 col-md-5 col-lg-4 text-right register-lottie">
          <div className="lottie-animation mx-auto">
            <RegisterAnimation />
          </div>
          <div className="mr-sm-4 mr-lg-5 small mb-4"><a target="_blank" rel="noopener noreferrer nofollow" href="https://lottiefiles.com/38435-register">Avinash Reddy @LottieFiles</a></div>
        </div>
      </div>
      {successMessage ? <NotificationModal closeModal={() => setSuccessMessage('')} message={{ text: successMessage, error: false }} /> : ''}
      {errorMessage ? <NotificationModal closeModal={() => setErrorMessage('')} message={{ text: errorMessage, error: true }} /> : ''}
      {propMessage ? <NotificationModal closeModal={() => setPropMessage('')} message={propMessage} /> : ''}
      <div className="row justify-content-center mb-4">
        <div className="col-11 col-md-7 col-xl-5 px-0">
          <form className={'row justify-content-end no-gutters ' + (formValidated ? 'was-validated' : '')} noValidate onSubmit={(event) => handleSubmit(event)}>
            <div className="col-12">
              <input type="text" minLength="3" maxLength="100" onChange={(e) => setRegisterName(e.target.value)} value={registerName} name="name" className="form-control py-4 main-input" placeholder="Your name" required/>
              {validationFailedRegisterName ? <div className="small text-danger">{validationFailedRegisterName}</div> : ''}
            </div>
            <div className="col-12 mt-2">
              <input type="email" onChange={(e) => setRegisterEmail(e.target.value)} value={registerEmail} name="email" className="form-control py-4 main-input" placeholder="Your e-mail address" required/>
              {validationFailedRegisterEmail ? <div className="small text-danger">{validationFailedRegisterEmail}</div> : ''}
            </div>
            <div className="col-12 mt-2">
              <input type="password" minLength="8" onChange={(e) => setRegisterPassword(e.target.value)} value={registerPassword} name="password" className="form-control py-4 main-input" placeholder="Your desired password" required/>
            </div>
            <div className="col-12 mt-2">
              <input type="password" minLength="8" onChange={(e) => setRegisterConfirmPassword(e.target.value)} value={registerConfirmPassword} name="confirm-password" className="form-control py-4 main-input" placeholder="Password confirmation" required/>
              {validationFailedRegisterPassword ? <div className="small text-danger">{validationFailedRegisterPassword}</div> : ''}
            </div>
            {resendEmail ?
              <div className="col align-self-center text-danger small">
                <span className="cursor-pointer" onClick={handleResetEmail}><u>Resend Confirmation Email</u></span>
              </div>
            : ''}
            <div className="col-12 col-sm-7 col-md-4 mt-2">
              <button className="btn btn-block btn-primary py-3">
                <span className="font-weight-bold">Register</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}

export default Register
