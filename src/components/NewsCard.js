import React from 'react';

const NewsCard = ({ article }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-brand-gray/40">
      <img className="w-full h-48 object-cover" src={article.image_url} alt={article.title} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 truncate">{article.title}</div>
        <p className="text-gray-700 text-base truncate">
          {article.description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2 ml-auto w-max">
        <a href={article.link} className="inline-block text-brand-gray  text-sm font-semibold mr-2 mb-2 underline ml-auto" target="_blank" rel="noopener noreferrer">Read More</a>
      </div>
    </div>
  );
};

export default NewsCard;