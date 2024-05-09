import React, { useEffect } from "react";

const WeatherWidget = () => {
  useEffect(() => {
    window.myWidgetParam = window.myWidgetParam || [];
    window.myWidgetParam.push({
      id: 11,
      cityid: "1273865",
      appid: "a1154b61806c8b173d7fc9e301a3b40b",
      units: "metric",
      containerid: "openweathermap-widget-11",
    });

    const script = document.createElement("script");
    script.async = true;
    script.charset = "utf-8";
    script.src =
      "//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";
    const s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(script, s);

    setTimeout(() => {
      const widgetLeft = document.querySelector(".widget-left");
      if (widgetLeft) {
        widgetLeft.style.width = "100%";
        widgetLeft.style.padding = "0";
        widgetLeft.style.border = "1px solid rgba(0,0,0,0.3)";
        widgetLeft.style.boxShadow = "none";
        // Add more styles as needed
      }
    }, [2000]);

    return () => {
      // Cleanup function to remove the script when component unmounts
      script.parentNode.removeChild(script);
    };
  }, []);

  return <div id="openweathermap-widget-11" className="weather-widget"></div>;
};

export default WeatherWidget;
