import React, { useEffect } from "react";
import Weather from "./Weather";
import axios from "axios";

function Market({ language }) {
  // Text content based on language
  const textContent = {
    en: {
      title: "Daily Market Prices",
      // Additional English text can be added here as needed
    },
    ta: {
      title: "தினசரி சந்தை விலைகள்",
      // Additional Tamil text can be added here as needed
    },
  };


  

  return (
    <div className="container h-screen-4rem max-w-screen-lg flex pt-28 mx-auto">
      <div className="w-full h-[80vh] pb-24">
        <h1 className="text-2xl font-bold mb-8">
          {textContent[language].title}
        </h1>
        <iframe
          src="https://market.todaypricerates.com/"
          title={textContent[language].title}
          width="100%"
          height="100%"
          style={{ border: "none" }}
        ></iframe>
      </div>

    </div>
  );
}

export default Market;
