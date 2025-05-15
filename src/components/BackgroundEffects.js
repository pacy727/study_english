import React from 'react';


const BackgroundEffects = ({ bgBubbles }) => {
  return (
    <>
      {/* 背景バブル */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bgBubbles.map(bubble => (
          <div 
            key={bubble.id}
            className="absolute rounded-full flex items-center justify-center"
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              background: bubble.color,
              fontSize: `${bubble.size * 0.6}px`,
              zIndex: 0,
              transition: 'top 0.5s linear, left 0.5s ease-in-out'
            }}
          >
            {bubble.icon}
          </div>
        ))}
      </div>
      
      {/* キラキラエフェクト */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 10 + 10}px`,
              opacity: Math.random() * 0.5 + 0.3,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;