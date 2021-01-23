import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import Loader from '../common/Loader';
import UpdateHtml from '../common/UpdateHtml';

const VerifyEmail = () => {
  document.title = `${process.env.REACT_APP_NAME} - Verify Email`;
  const [verifiedMessage, setVerifiedMessage] = useState('');
  const [alreadyVerifiedMessage, setAlreadyVerifiedMessage] = useState('');
  const [invalidVerificationURL, setInvalidVerificationURL] = useState('');

  useEffect(() => {
    const apiCheckVerifyUrl = window.location.href.replace(process.env.REACT_APP_URL, process.env.REACT_APP_API_URL);
    axios({
      method: 'get',
      url: apiCheckVerifyUrl,
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      setVerifiedMessage(response.data.message)
    })
    .catch(error => {
      if (error.response.status === 404) {
        setInvalidVerificationURL('Invalid email verification URL');
        return;
      }

      if (error.response.data) {
        if (error.response.status === 422) {
          setAlreadyVerifiedMessage(error.response.data.message);
          return;
        } else {
          setInvalidVerificationURL(error.response.data.message);
        }
      }
    });
  }, []);

  return (
    <>
      <UpdateHtml component="VerifyEmail" />
      {verifiedMessage || alreadyVerifiedMessage || invalidVerificationURL ? null : <Loader /> }{}
      {verifiedMessage ? <Login message={{ text: verifiedMessage, error: false }} /> : ''}
      {alreadyVerifiedMessage ? <Login message={{ text: alreadyVerifiedMessage, error: false }} /> : ''}
      {invalidVerificationURL ? <Register message={{ text: invalidVerificationURL, error: true }} /> : ''}
    </>
  )
}

export default VerifyEmail
