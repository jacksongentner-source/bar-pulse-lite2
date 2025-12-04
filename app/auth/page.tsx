'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export default function AuthPage() {
  const router = useRouter();
  const { signUp: contextSignUp, signIn: contextSignIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isSignUp) {
        // Validation
        if (!formData.name || !formData.email || !formData.username || !formData.password) {
          setError('All fields are required');
          setLoading(false);
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }

        const signUpError = await contextSignUp(formData.name, formData.email, formData.username, formData.password);
        if (signUpError) {
          setError(signUpError);
          setLoading(false);
          return;
        }
      } else {
        // Sign in
        if (!formData.email || !formData.password) {
          setError('Email and password are required');
          setLoading(false);
          return;
        }

        const signInError = await contextSignIn(formData.email, formData.password);
        if (signInError) {
          setError(signInError);
          setLoading(false);
          return;
        }
      }

      // Success - redirect to dashboard
      setTimeout(() => router.push('/dashboard'), 500);
    } catch (err) {
      setError('An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 glow-text">
            <span className="text-brand">Bar</span> Pulse
          </h1>
          <p className="text-neutral-400">Find tonight's vibe</p>
        </div>

        {/* Auth Card */}
        <div className="card mb-6">
          {/* Tabs */}
          <div className="flex gap-4 mb-6 pb-4 border-b border-neutral-700">
            <button
              onClick={() => setIsSignUp(false)}
              className={`flex-1 py-2 text-center font-semibold transition ${
                !isSignUp
                  ? 'text-white border-b-2 border-brand'
                  : 'text-neutral-400 hover:text-neutral-300'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignUp(true)}
              className={`flex-1 py-2 text-center font-semibold transition ${
                isSignUp
                  ? 'text-white border-b-2 border-brand'
                  : 'text-neutral-400 hover:text-neutral-300'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-300">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
                />
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-neutral-300">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
              />
            </div>

            {/* Username Field (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-300">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
                />
              </div>
            )}

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium mb-2 text-neutral-300">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
              />
            </div>

            {/* Confirm Password Field (Sign Up Only) */}
            {isSignUp && (
              <div>
                <label className="block text-sm font-medium mb-2 text-neutral-300">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition"
                />
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 mt-6 bg-brand hover:bg-pink-600 disabled:bg-neutral-600 text-white font-semibold rounded-lg transition glow-text disabled:cursor-not-allowed"
            >
              {loading ? 'Loading...' : isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          {/* Forgot Password (Sign In Only) */}
          {!isSignUp && (
            <div className="mt-4 text-center">
              <a href="#" className="text-sm text-brand hover:text-pink-400 transition">
                Forgot password?
              </a>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-neutral-500">
          <p>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-brand hover:text-pink-400 transition font-medium"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
