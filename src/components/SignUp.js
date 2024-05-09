import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from '../services/firebase'

const SignUp = ({ language }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      )
      navigate('/signin')
      // Clear the form data
      setFormData({
        email: '',
        password: '',
      })
    } catch (error) {
      console.error('Error registering user with email and password', error)
    }
  }

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(auth, provider)
      navigate('/', { replace: true })
    } catch (error) {
      console.error('Error signing in with Google', error)
    }
  }

  // Text content based on language
  const textContent = {
    en: {
      signUp: 'Sign Up',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      createAccount: 'Create Your account to Get Started!',
      or: 'Or',
      signUpWithGoogle: 'Sign up with Google',
    },
    ta: {
      signUp: 'பதிவு செய்',
      email: 'மின்னஞ்சல்',
      password: 'கடவுச்சொல்',
      confirmPassword: 'கடவுச்சொல் உறுதி செய்யவும்',
      createAccount: 'தொடங்க உங்கள் கணக்கை உருவாக்கவும்!',
      or: 'அல்லது',
      signUpWithGoogle: 'Google உடன் பதிவு செய்',
    },
  }

  return (
    <div className="h-screen-4rem bg-white">
      <div className="container mx-auto py-28">
        <h1 className="text-3xl font-bold text-center mb-8">
          {textContent[language].createAccount}
        </h1>
        <form onSubmit={handleRegister} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              {textContent[language].email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">
              {textContent[language].password}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="btn font-semibold btn-signup w-full rounded-lg bg-black text-white border border-black hover:bg-white hover:text-black py-2 px-4"
          >
            {textContent[language].signUp}
          </button>
          <div className="flex items-center gap-4 mt-12">
            <div className="bg-brand-gray/30 h-[1px] w-full" />
            <p className="text-brand-gray">{textContent[language].or}</p>
            <div className="bg-brand-gray/30 h-[1px] w-full" />
          </div>
          <button
            onClick={handleGoogleSignIn}
            className="bg-brand-cream/70  rounded-xl mt-6 w-full px-4 py-2 text-[#313957] font-semibold justify-center flex gap-4 items-center"
          >
            <img src="Google.svg" alt="Google Sign-In" />
            {textContent[language].signUpWithGoogle}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
