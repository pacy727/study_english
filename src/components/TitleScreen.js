import React from 'react';
import { SUSHI_ICONS, SWEET_ICONS } from '../data/wordPairs';
import BackgroundEffects from './BackgroundEffects';

const TitleScreen = ({ startGame, bgBubbles }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center relative">
      <BackgroundEffects bgBubbles={bgBubbles} />
      
      <div className="z-10">
        <h1 className="text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-pulse">
          英単語寿司打
        </h1>
        <div className="text-3xl mb-8 text-pink-600 font-bold">
          <span className="inline-block animate-bounce">タ</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>イ</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>ピ</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.3s' }}>ン</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>グ</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.5s' }}>で</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.6s' }}>楽</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.7s' }}>し</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.8s' }}>く</span>
          <span className="inline-block animate-bounce" style={{ animationDelay: '0.9s' }}>！</span>
        </div>

        <div className="space-y-8 mb-12">
          <button 
            onClick={() => startGame(1)} 
            className="bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-6 px-8 rounded-2xl text-2xl shadow-lg hover:shadow-xl hover:from-blue-500 hover:to-purple-600 transform hover:scale-105 transition-all border-4 border-white"
          >
            <div className="flex items-center">
              <span className="mr-4 text-3xl">🇬🇧→🇯🇵</span>
              モード1: 英語→日本語
            </div>
          </button>

          <div className="block w-full"></div>
          
          <button 
            onClick={() => startGame(2)} 
            className="bg-gradient-to-r from-pink-400 to-orange-400 text-white font-bold py-6 px-8 rounded-2xl text-2xl shadow-lg hover:shadow-xl hover:from-pink-500 hover:to-orange-500 transform hover:scale-105 transition-all border-4 border-white"
          >
            <div className="flex items-center">
              <span className="mr-4 text-3xl">🇯🇵→🇬🇧</span>
              モード2: 日本語→英語
            </div>
          </button>
        </div>
        
        <div className="mt-8 p-6 bg-white bg-opacity-80 rounded-xl shadow-lg text-lg max-w-lg mx-auto">
          <p className="font-bold text-indigo-600 mb-2">遊び方</p>
          <p className="text-gray-700">制限時間内に正しい訳語をタイプしよう！</p>
          <p className="text-gray-700">正解すると{SWEET_ICONS.join('')}がもらえるよ！</p>
        </div>
      </div>
      
      {/* 装飾的な食べ物アイコン */}
      <div className="absolute bottom-8 right-8 flex flex-wrap max-w-xs justify-end">
        {SUSHI_ICONS.map((icon, i) => (
          <div 
            key={i} 
            className="text-4xl animate-bounce" 
            style={{ animationDelay: `${i * 0.2}s`, animationDuration: '1s' }}
          >
            {icon}
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-8 left-8 flex flex-wrap max-w-xs">
        {SWEET_ICONS.map((icon, i) => (
          <div 
            key={i} 
            className="text-4xl animate-bounce" 
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.8s' }}
          >
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TitleScreen;