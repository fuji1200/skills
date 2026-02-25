import React from 'react';
import NewsCard from './NewsCard';

export default function NewsList({ articles }) {
  if (articles.length === 0) {
    return (
      <div className="empty-state">
        <p>ニュースが見つかりませんでした。</p>
      </div>
    );
  }

  return (
    <div className="news-grid">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}
