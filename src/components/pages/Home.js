import React, { useState } from 'react';
import HomeAnimation from '../animations/HomeAnimation';
import axios from 'axios';

const Home = () => {

  const [formValidated, setFormValidated] = useState(false);
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenUrlSlug, setShortenUrlSlug] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [responseShortenUrlSlug, setResponseShortenUrlSlug] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [validationFailedOriginalUrl, setValidationFailedOriginalUrl] = useState('');
  const [validationFailedShortenUrlSlug, setValidationFailedShortenUrlSlug] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.target.checkValidity()) {
      setFormValidated(true);
      return;
    } else {
      setFormValidated(false);
    };

    axios({
      method: 'post',
      url: `http://localhost/url-shortener-api/public/shorten`,
      data: {
        'original-url': originalUrl,
        'shorten-url-slug': shortenUrlSlug
      },
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(response => {
      setOriginalUrl('');
      setShortenUrlSlug('');
      setSuccessMessage(response.data.message);
      setResponseShortenUrlSlug(response.data.shortenUrlSlug);
      setErrorMessage('');
      setValidationFailedOriginalUrl('');
      setValidationFailedShortenUrlSlug('');
    })
    .catch((error) => {
      console.log(error.response);
      setErrorMessage(error.response.data.message);
      setSuccessMessage('');
      setResponseShortenUrlSlug('');
      if (error.response.data['errors'] && error.response.data['errors']['shorten-url-slug']) {
        setValidationFailedShortenUrlSlug(error.response.data['errors']['shorten-url-slug']);
      } else {
        setValidationFailedShortenUrlSlug('');
      }

      if (error.response.data['errors'] && error.response.data['errors']['original-url']) {
        setValidationFailedOriginalUrl(error.response.data['errors']['original-url']);
      } else {
        setValidationFailedOriginalUrl('');
      }
    });
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-9 col-md-6 text-right lottie-custom">
          <HomeAnimation />
          <div className="mr-sm-4 mr-lg-5 small"><a target="_blank" rel="noopener noreferrer" href="https://lottiefiles.com/43885-laptop-working">Hadi Firmansyah @LottieFiles</a></div>
        </div>
      </div>
      <div className="row justify-content-center mt-2">
        <div className="col-11 col-md-7 heading-big text-uppercase font-weight-bold bg-primary text-white text-right">
          Cut <span className="font-weight-light">your</span> links <i className="fas fa-link big-icon"></i> <span className="font-weight-light">here</span>
        </div>
      </div>
      <div className="row justify-content-center text-right text-muted small">
        <div className="col-11 col-md-7 font-weight-light px-0">
          Convert your <span className="font-weight-bold">super long links</span> into <span className="font-weight-bold text-primary">custom links</span> that are <span className="font-weight-bold">easy to remember!</span>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className={'col-11 col-md-7 my-2 text-center font-weight-bold bg-success text-white ' + (successMessage ? 'bg-primary' : '') + (errorMessage ? 'bg-danger' : '') + (successMessage || errorMessage ? '' : ' hide')}>
          {successMessage ? <div>{successMessage}: <u><a target="_blank" rel="noopener noreferrer" className="text-white" href={responseShortenUrlSlug}>{`${process.env.REACT_APP_URL}/${responseShortenUrlSlug}`}</a></u></div> : ''}
          {errorMessage ? <div>{errorMessage}</div> : ''}
        </div>
      </div>
      <div className="row justify-content-center mb-5">
        <div className="col-11 col-md-7 px-0">
          <form className={'row no-gutters ' + (formValidated ? 'was-validated' : '')} noValidate onSubmit={(event) => handleSubmit(event)}>
            <div className="col">
              <input type="text" onChange={(e) => setOriginalUrl(e.target.value)} value={originalUrl} name="original-url" className="form-control py-4 main-input" placeholder="Paste your link" required/>
              {validationFailedOriginalUrl ? <div className="small text-danger">{validationFailedOriginalUrl}</div> : ''}
              <input type="text" onChange={(e) => setShortenUrlSlug(e.target.value)} value={shortenUrlSlug} name="shorten-url-slug" className="form-control mt-1 optional-input" placeholder="Optional custom short link ending"/>
              {validationFailedShortenUrlSlug ? <div className="small text-danger">{validationFailedShortenUrlSlug}</div> : ''}
            </div>
            <div className="col-3 col-sm-2 pl-1">
              <button className="btn btn-block btn-primary h-100 btn-cut-it">
                <span className="font-weight-bold">Cut it</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Home
