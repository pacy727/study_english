# 英単語寿司打 (English Word Sushi Strike)

楽しく英単語を学ぶタイピングゲーム！制限時間内に正しい訳語をタイプして、クッキーやお寿司をゲットしよう！

## 機能

- 2つのモード：英語→日本語、日本語→英語
- ポップでかわいいデザイン
- 視覚的なスコア表示システム
- 独創的なタイマー
- 楽しいアニメーションエフェクト

## 開発

### インストール方法

```bash
git clone https://github.com/yourusername/english-word-sushi-app.git
cd english-word-sushi-app
npm install
```

### 開発サーバーの起動

```bash
npm start
```

### ビルド

```bash
npm run build
```

## Vercelへのデプロイ方法

1. [Vercel](https://vercel.com/)にアカウントを作成する
2. GitHubなどのリポジトリにプロジェクトをプッシュする
3. Vercelでリポジトリをインポートする
4. 自動的にビルドとデプロイが行われます

## 単語の追加・変更

`src/data/wordPairs.js`ファイルを編集することで、単語リストを自由に追加・変更できます。

```javascript
const wordPairs = [
  { english: "新しい英単語", japanese: "日本語訳" },
  // 追加の単語ペア
];
```

## カスタマイズ

- アイコンの変更: `src/data/wordPairs.js`のアイコン配列を編集
- スタイルの調整: Tailwind CSSのクラスを使って各コンポーネントのスタイルを変更
- アニメーションの追加: `src/styles/animations.css`でアニメーションを追加・編集

## ライセンス

MIT