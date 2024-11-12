"use client";

import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import ReactPlayer from 'react-player';
import dashjs from 'dashjs';

const DashPlayer = forwardRef(({ url, ...props }, ref) => {
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

  useImperativeHandle(ref, () => ({
    getCurrentTime: () => playerRef.current?.getCurrentTime() || 0,
    seekTo: (time) => playerRef.current?.seekTo(time, 'seconds')
  }));

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
});

export default DashPlayer;
