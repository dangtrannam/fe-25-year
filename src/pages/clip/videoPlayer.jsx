// videoPlayer.jsx
import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
const VideoPlayer = ({ options, onEnded }) => {
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
      player.play().catch(error => {
        console.error('Autoplay failed:', error);
      });
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

  return (
    <div data-vjs-player>
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered vjs-16-9"
      />
    </div>
  );
};

export default VideoPlayer;