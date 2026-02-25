import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import NewsList from './components/NewsList';

const RSS_SOURCES = [
  {
    name: 'NHK 主要ニュース',
    url: 'https://www.nhk.or.jp/rss/news/cat0.xml',
    category: '総合',
  },
  {
    name: 'NHK 社会',
    url: 'https://www.nhk.or.jp/rss/news/cat1.xml',
    category: '社会',
  },
  {
    name: 'NHK 科学・医療',
    url: 'https://www.nhk.or.jp/rss/news/cat3.xml',
    category: '科学・医療',
  },
  {
    name: 'NHK 政治',
    url: 'https://www.nhk.or.jp/rss/news/cat4.xml',
    category: '政治',
  },
  {
    name: 'NHK 経済',
    url: 'https://www.nhk.or.jp/rss/news/cat5.xml',
    category: '経済',
  },
  {
    name: 'NHK 国際',
    url: 'https://www.nhk.or.jp/rss/news/cat6.xml',
    category: '国際',
  },
];

// CORS proxy to fetch RSS feeds from the browser
const CORS_PROXY = 'https://api.allorigins.win/get?url=';

async function fetchRSS(source) {
  const proxyUrl = `${CORS_PROXY}${encodeURIComponent(source.url)}`;
  const response = await fetch(proxyUrl);
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const data = await response.json();

  const parser = new DOMParser();
  const xml = parser.parseFromString(data.contents, 'text/xml');
  const items = Array.from(xml.querySelectorAll('item'));

  return items.map((item) => ({
    id: item.querySelector('guid')?.textContent || item.querySelector('link')?.textContent,
    title: item.querySelector('title')?.textContent || '',
    link: item.querySelector('link')?.textContent || '',
    description: item.querySelector('description')?.textContent?.replace(/<[^>]+>/g, '') || '',
    pubDate: item.querySelector('pubDate')?.textContent || '',
    category: source.category,
    source: source.name,
  }));
}

export default function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [lastUpdated, setLastUpdated] = useState(null);

  const categories = ['すべて', ...RSS_SOURCES.map((s) => s.category)];

  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await Promise.allSettled(RSS_SOURCES.map(fetchRSS));
      const allArticles = results
        .filter((r) => r.status === 'fulfilled')
        .flatMap((r) => r.value);

      // Sort by publication date (newest first)
      allArticles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
      setArticles(allArticles);
      setLastUpdated(new Date());
    } catch (err) {
      setError('ニュースの取得に失敗しました。しばらくしてから再試行してください。');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const filtered =
    selectedCategory === 'すべて'
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">
            <span className="header-flag">🇯🇵</span> 日本のニュース
          </h1>
          <div className="header-meta">
            {lastUpdated && (
              <span className="last-updated">
                更新: {lastUpdated.toLocaleTimeString('ja-JP')}
              </span>
            )}
            <button className="refresh-btn" onClick={loadNews} disabled={loading}>
              {loading ? '読み込み中...' : '更新'}
            </button>
          </div>
        </div>
        <nav className="category-nav">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </nav>
      </header>

      <main className="main">
        {error && <div className="error-message">{error}</div>}
        {loading && articles.length === 0 ? (
          <div className="loading">
            <div className="spinner" />
            <p>ニュースを読み込んでいます...</p>
          </div>
        ) : (
          <NewsList articles={filtered} />
        )}
      </main>

      <footer className="footer">
        <p>ニュースソース: NHK RSS フィード</p>
      </footer>
    </div>
  );
}
