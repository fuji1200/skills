# 日本のニュース アプリ

NHK の RSS フィードを使って日本の最新ニュースを表示する React アプリです。

## 機能

- NHK の 6 カテゴリ（総合・社会・科学医療・政治・経済・国際）のニュースを取得
- カテゴリ別フィルタリング
- 手動更新ボタン
- 各記事から NHK サイトへのリンク

## 起動方法

```bash
npm install
npm start
```

ブラウザで http://localhost:3000 を開きます。

## データソース

- NHK ニュース RSS フィード (https://www.nhk.or.jp/rss/news/)
- CORS プロキシ: allorigins.win
