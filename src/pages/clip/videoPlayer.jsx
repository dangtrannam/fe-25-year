// videoPlayer.jsx
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const VideoPlayer = ({ options, onEnded, play }) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Initialize player
    const player = videojs(videoRef.current, {
      ...options,
      controlBar: {
        playToggle: false,
        volumePanel: false,
        currentTimeDisplay: false,
        timeDivider: false,
        durationDisplay: false,
        progressControl: false,
      }
    });

    // Store player reference
    playerRef.current = player;

    // Add event listeners
    player.ready(() => {
      console.log('Player is ready');

    });

    player.on('ended', () => {
      console.log('Video ended');
      if (onEnded) onEnded();
    });

    // Cleanup
    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []); // Empty dependency array since we only want to initialize once

  useEffect(() => {
    if (play && playerRef.current) {
      playerRef.current.play().catch(error => {
        console.error('Play failed:', error);
      });
    } else {
      playerRef.current.pause();
    }
  }, [play]);

  return (
    <><div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered vjs-16-9" />
    </div>
    <style>
        {`
      @media (max-width: 1024px) {
        .video-js video {
          height: auto !important;
          width: auto !important;
        }
      }
    `}
      </style>
    </>
  );
};

export default VideoPlayer;