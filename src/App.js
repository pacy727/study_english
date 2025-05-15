import { useState, useEffect, useRef } from 'react';
import TitleScreen from './components/TitleScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import wordPairs, { SUSHI_ICONS, SWEET_ICONS, FOOD_ICONS, CUTE_ICONS } from './data/wordPairs';

const App = () => {
  const [gameState, setGameState] = useState('title'); // title, game, result
  const [gameMode, setGameMode] = useState(1); // 1: 英語→日本語, 2: 日本語→英語
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentWord, setCurrentWord] = useState(null);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [cookies, setCookies] = useState([]);
  const [wordHistory, setWordHistory] = useState([]);
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [bgBubbles, setBgBubbles] = useState(Array.from({ length: 20 }).map(() => ({
    id: Math.random(),
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 60 + 20,
    speed: Math.random() * 30 + 10,
    color: `hsla(${Math.random() * 360}, 80%, 80%, 0.3)`,
    icon: Math.random() > 0.7 ? CUTE_ICONS[Math.floor(Math.random() * CUTE_ICONS.length)] : ''
  })));
  const [currentFood, setCurrentFood] = useState(SWEET_ICONS[0]);
  const inputRef = useRef(null);
//   const [gameStartTime, setGameStartTime] = useState(null);

  // タイマー
  useEffect(() => {
    if (gameState === 'game') {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            endGame();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      
      // 浮遊アイコンを定期的に追加
      const iconTimer = setInterval(() => {
        if (Math.random() > 0.7) {
          addFloatingIcon();
        }
      }, 2000);
      
      // 背景バブルをアニメーション
      const bubbleTimer = setInterval(() => {
        setBgBubbles(prev => prev.map(bubble => ({
          ...bubble,
          y: (bubble.y - (bubble.speed / 100)) % 100 + (bubble.y < 0 ? 100 : 0),
          x: bubble.x + (Math.sin(Date.now() / 2000 + bubble.id) * 0.3),
        })));
      }, 50);
      
      // クリーンアップ
      return () => {
        clearInterval(timer);
        clearInterval(iconTimer);
        clearInterval(bubbleTimer);
      };
    }
  }, [gameState]);
  
  // 浮遊アイコンを追加
  const addFloatingIcon = () => {
    const icons = [...CUTE_ICONS, ...FOOD_ICONS];
    const newIcon = {
      id: Date.now(),
      icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 80 + 10,
      y: 110,
      size: Math.random() * 20 + 20,
      rotateSpeed: (Math.random() - 0.5) * 10,
      xSpeed: (Math.random() - 0.5) * 2
    };
    
    setFloatingIcons(prev => [...prev.slice(-15), newIcon]); // 最大15個に制限
  };

  // 新しい単語を選択
  const selectNewWord = () => {
    // 過去に出題されていない単語を選ぶ
    const unusedWords = wordPairs.filter(
      (pair) => !wordHistory.includes(pair)
    );
    
    // すべての単語が使われていたらリセット
    if (unusedWords.length === 0) {
      setWordHistory([]);
      const randomIndex = Math.floor(Math.random() * wordPairs.length);
      setCurrentWord(wordPairs[randomIndex]);
      setWordHistory([wordPairs[randomIndex]]);
    } else {
      const randomIndex = Math.floor(Math.random() * unusedWords.length);
      setCurrentWord(unusedWords[randomIndex]);
      setWordHistory([...wordHistory, unusedWords[randomIndex]]);
    }
    
    // フードアイコンをランダムに変更
    const foodType = Math.random() > 0.5 ? SWEET_ICONS : SUSHI_ICONS;
    setCurrentFood(foodType[Math.floor(Math.random() * foodType.length)]);
  };

  // ゲーム開始
  const startGame = (mode) => {
    setGameMode(mode);
    setTimeLeft(60);
    setScore(0);
    setCookies([]);
    setWordHistory([]);
    setFloatingIcons([]);
    setGameState('game');
    selectNewWord();
    // setGameStartTime(Date.now());
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
    
    // 初期の浮遊アイコンを追加
    for (let i = 0; i < 5; i++) {
      setTimeout(() => addFloatingIcon(), i * 300);
    }
  };

  // ゲーム終了
  const endGame = () => {
    setGameState('result');
  };

  // タイトルに戻る
  const backToTitle = () => {
    setGameState('title');
    setInput('');
  };

  // 入力チェック
  const handleInputChange = (e) => {
    setInput(e.target.value);
    
    const correctAnswer = gameMode === 1 
      ? currentWord.japanese 
      : currentWord.english;
    
    if (e.target.value === correctAnswer) {
      // 正解の場合
      setScore(score + 1);
      
      // クッキーを追加
      const newCookie = {
        id: Date.now(),
        x: Math.random() * 80 + 10, // 画面の10%～90%の位置
        y: 0,
        icon: currentFood,
        rotation: Math.random() * 40 - 20, // -20度から+20度のランダムな回転
      };
      setCookies([...cookies, newCookie]);
      
      // 正解エフェクト
      for (let i = 0; i < 3; i++) {
        setTimeout(() => addFloatingIcon(), i * 100);
      }
      
      // 次の単語へ
      selectNewWord();
      setInput('');
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-pink-200 via-purple-100 to-blue-200 overflow-hidden font-sans relative">
      {gameState === 'title' && <TitleScreen startGame={startGame} bgBubbles={bgBubbles} />}
      {gameState === 'game' && (
        <GameScreen 
          gameMode={gameMode}
          timeLeft={timeLeft}
          currentWord={currentWord}
          input={input}
          score={score}
          cookies={cookies}
          floatingIcons={floatingIcons}
          bgBubbles={bgBubbles}
          currentFood={currentFood}
          handleInputChange={handleInputChange}
        />
      )}
      {gameState === 'result' && (
        <ResultScreen 
          score={score}
          backToTitle={backToTitle}
          bgBubbles={bgBubbles}
        />
      )}
    </div>
  );
};

export default App;