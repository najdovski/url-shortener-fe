import React, { useState } from 'react';
import HomeAnimation from '../animations/HomeAnimation';
import NotificationModal from '../common/NotificationModal';
import axios from 'axios';
import Loader from '../common/Loader';
import { useCookies } from 'react-cookie';
import UpdateHtml from '../common/UpdateHtml';

const Home = () => {
  document.title = process.env.REACT_APP_NAME;
  const [cookies] = useCookies(['access_token']);

  const [formValidated, setFormValidated] = useState(false);
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenUrlSlug, setShortenUrlSlug] = useState('');

  const [successMessage, setSuccessMessage] = useState('');
  const [responseShortenUrlSlug, setResponseShortenUrlSlug] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [validationFailedOriginalUrl, setValidationFailedOriginalUrl] = useState('');
  const [validationFailedShortenUrlSlug, setValidationFailedShortenUrlSlug] = useState('');

  const [showLoader, setShowLoader] = useState(false);

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
      url: `${process.env.REACT_APP_API_URL}/shorten`,
      data: {
        'original-url': originalUrl,
        'shorten-url-slug': shortenUrlSlug,
      },
      headers: {
        Authorization: `Bearer ${cookies['access_token']}`,
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
    }).finally(() => {
      setShowLoader(false);
    });
  }

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof(navigator.clipboard) === 'undefined') {
      const textArea = document.createElement('textarea');
      textArea.value = `${process.env.REACT_APP_URL}/${responseShortenUrlSlug}`;
      textArea.style.position = 'fixed';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
        textArea.remove();
      } catch {
        setErrorMessage(`Couldn't copy`);
        setCopied(false);
      }
    } else {
      navigator.clipboard.writeText(`${process.env.REACT_APP_URL}/${responseShortenUrlSlug}`);
    }

    setCopied(true);
  }

  return (
    <>
      <UpdateHtml component="Home" />
      {successMessage ? <NotificationModal closeModal={() => setSuccessMessage('')} message={{ text: successMessage, error: false }} /> : ''}
      {errorMessage ? <NotificationModal closeModal={() => setErrorMessage('')} message={{ text: errorMessage, error: true }} /> : ''}
      {showLoader ? <Loader /> : null}
      <div className={'container-fluid transition-slow my-auto home' + (showLoader ? ' disabled-div' : '')}>
        <div className="row justify-content-center">
          <div className="col-10 col-sm-9 col-md-6 col-xl-4 text-right">
            <div className="lottie-animation mx-auto">
              <HomeAnimation />
            </div>
            <div className="mr-sm-4 mr-lg-5 small"><a target="_blank" rel="noopener noreferrer nofollow" href="https://lottiefiles.com/23905-timberman-axe">Agnis Design @LottieFiles</a></div>
          </div>
        </div>
        <div className="row justify-content-center mt-sm-2">
          <h3 className="col-11 col-md-7 text-uppercase heading-big font-weight-bold bg-primary text-white text-right mt-3 py-1">
            AXE <span className="font-weight-light">your</span> links <i className="fas fa-link big-icon"></i> <span className="font-weight-light">here</span>
          </h3>
        </div>
        <div className="row justify-content-center text-right text-muted small">
          <div className="col-11 col-md-7 font-weight-light px-0 mb-2">
            <s>Convert</s> <span className="font-weight-bold">AXE</span> your <span className="font-weight-bold">super long links</span> into <span className="font-weight-bold text-primary">custom links</span> that are <span className="font-weight-bold">easy to remember!</span>
          </div>
        </div>
        {errorMessage ? <NotificationModal closeModal={() => setErrorMessage('')} message={{ text: errorMessage, error: true }} /> : ''}
        {responseShortenUrlSlug ?
        <div className="row justify-content-center mb-2 animation-fade-in">
          <div className={'col-11 col-md-7 text-white py-2 '+ (responseShortenUrlSlug ? '' : ' hide')}>
            <div className="row justify-content-end">
              <div className="col-12 col-sm col-md-10 form-control bg-success text-white cursor-text px-3 border-0 shorten-slug">
                <a target="_blank" rel="noopener noreferrer" className="text-white" href={responseShortenUrlSlug}>
                  {`${process.env.REACT_APP_URL}/${responseShortenUrlSlug}`}
                </a>
              </div>
              <div className="col-5 col-sm-auto col-md-2 mt-1 mt-sm-0 pr-0">
                <button onClick={() => handleCopy()} className="btn btn-block btn-success form-control">{copied ? 'Copied' : 'Copy' }</button>
              </div>
            </div>
          </div>
        </div>
        : null }
        <div className="row justify-content-center mb-4 mb-sm-5">
          <div className="col-11 col-md-7 px-0">
            <form className={'row no-gutters ' + (formValidated ? 'was-validated' : '')} noValidate onSubmit={(event) => handleSubmit(event)}>
              <div className="col">
                <input type="text" minLength="5" onChange={(e) => setOriginalUrl(e.target.value)} value={originalUrl} name="original-url" className="form-control py-sm-4 main-input" placeholder="Paste your link" required/>
                {validationFailedOriginalUrl ? <div className="small text-danger">{validationFailedOriginalUrl}</div> : ''}
                <input pattern="[A-Za-z0-9]+" type="text" minLength="3" maxLength="20" onChange={(e) => setShortenUrlSlug(e.target.value)} value={shortenUrlSlug} name="shorten-url-slug" className="form-control mt-1 optional-input" placeholder="Custom short link ending"/>
                {validationFailedShortenUrlSlug ? <div className="small text-danger">{validationFailedShortenUrlSlug}</div> : ''}
              </div>
              <div className="col-auto col-sm-2 col-md-3 col-lg-2 pl-1">
                <button className="btn btn-block btn-primary h-100 btn-cut-it">
                  <span className="font-weight-bold">Timber!</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
