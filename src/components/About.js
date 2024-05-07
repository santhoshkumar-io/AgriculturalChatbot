import React from 'react';

const About = ({ language }) => {
  const textContent = {
    en: {
      title: "About Uzhavu",
      subtitle: "Empowering Farmers through Technology",
      description1: "At Uzhavu, we believe in harnessing the power of technology to transform agriculture. Our cutting-edge chatbot is built with the latest advancements in artificial intelligence to provide real-time, actionable insights that help farmers thrive.",
      missionTitle: "Our Mission",
      missionText: "Our mission is to bridge the gap between traditional farming techniques and modern technology solutions. We provide farmers with easy access to crucial information including weather updates, market trends, and agricultural best practices, empowering them to make informed decisions that boost productivity and profitability.",
      technologyTitle: "Technology at the Core",
      technologyText: "Uzhavu utilizes advanced algorithms and data analytics to deliver personalized recommendations and insights. Whether it's choosing the right crop based on soil health or finding the optimal planting schedule, our chatbot is equipped to assist. With support for multiple regional languages, Uzhavu ensures that every farmer, regardless of language or locale, can benefit from our services.",
      communityTitle: "Join Our Community",
      communityText: "Join the thousands of farmers who are already experiencing the benefits of Uzhavu. Our platform is more than just a tool—it's a community where farmers can learn, grow, and succeed together."
    },
    ta: {
      title: "உழவு பற்றி",
      subtitle: "தொழில்நுட்பத்தின் மூலம் விவசாயிகளை முன்னேற்றுதல்",
      description1: "உழவில், நாங்கள் விவசாயத்தை மாற்றுவதற்காக தொழில்நுட்பத்தின் சக்தியை பயன்படுத்துவதில் நம்பிக்கை கொண்டுள்ளோம். எங்களுடைய செயலியாக்கம் செயற்கை நுண்ணறிவுடன் சேர்ந்து உருவாக்கப்பட்டு, விவசாயிகளுக்கு உண்மையான நேரத்தில் செயல்பாட்டு உள்ளடக்கங்களை வழங்குகிறது, இது அவர்களை வளர்ச்சியடைய உதவுகிறது.",
      missionTitle: "எங்கள் பணி",
      missionText: "பாரம்பரிய விவசாய நுட்பங்களுக்கும் நவீன தொழில்நுட்ப தீர்வுகளுக்கும் இடையேயான தடையை அகற்றுதல் எங்கள் பணியாகும். நாங்கள் விவசாயிகளுக்கு வானிலை புதுப்பிப்புகள், சந்தை போக்குகள், மற்றும் விவசாய சிறந்த நடைமுறைகள் போன்ற முக்கிய தகவல்களை எளிதாக அணுக உதவுகிறோம்.",
      technologyTitle: "மையத்தில் தொழில்நுட்பம்",
      technologyText: "உழவு முன்னேற்றப்பட்ட அல்கோரிதங்கள் மற்றும் தரவு பகுப்பாய்வை பயன்படுத்தி தனிப்பட்ட பரிந்துரைகளையும் உள்ளீடுகளையும் வழங்குகிறது. மண் ஆரோக்யத்தைப் பொருத்தவரை சரியான பயிரை தேர்வு செய்தல் அல்லது ஒப்டிமல் நடவு அட்டவணையைக் கண்டுபிடிப்பது போன்ற விஷயங்களில் எங்கள் செய்தியாக்கம் உதவும்.",
      communityTitle: "எங்கள் சமூகத்தில் சேரவும்",
      communityText: "உழவுவை பயன்படுத்தி ஏற்கெனவே நன்மைகளை அனுபவித்து வரும் ஆயிரக்கணக்கான விவசாயிகளில் சேரவும். எங்கள் தளம் ஒரு கருவியை விட அதிகம் அது ஒரு சமூகம், அதில் விவசாயிகள் கற்றுக்கொள்ள, வளர்க்க மற்றும் வெற்றிபெற முடியும்."
    },
  };

  return (
    <div className="min-h-screen bg-white pb-10">
      <div className="mx-auto py-8 container max-w-screen-lg">
        <div className="mt-16">
          <img
            src="/Images/about.webp"
            alt="Sketch Image"
            className="w-full h-4/5 mx-auto rounded-lg my-7"
          />

          <div className="mx-10">
            <h1 className="text-3xl font-bold mb-4">{textContent[language].title}</h1>
            <h1 className="text-xl font-semibold mb-2">{textContent[language].subtitle}</h1>
            <p className="text-base">{textContent[language].description1}</p>
            <h1 className="text-xl font-semibold mb-2 mt-6">{textContent[language].missionTitle}</h1>
            <p className="text-base">{textContent[language].missionText}</p>
            <h1 className="text-xl font-semibold mb-2 mt-6">{textContent[language].technologyTitle}</h1>
            <p className="text-base">{textContent[language].technologyText}</p>

            <div className="mt-10 bg-brand-green rounded-lg p-4 text-brand-gray">
              <h1 className="text-2xl font-bold mb-2">{textContent[language].communityTitle}</h1>
              <p className="text-base">{textContent[language].communityText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;
