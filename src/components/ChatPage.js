import React, { useEffect, useState } from 'react'
import axios from 'axios' // Make sure to install axios with `npm install axios`

function Chatbot({ language }) {
  const stateDistricts = {
    'Tamil Nadu': [
      'Ariyalur',
      'Chengalpattu',
      'Chennai',
      'Coimbatore',
      'Cuddalore',
    ],
    'Andhra Pradesh': [
      'Anantapur',
      'Chittoor',
      'East Godavari',
      'Guntur',
      'Krishna',
      'Kurnool',
    ],
    'Arunachal Pradesh': [
      'Tawang',
      'West Kameng',
      'East Kameng',
      'Papum Pare',
      'Pakke-Kessang',
    ],
    Assam: ['Baksa', 'Barpeta', 'Biswanath', 'Bongaigaon', 'Cachar'],
    Bihar: ['Araria', 'Arwal', 'Aurangabad', 'Banka', 'Begusarai'],
    Chhattisgarh: ['Balod', 'Baloda Bazar', 'Balrampur', 'Bastar', 'Bemetara'],
    Goa: ['North Goa', 'South Goa'],
    Gujarat: ['Ahmedabad', 'Amreli', 'Anand', 'Aravalli', 'Banaskantha'],
    Haryana: ['Ambala', 'Bhiwani', 'Charkhi Dadri', 'Faridabad', 'Fatehabad'],
    'Himachal Pradesh': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur'],
    Jharkhand: ['Bokaro', 'Chatra', 'Deoghar', 'Dhanbad', 'Dumka'],
    Karnataka: [
      'Bagalkot',
      'Ballari',
      'Belagavi',
      'Bengaluru Rural',
      'Bengaluru Urban',
    ],
    Kerala: ['Alappuzha', 'Ernakulam', 'Idukki', 'Kannur', 'Kasaragod'],
    'Madhya Pradesh': [
      'Agar Malwa',
      'Alirajpur',
      'Anuppur',
      'Ashoknagar',
      'Balaghat',
    ],
    Maharashtra: ['Ahmednagar', 'Akola', 'Amravati', 'Aurangabad', 'Beed'],
    Manipur: [
      'Bishnupur',
      'Chandel',
      'Churachandpur',
      'Imphal East',
      'Imphal West',
    ],
    Meghalaya: [
      'East Garo Hills',
      'East Khasi Hills',
      'East Jaintia Hills',
      'North Garo Hills',
      'South Garo Hills',
    ],
    Mizoram: ['Aizawl', 'Champhai', 'Kolasib', 'Lawngtlai', 'Lunglei'],
    Nagaland: ['Dimapur', 'Kiphire', 'Kohima', 'Longleng', 'Mokokchung'],
    Odisha: ['Angul', 'Balangir', 'Balasore', 'Bargarh', 'Bhadrak'],
    Punjab: ['Amritsar', 'Barnala', 'Bathinda', 'Faridkot', 'Fatehgarh Sahib'],
    Rajasthan: ['Ajmer', 'Alwar', 'Banswara', 'Baran', 'Barmer'],
    Sikkim: ['East Sikkim', 'North Sikkim', 'South Sikkim', 'West Sikkim'],

    Telangana: [
      'Adilabad',
      'Bhadradri Kothagudem',
      'Hyderabad',
      'Jagtial',
      'Jangaon',
    ],
    Tripura: ['Dhalai', 'Gomati', 'Khowai', 'North Tripura', 'South Tripura'],
    'Uttar Pradesh': [
      'Agra',
      'Aligarh',
      'Allahabad',
      'Ambedkar Nagar',
      'Amethi',
    ],
    Uttarakhand: ['Almora', 'Bageshwar', 'Chamoli', 'Champawat', 'Dehradun'],
    'West Bengal': [
      'Alipurduar',
      'Bankura',
      'Birbhum',
      'Cooch Behar',
      'Darjeeling',
    ],
  }

  const translations = {
    en: {
      selectState: 'Select State',
      selectDistrict: 'Select District',
      askYourQuestion: 'Ask your agricultural question...',
      howCanIHelp: 'How Can I Help You?',
      adviceOnFarming: 'Advice on Farming',
      toolsForFarming: 'Know what are the tools',
      carrotAdviceShort: 'Carrot advice based on the geography you live',
      toolsAdviceShort: 'Tools required to farm and gain more plantation',

      carrotAdvice:
        'Share me some advice on farming carrot based on where I live',
      toolAdvice:
        'Please tell what are the tools required to farm and gain more plantation',
        ask:'Ask'
    },
    ta: {
      selectState: 'மாநிலத்தை தேர்வு செய்க',
      selectDistrict: 'மாவட்டத்தை தேர்வு செய்க',
      askYourQuestion: 'உங்கள் விவசாய கேள்வியை கேட்கவும்...',
      howCanIHelp: 'என்னால் எப்படி உதவ முடியும்?',
      adviceOnFarming: 'விவசாயம் பற்றிய ஆலோசனை',
      toolsForFarming: 'விவசாய கருவிகளை அறிய',
      carrotAdviceShort: 'நீங்கள் வாழும் புவியியல் அடிப்படையில் கேரட் விவசாயம் பற்றிய ஆலோசனை',
      carrotAdvice: 'எனக்கு கேரட் விவசாயம் பற்றிய ஆலோசனையை வழங்குங்கள்',
      toolAdvice: 'விவசாயத்திற்கு தேவையான கருவிகள் பற்றி தெரிவியுங்கள்',
      toolsAdviceShort: 'விவசாயத்தில் அதிகம் பயிர் வளர்க்க தேவையான கருவிகள்',
      ask:'கேள்'
    },
  }

  const [selectedState, setSelectedState] = useState(
    Object.keys(stateDistricts)[0],
  )
  const [selectedDistrict, setSelectedDistrict] = useState(
    stateDistricts[Object.keys(stateDistricts)[0]][0],
  )

  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: `You are an agricultural assistant, skilled in providing helpful farming advice, Note: Give me response based on my location - country: india, state: ${selectedState}, district: ${selectedDistrict}. share advice in ${
        language === 'en' ? 'english' : 'tamil'
      }`,
    },
  ]) // Include the initial system message
  const [input, setInput] = useState('')

  useEffect(() => {
    const existingMessages = [...messages]
    existingMessages[0] = {
      role: 'system',
      content: `You are an agricultural assistant, skilled in providing helpful farming advice, Note: Give me response based on my location - country: india, state: ${selectedState}, district: ${selectedDistrict}. share advice in ${
        language === 'en' ? 'english' : 'tamil'
      }`,
    }

    setMessages(existingMessages)
  }, [language])

  const askGPT3 = async (userInput) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [...messages, { role: 'user', content: userInput }],
        },
        {
          headers: {
            Authorization: ``,
            'Content-Type': 'application/json',
          },
        },
      )
      return response.data.choices[0].message.content
    } catch (error) {
      console.error('There was an error with the OpenAI request:', error)
      return 'I am having trouble understanding that.'
    }
  }

  const sendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: 'user', content: input }
    setMessages((messages) => [...messages, userMessage])
    setInput('')

    const botResponseContent = await askGPT3(input)
    const botResponse = { role: 'assistant', content: botResponseContent }
    setMessages((messages) => [...messages, botResponse])
  }

  const sendQuickMessage = async (prompt) => {
    const userMessage = { role: 'user', content: prompt }
    setMessages((messages) => [...messages, userMessage])
    setInput('')

    const botResponseContent = await askGPT3(prompt)
    const botResponse = { role: 'assistant', content: botResponseContent }
    setMessages((messages) => [...messages, botResponse])
  }

  const handleStateChange = (event) => {
    setSelectedState(event.target.value)
    setSelectedDistrict('')
  }

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value)
  }

  return (
    <div className="container h-3/4 max-w-screen-lg">
      <div className="flex gap-6 mb-8">
        <div className="flex flex-col gap-2 text-brand-gray/90 font-semibold">
          {translations[language].selectState}
          <select
            className="px-4 py-2 rounded bg-brand-gray text-white"
            value={selectedState}
            onChange={handleStateChange}
          >
            {Object.keys(stateDistricts).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 text-brand-gray/90 font-semibold">
          {translations[language].selectDistrict}
          <select
            className="px-4 py-2 rounded bg-brand-gray text-white"
            value={selectedDistrict}
            onChange={handleDistrictChange}
          >
            {selectedState &&
              stateDistricts[selectedState].map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="p-4 w-full h-4/5 bg-brand-cream/50 rounded-xl flex flex-col">
        <div className="mb-4 h-[90%] overflow-y-auto">
          {messages
            .filter((message) => message.role !== 'system')
            .map((message, index) => (
              <div
                key={index}
                className={`py-4 px-6 my-2 rounded-lg leading-6 ${
                  message.role === 'user'
                    ? 'bg-brand-gray/10 text-slate-900 ml-auto'
                    : 'bg-brand-gray/90 text-white'
                }`}
              >
                {message.content}
              </div>
            ))}

          {!messages.filter((message) => message.role !== 'system')?.length && (
            <div className="flex flex-col justify-center items-center h-full">
              <h1 className="font-semibold text-2xl text-brand-gray">
                {translations[language].howCanIHelp}
              </h1>

              <div className="flex gap-4 mt-8">
                <div
                  onClick={() =>
                    sendQuickMessage(translations[language].carrotAdvice)
                  }
                  className="border-brand-charcoal/30 border rounded-lg p-4 cursor-pointer w-[415px]"
                >
                  <h4 className="font-semibold text-md text-brand-gray/90">
                    {translations[language].adviceOnFarming}
                  </h4>
                  <p className="text-brand-gray/50">
                   {translations[language].carrotAdviceShort}
                  </p>
                </div>
                <div
                  onClick={() =>
                    sendQuickMessage(translations[language].toolAdvice)
                  }
                  className="border-brand-charcoal/30 border rounded-lg p-4 cursor-pointer w-[415px]"
                >
                  <h4 className="font-semibold text-md text-brand-gray/90">
                    {translations[language].toolsForFarming}
                  </h4>
                  <p className="text-brand-gray/50">
                  {translations[language].toolsAdviceShort}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        <form className="flex items-center" onSubmit={sendMessage}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border-2 border-slate-200 bg-white rounded-lg focus:outline-none"
            placeholder={translations[language].askYourQuestion}
          />
          <button
            type="submit"
            className="p-2 bg-brand-gray text-white rounded-lg ml-2"
          >
              {translations[language].ask}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chatbot
