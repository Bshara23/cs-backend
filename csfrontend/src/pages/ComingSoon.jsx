import React from 'react';
import {Player} from '@lottiefiles/react-lottie-player';

export default function ComingSoon () {
  return (
    <div>
      <Player
        autoplay
        speed="0.5"
        loop
        src="https://assets4.lottiefiles.com/packages/lf20_8uHQ7s.json"
        style={{height: '300px', width: '300px'}}
      />
      <h3 className="text-center mb-5">Coming Soon!</h3>
      <br />
    </div>
  );
}
