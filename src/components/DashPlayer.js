"use client";

import React, { useEffect, useRef } from 'react';
import ReactPlayer from 'react-player';
import dashjs from 'dashjs';

const DashPlayer = ({ url, ...props }) => {
  const playerRef = useRef(null);
  const dashPlayerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (playerRef.current && playerRef.current.getInternalPlayer()) {
      const videoElement = playerRef.current.getInternalPlayer();

      if (dashPlayerRef.current) {
        dashPlayerRef.current.reset();
      } else {
        dashPlayerRef.current = dashjs.MediaPlayer().create();
      }

      dashPlayerRef.current.initialize(videoElement, url, true);
    }

    return () => {
      if (dashPlayerRef.current) {
        dashPlayerRef.current.reset();
      }
    };
  }, [url]);

  return (
    <ReactPlayer
      ref={playerRef}
      url={url}
      playing
      controls
      width="50%"
      height="50%"
      {...props}
    />
  );
};

export default DashPlayer;
