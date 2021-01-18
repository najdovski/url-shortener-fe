import React, { useState } from 'react';
import moment from 'moment';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const MyUrl = ({url, setFetchUrlsAgain, successMessage, errorMessage}) => {
  const [cookies] = useCookies(['access_token']);

  const [editLink, setEditLink] = useState(false);
  const [formValidated, setFormValidated] = useState(false);

  const [validationFailedOriginalUrl, setValidationFailedOriginalUrl] = useState('');
  const [validationFailedShortenUrlSlug, setValidationFailedShortenUrlSlug] = useState('');

  const [values, setValues] = useState({
    shorten_url_slug: url.shorten_url_slug,
    original_url: url.original_url,
    visited: url.visited
  })

  const updateVisited = () => {
    setValues({
      ...values,
      visited: values.visited + 1,
    });
  }

  const handleFormChange = (e) => {
    if (e.target.id === 'slug') {
      setValues({
        ...values,
        shorten_url_slug: e.target.value,
      });
    }

    if (e.target.id === 'original') {
      setValues({
        ...values,
        original_url: e.target.value,
      });
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!e.target.checkValidity()) {
      setFormValidated(true);
      return;
    } else {
      setFormValidated(false);
    };

    axios({
      method: 'put',
      url: `${process.env.REACT_APP_API_URL}/url/update`,
      data: {
        'url-id': url.id,
        'new-original-url': values.original_url,
        'new-shorten-url-slug': values.shorten_url_slug,
      },
      headers: {
        Authorization: `Bearer ${cookies['access_token']}`,
        'Content-Type': 'application/json'
      },
    }).then(response => {
      successMessage(response.data.message);
      errorMessage('');
      setValidationFailedOriginalUrl('');
      setValidationFailedShortenUrlSlug('');
      setEditLink(false);
      setFetchUrlsAgain(true);
    })
    .catch((error) => {
      errorMessage(error.response.data.message);
      successMessage('');
      if (error.response.data['errors'] && error.response.data['errors']['new-shorten-url-slug']) {
        setValidationFailedShortenUrlSlug(error.response.data['errors']['new-shorten-url-slug']);
      } else {
        setValidationFailedShortenUrlSlug('');
      }

      if (error.response.data['errors'] && error.response.data['errors']['new-original-url']) {
        setValidationFailedOriginalUrl(error.response.data['errors']['new-original-url']);
      } else {
        setValidationFailedOriginalUrl('');
      }
    });
  }

  const handleDeleteLink = () => {
    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}/url/delete/${url.id}`,
      headers: {
        Authorization: `Bearer ${cookies['access_token']}`,
        'Content-Type': 'application/json'
      },
    }).then(response => {
      successMessage(response.data.message);
      errorMessage('');
      setFetchUrlsAgain(true);
    })
    .catch((error) => {
      errorMessage(error.response.data.message);
      successMessage('');
      if (error.response.data['errors'] && error.response.data['errors']['new-shorten-url-slug']) {
        setValidationFailedShortenUrlSlug(error.response.data['errors']['new-shorten-url-slug']);
      } else {
        setValidationFailedShortenUrlSlug('');
      }
    });
  }

  return (
    <div className="col-12 col-md-9 col-lg-6 col-xl-4 rounded px-4">
      <form className={'row shadow-custom pt-3 mb-4 rounded ' + (formValidated ? 'was-validated' : '')} noValidate onSubmit={(e) => handleFormSubmit(e)}>
        <div className="col-12 text-center">
          <div className="row justify-content-center">
            <div className="col"></div>
            <div className="col-auto">
              <i className="fas bg-primary fa-link text-white p-2 h5 rounded-circle"></i>
            </div>
            <div className="col text-right small text-muted">
              <i onClick={() => setEditLink(!editLink)} className="cursor-pointer fas fa-edit mr-2"></i>
              <i onClick={() => handleDeleteLink()} className="cursor-pointer fas fa-trash text-danger"></i>
            </div>
          </div>
        </div>
        <div className="col-12 h5">
          {
            editLink ?
            <input type="text" minLength="3" maxLength="20" className="form-control text-muted mt-2 py-2" id="slug" onChange={(e) => handleFormChange(e)} value={values.shorten_url_slug}/>
            :
            <a target="_blank" onClick={() => updateVisited()} rel="noopener noreferrer" href={url.shorten_url_slug} to={url.shorten_url_slug} className="form-control border-0 no-decorations bg-primary text-white mt-2 py-2">{`${process.env.REACT_APP_URL_NO_PROTOCOL}/${url.shorten_url_slug}`}</a>
          }
          {validationFailedShortenUrlSlug ? <div className="x-small text-danger">{validationFailedShortenUrlSlug}</div> : ''}
        </div>
        <div className="col-12">
          <div className="small font-weight-bold mb-1">Original URL</div>
          {
            editLink ?
            <input type="text" minLength="5" className="form-control form-control-sm" id="original" onChange={(e) => handleFormChange(e)} value={values.original_url} required/>
            :
            <div className="small px-2 p-1 form-control form-control-sm">{url.original_url}</div>
          }
          {validationFailedOriginalUrl ? <div className="x-small text-danger">{validationFailedOriginalUrl}</div> : ''}
        </div>
        <div className="col-12">
          {editLink ? 
            <button className="btn btn-block btn-success mt-3 py-1">Update</button>
            :
            null  
          }
        </div>
        <div className="col-12 pt-2 mt-3 pb-2 border-top bg-whitesmoke">
          <div className="row">
            <div className="col-12 text-right">
              <div className="row">
                <div className="col-auto align-self-center text-muted small text-left font-weight-bold">{moment(url.created_at).fromNow()}</div>
                <div className="col-12 col-sm text-left text-sm-right text-muted small">
                  <div className="row no-gutters mt-1 mt-sm-0">
                    <div className="col align-self-center">{url.created_at !== url.updated_at ? `Updated ${moment(url.updated_at).fromNow()}` : ''}</div>
                    <div className="col-12 col-sm-auto align-self-center"><i className="fas fa-eye ml-sm-3"></i> {values.visited}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default MyUrl
