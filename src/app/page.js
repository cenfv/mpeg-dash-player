
"use client"; 

import React, { useState } from 'react';
import DashPlayer from '../components/DashPlayer';

export default function Home() {
  const [url, setUrl] = useState('');       
  const [videoUrl, setVideoUrl] = useState(''); 

  const handleLoadVideo = () => {
    setVideoUrl(url); 
  };

  return (
    <div>
      <h1>Reprodução de Vídeo com MPEG-DASH</h1>
    
      <input
        type="text"
        placeholder="Digite a URL do vídeo MPEG-DASH"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: '80%', padding: '8px', marginBottom: '10px' }}
      />
      
      <button onClick={handleLoadVideo} style={{ padding: '8px 12px' }}>
        Carregar Vídeo
      </button>
      
      {videoUrl && (
        <DashPlayer url={videoUrl} />
      )}
    </div>
  );
}
