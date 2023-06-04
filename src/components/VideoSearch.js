import React, { useState, useEffect } from 'react';
import VideoItem from './VideoItem';
import './VideoSearch.css';

const VideoSearch = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [recommendedVideos, setRecommendedVideos] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    fetchRecommendedVideos();
  }, []);

  const handleHomeClick = () => {
    window.location.href = '/'; // Navigate to the home page
  };

  const fetchRecommendedVideos = async () => {
    try {
      const response = await fetch(
        `https://api.dailymotion.com/videos?fields=id,title,thumbnail_240_url&limit=6`
      );
      const data = await response.json();
      setRecommendedVideos(data.list);
    } catch (error) {
      console.error('Error fetching recommended videos:', error);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // Perform the search only if the query is not empty
    if (query.trim() !== '') {
      try {
        const response = await fetch(
          `https://api.dailymotion.com/videos?fields=id,title,thumbnail_240_url&search=${query}`
        );
        const data = await response.json();
        setVideos(data.list);
        setIsSearching(true);
      } catch (error) {
        console.error('Error searching videos:', error);
      }
    }
  };

  return (
    <div className="video-search-container">
      <div className="sidebar">
        <h2>Sidebar</h2>
        <ul className="sidebar-list">
          <li>
            <button className="home-button" onClick={handleHomeClick}>
              Home
            </button>
          </li>
          <li>
            <a href="#">Trending</a>
          </li>
          <li>
            <a href="#">Subscriptions</a>
          </li>
          <li>
            <a href="#">Library</a>
          </li>
          <li>
            <a href="#">History</a>
          </li>
          <li>
            <a href="#">Watch Later</a>
          </li>
          <li>
            <a href="#">Liked Videos</a>
          </li>
          {/* Add more sidebar items as needed */}
        </ul>
      </div>
      <div className="main-content">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos..."
          />
          <button type="submit">Search</button>
        </form>
        {isSearching ? (
          <div className="searched-videos">
            <h2>Search Results</h2>
            <div className="video-list">
              {videos.map((video) => (
                <VideoItem key={video.id} video={video} />
              ))}
            </div>
          </div>
        ) : (
          <div className="recommended-videos">
            <h2>Recommended Videos</h2>
            <div className="video-list">
              {recommendedVideos.map((video) => (
                <VideoItem key={video.id} video={video} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoSearch;
