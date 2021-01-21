import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ProfileAnimation from '../../animations/ProfileAnimation';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Loader from '../../common/Loader';
import NotificationModal from '../../common/NotificationModal';

const Profile = () => {
  document.title = `${process.env.REACT_APP_NAME} - Profile`;

  const [cookies, removeCookie] = useCookies(['access_token']);
  const [showLoader, setShowLoader] = useState(true);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [userId, setUserId] = useState(null);
  const [updateName, setUpdateName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updatePassword, setUpdatePassword] = useState('');
  const [updateConfirmPassword, setUpdateConfirmPassword] = useState('');

  const [currentName, setCurrentName] = useState('');

  const [formValidated, setFormValidated] = useState(false);
  const [validationFailedUpdateName, setValidationFailedUpdateName] = useState('');
  const [validationFailedUpdateEmail, setValidationFailedUpdateEmail] = useState('');
  const [validationFailedUpdatePassword, setValidationFailedUpdatePassword] = useState('');

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    let expirationTime = new Date(); // make it expired
    removeCookie('access_token', '', { path: '/', expires: expirationTime });
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/users/single`,
      headers: {
        Authorization: `Bearer ${cookies['access_token']}`,
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      setIsAuthenticated(true);
      setUserId(response.data.id);
      setUpdateName(response.data.name);
      setCurrentName(response.data.name);
      setUpdateEmail(response.data.email);
      setShowLoader(false);
    })
    .catch(() => {
      setIsAuthenticated(false);
      handleLogout();
      setSuccessMessage('');
    })
  }, []);

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
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/users/update`,
      data: {
        'user-id': userId,
        'name': updateName,
        'email': updateEmail,
        'password': updatePassword,
        'password_confirmation': updateConfirmPassword
      },
      headers: {
        Authorization: `Bearer ${cookies['access_token']}`,
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      setSuccessMessage(response.data.message);
      setCurrentName(updateName);
      setErrorMessage('');
      setUpdatePassword('');
      setUpdateConfirmPassword('');
    })
    .catch(error => {
      setErrorMessage(error.response.data.message);
      setSuccessMessage('');
      if (error.response.data['errors']) {
        if (error.response.data['errors']['name']) {
          setValidationFailedUpdateName(error.response.data['errors']['name']);
        } else {
          setValidationFailedUpdateName('');
        }

        if (error.response.data['errors']['email']) {
          setValidationFailedUpdateEmail(error.response.data['errors']['email']);
        } else {
          setValidationFailedUpdateEmail('');
        }
  
        if (error.response.data['errors']['password']) {
          setValidationFailedUpdatePassword(error.response.data['errors']['password']);
        } else {
          setValidationFailedUpdatePassword('');
        }
      }
    }).finally(() => {
      setShowLoader(false);
    });
  }

  if (!cookies['access_token']) {
    return (
      <Redirect to ="/login" />
    )
  }

  return (
    <>
    {successMessage ? <NotificationModal closeModal={() => setSuccessMessage('')} message={{ text: successMessage, error: false }} /> : ''}
    {errorMessage ? <NotificationModal closeModal={() => setErrorMessage('')} message={{ text: errorMessage, error: true }} /> : ''}
    {!cookies['access_token'] ? <Redirect to ="/" /> : null}
    {showLoader ? <Loader /> : null}

    {isAuthenticated && userId ?
    <>
      <div className="container-fluid profile">
        <div className="row justify-content-center">
          <div className="col-12 mb-2 mb-lg-3 mt-lg-1 px-0 mx-0">
            <div className="row no-gutters shadow-custom">
              <div className="col py-2 align-self-center px-3 rounded mx-3">
                {currentName ? `${currentName} - ` : ''}
                <span className="font-weight-bold">Edit Profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div className={'container-fluid mt-3 profile my-auto ' + (showLoader ? ' disabled-div' : '')}>
        <div className="row justify-content-center">
          <div className="col-7 col-sm-5 col-md-3 col-xl-3">
            <div className="lottie-animation mx-auto">
              <ProfileAnimation />
            </div>
            <div className="small text-right"><a target="_blank" rel="noopener noreferrer" href="https://lottiefiles.com/36519-info-animation">Irfan Munawar @LottieFiles</a></div>
          </div>
        </div>
        <div className="row justify-content-center my-4">
          <div className="col-11 col-md-7 col-xl-5 px-0">
            <form className={'row justify-content-end no-gutters ' + (formValidated ? 'was-validated' : '')} noValidate onSubmit={(event) => handleSubmit(event)}>
              <div className="col-12">
                <input type="text" onChange={(e) => setUpdateName(e.target.value)} value={updateName} minLength="3" maxLength="100" name="name" className="form-control py-4 main-input" placeholder="New name" required/>
                {validationFailedUpdateName ? <div className="small text-danger">{validationFailedUpdateName}</div> : ''}
              </div>
              <div className="col-12 mt-2">
                <input type="email" onChange={(e) => setUpdateEmail(e.target.value)} value={updateEmail} name="email" className="form-control py-4 main-input" placeholder="New e-mail address" required/>
                {validationFailedUpdateEmail ? <div className="small text-danger">{validationFailedUpdateEmail}</div> : ''}
              </div>
              <div className="col-12 mt-2">
                <input type="password" minLength="8" onChange={(e) => setUpdatePassword(e.target.value)} value={updatePassword} name="password" className="form-control py-4 main-input" placeholder="New password"/>
              </div>
              <div className="col-12 mt-2">
                <input type="password" minLength="8" onChange={(e) => setUpdateConfirmPassword(e.target.value)} required={updatePassword ? true : false} value={updateConfirmPassword} name="confirm-password" className="form-control py-4 main-input" placeholder="Confirm new password" />
                {validationFailedUpdatePassword ? <div className="small text-danger">{validationFailedUpdatePassword}</div> : ''}
              </div>
              <div className="col-12 col-sm-7 col-md-4 mt-2">
                <button className="btn btn-block btn-primary py-3">
                  <span className="font-weight-bold">Update</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      </>
      : null }
    </>
  )
}

export default Profile
