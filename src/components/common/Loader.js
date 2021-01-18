import React from 'react';
import Loading from '../animations/Loading';

const Loader = () => {
  return (
    <div className="container-fluid my-auto loader-container my-auto">
      <div className="row justify-content-center">
        <div className="col-8 col-sm-6 col-md-4 col-lg-3 z-index-1 loader-div">
          <div className="lottie-animation mx-auto">
            <Loading />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader
