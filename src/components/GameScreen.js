import React, { useRef } from 'react';
import BackgroundEffects from './BackgroundEffects';

const GameScreen = ({ 
  gameMode, 
  timeLeft, 
  currentWord, 
  input, 
  score, 
  cookies, 
  floatingIcons,
  bgBubbles,
  currentFood,
  handleInputChange 
}) => {
  const inputRef = useRef(null);
  
  // 残り時間を計算
  const timeProgress = (timeLeft / 60) * 100;
  
  return (
    <div className="flex flex-col items-center justify-between h-full p-6 relative">
      <BackgroundEffects bgBubbles={bgBubbles} />
      
      {/* 浮遊アイコン */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((icon) => (
          <div
            key={icon.id}
            className="absolute text-4xl"
            style={{
              left: `${icon.x}%`,
              bottom: `${icon.y}%`,
              fontSize: `${icon.size}px`,
              transform: `rotate(${icon.id % 360}deg)`,
              opacity: (100 - icon.y) / 100,
              zIndex: 1,
              animation: 'float 8s ease-in-out infinite',
              animationDelay: `${(icon.id % 5) * 0.2}s`
            }}
          >
            {icon.icon}
          </div>
        ))}
      </div>
      
      {/* ヘッダー情報 */}
      <div className="w-full flex justify-between items-center mb-4 z-10">
        <div className="bg-white p-4 rounded-xl shadow-lg flex items-center space-x-2 border-4 border-pink-300">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
            スコア: {score}
          </div>
          <div className="text-2xl">
            {Array.from({ length: Math.min(3, score) }).map((_, i) => (
              <span key={i} className="inline-block mx-1">{currentFood}</span>
            ))}
          </div>
        </div>
        
        {/* 独創的なタイマー表示 */}
        <div className="w-36 h-36 relative">
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff9a9e" />
                  <stop offset="50%" stopColor="#fad0c4" />
                  <stop offset="100%" stopColor="#ffd1ff" />
                </linearGradient>
              </defs>
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="rgba(255, 255, 255, 0.6)" 
                strokeWidth="10"
              />
              <circle 
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke={timeLeft <= 10 ? "#ef4444" : "url(#timerGradient)"} 
                strokeWidth="10"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - timeProgress / 100)}`}
                transform="rotate(-90 50 50)"
                className={timeLeft <= 10 ? "animate-pulse" : ""}
              />
              <text 
                x="50" y="55" 
                dominantBaseline="middle" 
                textAnchor="middle" 
                fontSize="28" 
                fontWeight="bold"
                fill={timeLeft <= 10 ? "#ef4444" : "#6366f1"}
                className={timeLeft <= 10 ? "animate-ping" : ""}
              >
                {timeLeft}
              </text>
            </svg>
          </div>
          
          {/* タイマーの装飾 */}
          <div className={`absolute -top-4 -right-4 text-3xl ${timeLeft <= 10 ? "animate-bounce" : ""}`}>
            ⏰
          </div>
          
          <div className={`absolute top-0 left-0 text-xl ${timeLeft <= 15 ? "animate-ping" : "opacity-0"}`} style={{ animationDuration: '2s' }}>
            ⚡
          </div>
          
          <div className={`absolute bottom-0 right-0 text-xl ${timeLeft <= 15 ? "animate-ping" : "opacity-0"}`} style={{ animationDuration: '2s', animationDelay: '0.5s' }}>
            ⚡
          </div>
        </div>
      </div>
      
      {/* メイン単語表示エリア */}
      <div className="bg-white p-8 rounded-2xl shadow-2xl mb-8 w-full max-w-xl text-center transform hover:scale-102 transition-all border-8 border-double border-yellow-300 z-10 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 bg-pink-400 text-white text-xs py-2 px-8 shadow-lg transform rotate-45">
          {gameMode === 1 ? "英語→日本語" : "日本語→英語"}
        </div>
        
        <div className="flex justify-center mb-4">
          {(gameMode === 1 ? 'ENGLISH' : 'にほんご').split('').map((char, i) => (
            <span 
              key={i} 
              className="inline-block mx-1 text-lg font-bold text-pink-500"
              style={{ 
                animation: 'float 2s ease-in-out infinite',
                animationDelay: `${i * 0.1}s`
              }}
            >
              {char}
            </span>
          ))}
        </div>
        
        <div className="text-5xl font-bold mb-8 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-600 shadow-inner relative">
          <div className="absolute -left-1 -top-1 text-xl text-yellow-500">✨</div>
          <div className="absolute -right-1 -top-1 text-xl text-yellow-500">✨</div>
          {gameMode === 1 ? currentWord?.english : currentWord?.japanese}
          <div className="absolute -left-1 -bottom-1 text-xl text-yellow-500">✨</div>
          <div className="absolute -right-1 -bottom-1 text-xl text-yellow-500">✨</div>
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          className="w-full p-4 text-2xl border-4 border-blue-300 rounded-lg focus:border-pink-500 focus:outline-none text-center shadow-inner"
          placeholder={gameMode === 1 ? "日本語で入力してね" : "Type in English"}
          autoFocus
        />
        
        <div className="mt-4 text-sm text-gray-500">
          {gameMode === 1 ? "日本語で答えてね！" : "Answer in English!"}
        </div>
      </div>
      
      {/* クッキーの積み重ね表示 */}
      <div className="absolute bottom-0 right-0 h-64 w-full pointer-events-none overflow-hidden z-20">
        {cookies.map((cookie, index) => (
          <div
            key={cookie.id}
            className="absolute text-4xl animate-rise transform transition-all duration-1000"
            style={{
              left: `${cookie.x}%`,
              bottom: `${index * 10}px`,
              zIndex: 100 + index,
              transform: `rotate(${cookie.rotation}deg)`
            }}
          >
            {cookie.icon}
          </div>
        ))}
      </div>
      
      {/* ゲームモード表示 */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-80 px-4 py-2 rounded-full shadow-lg z-10 text-sm font-bold text-pink-600">
        {gameMode === 1 ? "🇬🇧 → 🇯🇵 モード" : "🇯🇵 → 🇬🇧 モード"}
      </div>
    </div>
  );
};

export default GameScreen;