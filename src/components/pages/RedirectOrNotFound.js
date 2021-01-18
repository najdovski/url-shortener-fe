import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NotFoundAnimation from '../animations/NotFoundAnimation';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const RedirectOrNotFound = () => {
  const [show404, setShow404] = useState(false);

  useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}${window.location.pathname}`,
    })
    .then(response => {
      window.location = response.data['original-url'];
    })
    .catch(() => {
      document.title = process.env.REACT_APP_NAME;
      setShow404(true);
    });
  }, []);

  if (show404) {
    return (
      <>
      <Navbar />
        <div className="container-fluid my-auto">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-9 col-lg-8 col-xl-7">
              <div className="lottie-animation-404 mx-auto mt-4">
                <NotFoundAnimation />
              </div>
              <div className="mr-sm-4 mr-lg-5 small text-right"><a target="_blank" rel="noopener noreferrer" href="https://lottiefiles.com/40806-error-404">Mark Arrow @LottieFiles</a></div>
            </div>
          </div>
        </div>
      <Footer />
      </>
    )
  } else {
    return null;
  }
}

export default RedirectOrNotFound
