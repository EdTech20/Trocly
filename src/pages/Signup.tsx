import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpWithEcommerceHero = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          navigate('/');
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!', { position: 'top-center', autoClose: 3000 });
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters!', { position: 'top-center', autoClose: 3000 });
      return;
    }

    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        fullName: formData.fullName,
        email: formData.email,
      });

      setIsLoading(false);
      navigate('/');
    } catch (error: any) {
      console.error('Sign up error:', error);
      setIsLoading(false);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is already registered.', { position: 'top-center', autoClose: 3000 });
      } else {
        toast.error('Something went wrong. Try again later.', { position: 'top-center', autoClose: 3000 });
      }
    }
  };

  const handleGoogleSignup = () => {
    console.log('Google signup coming soon');
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center px-10 py-12 bg-white">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-[#2D2E32] text-center">Create Your Account</h2>
          <button
            onClick={handleGoogleSignup}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg text-sm font-medium hover:bg-gray-100"
          >
            <FcGoogle size={20} />
            Sign up with Google
          </button>

          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <div className="h-px w-1/4 bg-gray-300" />
            <p>or</p>
            <div className="h-px w-1/4 bg-gray-300" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
            <button
              type="submit"
              className="w-full py-3 bg-[#FF6F61] text-white rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-[#FF6F61] font-medium">
              Log in
            </a>
          </p>
        </div>
      </div>

      <div className="hidden lg:block w-1/2">
        <img
          src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>

      <ToastContainer />
    </div>
  );
};

export default SignUpWithEcommerceHero;
