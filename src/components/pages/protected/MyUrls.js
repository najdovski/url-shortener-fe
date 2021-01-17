import React, { useState, useEffect, Suspense } from 'react';
import { Redirect } from 'react-router-dom';
import Loader from '../../common/Loader';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import MyUrl from '../../partials/MyUrl';
import EmptyAnimation from '../../animations/EmptyAnimation';

const MyUrls = () => {
  document.title = `${process.env.REACT_APP_NAME} - My URLs`;

  const [cookies] = useCookies(['access_token']);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [myUrls, setMyUrls] = useState();
  const [showLoader, setShowLoader] = useState(true);

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
    .catch(error => {
      console.log(error);
      setIsAuthenticated(false);
    });
  }, []);

  const fetchMyUrls = () => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}/url/list/all`,
      headers: {
        Authorization: `Bearer ${cookies['access_token']}`,
        'Content-Type': 'application/json'
      },
    })
    .then(response => {
      setShowLoader(false);
      setMyUrls(response.data);
    })
    .catch(() => {
      setIsAuthenticated(false);
    });
  }

  const handleFetchAgain = () => {
    fetchMyUrls();
  }

  return (
    <>
      {/* {!isAuthenticated ? <Redirect to="/login" /> : null} */}
      {showLoader ? <Loader /> : null}
      {myUrls ?
        <div className={'container-fluid mt-3 my-urls ' + (myUrls.length <= 0 ? 'my-auto' : '')}>
          <div className="row px-3">
            {myUrls.length > 0 ? myUrls.map((url, id) => {
              return (
                <MyUrl url={url} setFetchUrlsAgain={handleFetchAgain} key={id} />
              )
            })
            :
            <div className="col-12">
              <div className="row justify-content-center">
                <div className="col-12 col-sm-9 col-md-6 col-xl-5">
                  <EmptyAnimation />
                  <div className="mr-sm-4 mr-lg-5 small text-right"><a target="_blank" rel="noopener noreferrer" href="https://lottiefiles.com/5081-empty-box">Taha Sami @LottieFiles</a></div>
                </div>
              </div>
            </div>
            }
          </div>
        </div>
        :
        null}
    </>
  )
}

export default MyUrls
