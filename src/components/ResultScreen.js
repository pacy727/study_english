import React from 'react';
import { SUSHI_ICONS, SWEET_ICONS } from '../data/wordPairs';
import BackgroundEffects from './BackgroundEffects';

const ResultScreen = ({ score, backToTitle, bgBubbles }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 relative">
      <BackgroundEffects bgBubbles={bgBubbles} />
      
      {/* 結果画面メイン */}
      <div className="z-10 max-w-2xl w-full">
        <h2 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 animate-pulse">
          ゲーム終了！
        </h2>
        
        <div className="relative">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <div className="text-8xl animate-bounce">🏆</div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-2xl mb-8 w-full relative border-8 border-yellow-200 overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-pink-300 rounded-full opacity-30"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-300 rounded-full opacity-30"></div>

            <div className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              あなたのスコア: {score}
            </div>
            
            <div className="text-xl font-bold text-gray-700 mb-6 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-xl">
              {score < 5 ? "もう少し頑張ろう！次は絶対できるよ！ 💪" : 
               score < 10 ? "なかなかいい調子！レベルアップ中！ ✨" : 
               score < 15 ? "すごい！よくできました！天才の予感！ 🌟" :
               "驚異的な成績！あなたは英単語マスター！ 👑"}
            </div>
            
            <div className="flex flex-wrap justify-center mb-6 max-w-md mx-auto">
              {Array.from({ length: Math.min(score, 30) }).map((_, i) => (
                <div 
                  key={i} 
                  className="m-1 animate-bounce" 
                  style={{ 
                    animationDelay: `${i * 0.1}s`,
                    fontSize: `${Math.max(24, 40 - i/2)}px`,
                  }}
                >
                  {i % 2 === 0 ? SWEET_ICONS[i % SWEET_ICONS.length] : SUSHI_ICONS[i % SUSHI_ICONS.length]}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 戻るボタン */}
        <button
          onClick={backToTitle}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-8 rounded-full text-xl shadow-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all border-4 border-white"
        >
          <div className="flex items-center">
            <span className="mr-2">🔄</span>
            もう一度プレイする
          </div>
        </button>
        
        {/* 装飾 */}
        <div className="absolute bottom-6 right-6">
          <div className="text-5xl animate-bounce">🎉</div>
        </div>
        <div className="absolute bottom-6 left-6">
          <div className="text-5xl animate-bounce" style={{ animationDelay: '0.3s' }}>✨</div>
        </div>
      </div>
    </div>
  );
};

export default ResultScreen;