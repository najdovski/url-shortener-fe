import React from 'react';
import Lottie from 'react-lottie';
import animationData from './lotties/empty.json';

const EmptyAnimation = () => {
  const options = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
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

export default EmptyAnimation
