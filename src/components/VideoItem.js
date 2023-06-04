import React from 'react';
import './VideoSearch.css';

const VideoItem = ({ video }) => {
  const openVideo = () => {
    window.open(`https://www.dailymotion.com/video/${video.id}`);
  };

  return (
    <div className="video-item" onClick={openVideo}>
      <img className="video-thumbnail" src={video.thumbnail_240_url} alt={video.title} />
      <div className="video-details">
        <h2 className="video-title">{video.title}</h2>
      </div>
    </div>
  );
};

export default VideoItem;
