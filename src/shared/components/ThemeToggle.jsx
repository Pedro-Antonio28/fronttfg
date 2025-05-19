'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/themeContext';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      }}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </motion.button>
  );
}
