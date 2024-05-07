import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/HomePage'
import SignUp from './components/SignUp'
import SignIn from './components/SignInPage'
import ChatPage from './components/ChatPage'
import About from './components/About'
import Market from './components/Market'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

function App() {
  const [language, setLanguage] = useState('en')

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage)
  }

  return (
    <div>
      <Navbar language={language} handleLanguageChange={handleLanguageChange} />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Home
                language={language}
                handleLanguageChange={handleLanguageChange}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About
                language={language}
                handleLanguageChange={handleLanguageChange}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/market"
          element={
            <ProtectedRoute>
              {' '}
              <Market                 language={language}
 />{' '}
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUp
                language={language}
                handleLanguageChange={handleLanguageChange}
              />
            </PublicRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SignIn
                language={language}
                handleLanguageChange={handleLanguageChange}
              />
            </PublicRoute>
          }
        />
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <ChatPage
                language={language}
                handleLanguageChange={handleLanguageChange}
              />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* Footer */}
      <Footer language={language} />
    </div>
  )
}

export default App
