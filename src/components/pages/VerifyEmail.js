import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import Loading from '../animations/Loading';

const VerifyEmail = () => {
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
      <div className={'container-fluid my-auto ' + (verifiedMessage || alreadyVerifiedMessage || invalidVerificationURL  ? 'd-none' : '')}>
        <div className="row justify-content-center">
          <div className="col-12 text-center">
            You are being verified...
          </div>
          <div className="col-2">
            <Loading />
          </div>
        </div>
      </div>
      {verifiedMessage ? <Login message={{ text: verifiedMessage, error: false }} /> : ''}
      {alreadyVerifiedMessage ? <Login message={{ text: alreadyVerifiedMessage, error: false }} /> : ''}
      {invalidVerificationURL ? <Register message={{ text: invalidVerificationURL, error: true }} /> : ''}
    </>
  )
}

export default VerifyEmail
