import React from 'react';
import {Player, Controls} from '@lottiefiles/react-lottie-player';

export default function E404Page () {
  return (
    <div>
      <Player
        src="https://assets7.lottiefiles.com/temp/lf20_USCruP.json"
        background="transparent"
        speed="1"
        loop
        autoplay
        style={{height: '500px', width: '500px'}}
      />

    </div>
  );
}
