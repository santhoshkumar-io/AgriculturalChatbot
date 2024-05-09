import React from 'react';
import { Chatbot } from 'react-chatbot-kit';

const config = {
  botName: 'YourBotName',
  lang: 'en',
  customStyles: {
    botMessageBox: {
      backgroundColor: '#F4CE14',
    },
    chatButton: {
      backgroundColor: '#F4CE14',
    },
  },
  initialMessages: [
    {
      id: 1,
      message: 'Hello! How can I assist you today?',
      trigger: 'initial',
    },
  ],
};

const ChatbotComponent = () => {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <Chatbot config={config} />
    </div>
  );
};

export default ChatbotComponent;
