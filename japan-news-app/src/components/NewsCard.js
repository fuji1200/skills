import React from 'react';

const CATEGORY_COLORS = {
  '総合': '#e74c3c',
  '社会': '#3498db',
  '科学・医療': '#2ecc71',
  '政治': '#9b59b6',
  '経済': '#f39c12',
  '国際': '#1abc9c',
};

function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;
  return date.toLocaleString('ja-JP', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function NewsCard({ article }) {
  const color = CATEGORY_COLORS[article.category] || '#555';

  return (
    <article className="news-card">
      <div className="card-category-bar" style={{ backgroundColor: color }} />
      <div className="card-body">
        <div className="card-meta">
          <span className="card-category" style={{ color }}>
            {article.category}
          </span>
          <span className="card-date">{formatDate(article.pubDate)}</span>
        </div>
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="card-title"
        >
          {article.title}
        </a>
        {article.description && (
          <p className="card-description">{article.description}</p>
        )}
        <div className="card-source">{article.source}</div>
      </div>
    </article>
  );
}
