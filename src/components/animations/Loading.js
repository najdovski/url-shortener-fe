import React from 'react';
import Lottie from 'react-lottie';
import animationData from './lotties/loading.json';

const Loading = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    },
  };

  return (
    <div>
      <Lottie
        options={options}
        isClickToPauseDisabled={true}
      />
    </div>
  )
}

export default Loading
