import { useState } from 'react';
import axios from 'axios';
import landing from "../assets/landing.png"
import insta from "../assets/insta.png"

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        try {
            const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/login`, {
                email,
                password
            });

            if (response.status === 200) {
                window.location.href = '/dashboard';
            }
        } catch (error) {
            if (error.response) {
                // Server responded with error status
                setErrors({ submit: error.response.data.message || 'Login failed. Please try again.' });
            } else if (error.request) {
                // Request made but no response received
                setErrors({ submit: 'Network error. Please check your connection.' });
            } else {
                // Something else happened
                setErrors({ submit: 'An error occurred. Please try again.' });
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <img className='hidden lg:flex' src={landing} alt="" />
            <div className="w-full max-w-sm p-8 border rounded-md border-gray-300">
                <div onSubmit={handleSubmit} className="space-y-4">
                    <img className='h-16 mx-auto' src={insta} alt="" />
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.email ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.password ? 'border-red-500' : 'border-gray-300'
                                }`}
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {/* Submit Error */}
                    {errors.submit && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {errors.submit}
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200">
                        Login
                    </button>
                </div>

                {/* Demo Credentials */}
                <div className="mt-6 pt-6 border-t border-gray-300">
                    <p className="text-xs text-gray-600 text-center mb-2">Demo Credentials:</p>
                    <p className="text-xs text-gray-700 text-center font-mono">
                        Email: demo@example.com<br />
                        Password: password123
                    </p>
                </div>
            </div>
        </div>
    );
}