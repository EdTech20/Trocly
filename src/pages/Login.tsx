import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginWithEcommerceHero = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        toast.success(`Welcome back, ${user.displayName || 'User'}!`, {
          position: 'top-center',
          autoClose: 5000,
          className: 'text-center font-medium text-sm',
        });

        // Redirect after 10s
        setTimeout(() => {
          navigate('/');
        }, 10000);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoading(false);
    } catch (error: any) {
      console.error('Login error:', error);
      setIsLoading(false);
      toast.error('Invalid email or password.', {
        position: 'top-center',
        autoClose: 3000,
      });
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login coming soon');
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-10 py-12 bg-white">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-[#2D2E32] text-center">
            Welcome Back
          </h2>
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg text-sm font-medium hover:bg-gray-100"
          >
            <FcGoogle size={20} />
            Sign in with Google
          </button>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <div className="h-px w-1/4 bg-gray-300" />
            <p>or</p>
            <div className="h-px w-1/4 bg-gray-300" />
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg"
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#FF6F61] text-white rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? 'Logging In...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <a href="/signup" className="text-[#FF6F61] font-medium">
              Sign up
            </a>
          </p>
        </div>
      </div>

      <div className="hidden lg:block w-1/2">
        <img
          src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default LoginWithEcommerceHero;
