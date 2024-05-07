import React from 'react';

const Footer = ({ language }) => {
  const footerText = {
    en: '2024 Uzhavu. All rights reserved.',
    ta: '2024 உழவு. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டுள்ளன.',
  };

  return (
    <div className="bg-brand-gray text-white/80 py-4 text-center fixed bottom-0 w-full">
      <p>{footerText[language]}</p>
    </div>
  );
};

export default Footer;
