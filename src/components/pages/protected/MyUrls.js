import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Loader from '../../common/Loader';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import MyUrl from '../../partials/MyUrl';
import EmptyAnimation from '../../animations/EmptyAnimation';
import NotificationModal from '../../common/NotificationModal';
import AddNewAnimation from '../../animations/AddNewAnimation';

const MyUrls = () => {
  document.title = `${process.env.REACT_APP_NAME} - My URLs`;

  const [cookies] = useCookies(['access_token']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [myUrls, setMyUrls] = useState();
  const [showLoader, setShowLoader] = useState(true);

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [pagination, setPagination] = useState();

  useEffect(() => {
    axios({
      method: 'post',
      url: `${process.env.REACT_APP_API_URL}/is-authenticated`,
      headers: {
        Authorization: `Bearer ${cookies['access_token']}`,
        'Content-Type': 'application/json'
      },
    })
    .then(() => {
      setIsAuthenticated(true);
      fetchMyUrls();
    })
    .catch(() => {
      setIsAuthenticated(false);
    })
  }, []);

  const [currentPaginationUrl, setCurrentPaginationUrl] = useState(`${process.env.REACT_APP_API_URL}/url/list/all`);

  const fetchMyUrls = (url = null) => {
    axios({
      method: 'get',
      url: url ?? currentPaginationUrl,
      headers: {
        Authorization: `Bearer ${cookies['access_token']}`,
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      setShowLoader(false);
      setMyUrls(response.data.data);
      setPagination(response.data);
    })
    .catch(() => {
      setIsAuthenticated(false);
    });
  }

  const handleFetchAgain = () => {
    fetchMyUrls();
  }
  
  if (!cookies['access_token']) {
    return (
      <Redirect to ="/login" />
    )
  }

  const handleSuccessMessage = (msg) => {
    setSuccessMessage(msg);
  }

  const handleErrorMessage = (msg) => {
    setShowLoader(true);
    setErrorMessage(msg);
  }

  const handlePaginationClick = (url) => {
    if (!url) return;
    setShowLoader(true);
    setCurrentPaginationUrl(url);
    fetchMyUrls(url);
  }

  return (
    <>
      {successMessage ? <NotificationModal closeModal={() => setSuccessMessage('')} message={{ text: successMessage, error: false }} /> : ''}
      {errorMessage ? <NotificationModal closeModal={() => setErrorMessage('')} message={{ text: errorMessage, error: true }} /> : ''}
      {showLoader ? <Loader /> : null}
      <div className={'container-fluid my-urls ' + (showLoader ? 'disabled-div' : '')}>
        <div className="row justify-content-center">
          <div className="col-12 col-md-9 col-lg-12 mb-4 px-0 mx-0">
            <div className="row no-gutters shadow-custom">
              <div className="col py-2 align-self-center px-3 font-weight-bold rounded mx-3">My URLs</div>
              <div className="col-auto text-end mx-4">
                <button className="btn btn-block p-1 m-0 ">
                  <Link className="text-white" to="/">
                    <div className="add-new-animation text-right">
                      <AddNewAnimation />
                    </div>
                  </Link>
                </button>
                <div className="add-new-animation-attribution mr-2"><a target="_blank" rel="noopener noreferrer" href="https://lottiefiles.com/25300-plus-button">Jihyun Jang @LottieFiles</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAuthenticated && pagination && myUrls ?
      <>
        <div className={'container-fluid mt-2 my-urls ' + (myUrls.length <= 0 ? 'my-auto' : '') + (showLoader ? ' disabled-div ' : '')}>
          <div className="row px-3 justify-content-center justify-content-lg-start">
            {myUrls.length > 0 ? myUrls.map(url => {
              return (
                <MyUrl
                  key={url.id}
                  url={url}
                  setFetchUrlsAgain={handleFetchAgain}
                  successMessage={(msg) => handleSuccessMessage(msg)}
                  errorMessage={(msg) => handleErrorMessage(msg)}
                />
              )
            })
            :
            <div className="col-12 mt-5">
              <div className="row justify-content-center">
                <div className="col-12 text-center  text-dark its-empty-here font-weight-bold">
                  IT'S <span className="text-primary">EMPTY</span> HERE
                </div>
                <div className="col-12 col-sm-9 col-md-6 col-xl-4">
                  <div className="lottie-animation empty-animation mx-auto">
                    <EmptyAnimation />
                  </div>
                  <div className="mr-sm-4 mr-lg-5 small text-right"><a target="_blank" rel="noopener noreferrer" href="https://lottiefiles.com/5081-empty-box">Taha Sami @LottieFiles</a></div>
                </div>
              </div>
            </div>
            }
          </div>       
        </div>

        <div className="container-fluid mt-auto">
            <nav aria-label="shortened urls pagination">
              <ul className="pagination justify-content-center">
                {pagination.links ? pagination.links.map((link, id) => {
                if (isNaN(link.label)
                    || link.label === pagination.last_page
                    || link.label === 1
                    || link.label < pagination.current_page + 3
                    && link.label > pagination.current_page - 3)

                  return (
                    <li key={id}
                      onClick={() => handlePaginationClick(link.url)}
                      className={'page-item '
                      + (pagination.current_page === link.label ? ' active ' : '')
                      + (!link.url ? 'disabled' : 'cursor-pointer')
                    }>
                        <span className="page-link">{link.label.toString().replace('&laquo; ', '').replace(' &raquo;', '')}</span>
                    </li>
                    )

                    return (
                      link.label === 2
                      || link.label === pagination.last_page - 1 ?
                        <li className="page-item align-self-end">
                          <span className="page-link">...</span>
                        </li>
                      :
                        null
                    )
                })
                : null}
              </ul>
            </nav>
        </div>

      </>
        :
          null
        }
    </>
  )
}

export default MyUrls
