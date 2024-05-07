import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';

const SignIn = ({ language, handleLanguageChange }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEmailSignIn(formData.email, formData.password);
  };

  // Text content based on language
  const textContent = {
    en: {
      signIn: 'Sign In',
      email: 'Email',
      password: 'Password',
      welcomeBack: 'Welcome Back!',
      or: 'Or',
      signInWithGoogle: 'Sign in with Google',
    },
    ta: {
      signIn: 'உள்நுழைய',
      email: 'மின்னஞ்சல்',
      password: 'கடவுச்சொல்',
      welcomeBack: 'மீண்டும் வரவேற்கிறேன்!',
      or: 'அல்லது',
      signInWithGoogle: 'Google உடன் உள்நுழைக',
    },
  };

  const handleEmailSignIn = async (email, password) => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/', { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      navigate('/', { replace: true });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="h-screen-4rem bg-white">
      {/* Sign-in form */}
      <div className="container mx-auto py-28">
        <h1 className="text-3xl font-bold text-center mb-8">{textContent[language].welcomeBack}</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          {/* Email */}
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
          {/* Password */}
          <div className="mb-6">
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
          {/* Sign In Button */}
          <button
            type="submit"
            className="btn btn-signup w-full bg-black text-white border border-black hover:bg-white hover:text-black py-2 px-4 rounded-lg"
          >
            {textContent[language].signIn}
          </button>

          <div className="flex items-center gap-4 mt-12">
            <div className="bg-brand-gray/30 h-[1px] w-full" />
            <p className="text-brand-gray">{textContent[language].or}</p>
            <div className="bg-brand-gray/30 h-[1px] w-full" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="bg-brand-cream/70 rounded-xl mt-6 w-full px-4 py-2 text-[#313957] font-semibold justify-center flex gap-4 items-center"
          >
            <img src="Google.svg" alt="Google Sign-In" />
            {textContent[language].signInWithGoogle}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
