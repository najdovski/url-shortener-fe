import React from 'react';
import Lottie from 'react-lottie';
import animationData from './lotties/register-animation.json';

const RegisterAnimation = () => {
  const options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div>
      <Lottie options={options} />
    </div>
  )
}

export default RegisterAnimation
