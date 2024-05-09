import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { getAuth, signOut } from 'firebase/auth'

const Navbar = ({ language, handleLanguageChange }) => {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  // Function to handle language change
  const handleChange = (e) => {
    handleLanguageChange(e.target.value)
  }

  // Text content based on language
  const textContent = {
    en: {
      home: 'Home',
      about: 'About',
      market: 'Market', // English translation
      signIn: 'Sign In',
      signUp: 'Sign Up',
      logo: 'Uzhavu',
      signOut: 'Sign Out',
      news: 'News'
    },
    ta: {
      home: 'முகப்பு',
      about: 'பற்றி',
      market: 'சந்தை', // Tamil translation
      signIn: 'உள்நுழைய',
      signUp: 'பதிவு செய்',
      logo: 'உழவு',
      news:'செய்திகள்'
    },
  }

  const handleSignOut = async () => {
    const auth = getAuth()

    try {
      await signOut(auth)
      navigate('/signin', { replace: true })
      // Handle successful sign out (e.g., redirect to login page, show message)
      console.log('User signed out successfully')
    } catch (error) {
      // Handle errors (e.g., display error message)
      console.error('Error signing out: ', error)
    }
  }

  return (
    <div className="bg-brand-cream/30 border-b border-brand-gray/30 text-brand-gray py-4 px-6 fixed top-0 w-full z-10 h-20 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto flex justify-between items-center max-w-screen-lg">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl">
          {textContent[language]?.logo}
        </Link>
        {/* Navigation links */}
        <div className="space-x-4">
          {currentUser && (
            <>
              <Link to="/" className="btn font-medium text-lg">
                {textContent[language]?.home}
              </Link>
              <Link to="/about" className="btn font-medium text-lg">
                {textContent[language]?.about}
              </Link>
              <Link to="/market" className="btn font-medium text-lg">
                {textContent[language]?.market}
              </Link>
              <Link to="/news" className="btn font-medium text-lg">
              {textContent[language]?.news}
              </Link>
              <Link onClick={handleSignOut} className="btn font-medium text-lg">
                {textContent[language]?.signOut}
              </Link>
            </>
          )}
          {!currentUser && (
            <>
              <Link to="/signin" className="btn font-medium text-lg">
                {textContent[language]?.signIn}
              </Link>
              <Link to="/signup" className="btn font-medium text-lg">
                {textContent[language]?.signUp}
              </Link>
            </>
          )}

          {/* Language selector dropdown */}
          <select
            className="px-4 py-2 rounded bg-gray-800 text-white"
            value={language}
            onChange={handleChange}
          >
            <option value="en">English</option>
            <option value="ta">தமிழ்</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Navbar
