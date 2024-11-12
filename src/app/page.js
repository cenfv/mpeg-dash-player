"use client";

import React, { useState, useRef } from 'react';
import DashPlayer from '../components/DashPlayer';

export default function Home() {
  const viewpoints = [
    "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
    "https://dash.akamaized.net/digitalprimates/fraunhofer/480p_video/heaac_2_0_with_video/Sintel/sintel_480p_heaac2_0.mpd",
    "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
    "https://dash.akamaized.net/digitalprimates/fraunhofer/480p_video/heaac_2_0_with_video/Sintel/sintel_480p_heaac2_0.mpd",

  ];

  const [currentUrl, setCurrentUrl] = useState(viewpoints[0]);
  const playerRef = useRef(null);

  const handleViewpointChange = (url) => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      setCurrentUrl(url);

      setTimeout(() => {
        playerRef.current.seekTo(currentTime);
      }, 200);
    }
  };

  return (
    <div>
      <h1>Reprodução de Vídeo com Pontos de Vista Diferentes</h1>
      
      <DashPlayer ref={playerRef} url={currentUrl} />

      <div style={{ marginTop: '20px' }}>
        <h2>Selecione o Ponto de Vista</h2>
        {viewpoints.map((viewpoint, index) => (
          <button
            key={index}
            onClick={() => handleViewpointChange(viewpoint)}
            style={{ margin: '5px', padding: '10px' }}
          >
            Ponto de Vista {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
