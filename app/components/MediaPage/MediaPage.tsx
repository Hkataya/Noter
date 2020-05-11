/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import MediaPlayer from '../MediaPlayer/MediaPlayer';

export default function MediaPage() {
  const getProgress = () => {};

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <h1>Test</h1>
      <div className="w-full bg-gray-100 flex-grow">
        <div className="h-full flex flex-row">
          <div className="w-3/4 h-full p-5">
            <MediaPlayer
              getProgress={getProgress}
              url="https://www.youtube.com/playlist?list=PLdYJfM049ErCQRmiuP2IBtzKyYlN2P7VK"
            />
          </div>
          <div className="bg-purple-900 w-1/4 h-full p-5 overflow-y-scroll" />
        </div>
      </div>
    </div>
  );
}
