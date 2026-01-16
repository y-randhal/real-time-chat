/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./apps/chat-app/src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        // Main Backgrounds
        surface: {
          50: '#f8fafc',  // Light mode background
          900: '#0f172a', // Deep navy sidebar
          950: '#020617', // Main chat background
        },
        // Primary Brand - Vibrant Indigo
        brand: {
          light: '#818cf8',
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
        },
        // Chat Bubbles
        message: {
          sent: '#6366f1',      // sended messages
          received: '#1e293b',  // received messages
          accent: '#10b981',    // Online indicators/Success
        }
      },
      borderRadius: {
        'chat': '1.25rem', // Custom rounded look for bubbles
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // for chat inputs
  ],
}