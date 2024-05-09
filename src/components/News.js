import React, { useState, useEffect } from "react";
import FarmingNewsCard from "./NewsCard"; // Import the NewsCard component
import axios from "axios";
const FarmingNewsGrid = ({ language:appLanguage }) => {
  const [articles, setArticles] = useState([]);

  const API_KEY = ""; // Replace with your actual API key
  const BASE_URL = "https://newsdata.io/api/1/news";

  const fetchFarmingNews = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          apikey: API_KEY,
          q: "farming",
          language: appLanguage, // You can customize this as needed
        },
      });
      return response.data.results; // Assuming the news articles are in the 'results' key
    } catch (error) {
      console.error("Failed to fetch news:", error);
      return [];
    }
  };

  useEffect(() => {
    const loadNews = async () => {
      const newsData = await fetchFarmingNews();
      setArticles(newsData);
    };

    loadNews();
  }, [appLanguage]);

  return (
    <div className="container h-3/4 max-w-screen-lg mx-auto mt-28">
      <h1 className="text-2xl font-bold mb-8">
        {appLanguage === "en" ? "Farming News" : "விவசாய செய்திகள்"}
      </h1>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
        {articles.map((article, index) => (
          <FarmingNewsCard key={index} article={article} />
        ))}
      </div>
      <div className='w-full h-[100px]'></div>

    </div>
  );
};

export default FarmingNewsGrid;
